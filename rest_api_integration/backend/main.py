from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Bookmark Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/v1/bookmarks")
def test_database():

    database_url = os.getenv("DATABASE_URL")

    # Check DATABASE_URL
    if not database_url:
        return {
            "success": False,
            "step": "DATABASE_URL",
            "error": "DATABASE_URL is missing from Render Environment Variables"
        }

    # Try connecting to PostgreSQL
    try:
        db = psycopg2.connect(database_url)
        cursor = db.cursor()

    except Exception as e:
        return {
            "success": False,
            "step": "PostgreSQL connection",
            "error": str(e)
        }

    try:

        # Find database name
        cursor.execute("SELECT current_database();")
        database_name = cursor.fetchone()[0]

        # Check bookmarks table
        cursor.execute("""
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'bookmarks'
            );
        """)

        table_exists = cursor.fetchone()[0]

        if not table_exists:

            return {
                "success": False,
                "step": "bookmarks table",
                "database": database_name,
                "bookmarks_table_exists": False,
                "message": "PostgreSQL is connected, but the bookmarks table does not exist in this database."
            }

        # Get existing bookmarks
        cursor.execute("""
            SELECT id, title, url, category
            FROM bookmarks
            ORDER BY id DESC;
        """)

        rows = cursor.fetchall()

        bookmarks = []

        for row in rows:
            bookmarks.append({
                "id": row[0],
                "title": row[1],
                "url": row[2],
                "category": row[3]
            })

        return {
            "success": True,
            "database": database_name,
            "bookmarks_table_exists": True,
            "bookmarks": bookmarks
        }

    except Exception as e:

        return {
            "success": False,
            "step": "Database query",
            "error": str(e)
        }

    finally:

        cursor.close()
        db.close()