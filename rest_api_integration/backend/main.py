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


def get_db_connection():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise Exception("DATABASE_URL is missing")

    return psycopg2.connect(database_url)


@app.get("/")
def home():
    return {
        "message": "Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/v1/bookmarks")
def get_bookmarks():

    db = get_db_connection()
    cursor = db.cursor()

    try:

        # Check which database we are connected to
        cursor.execute("SELECT current_database();")

        database_name = cursor.fetchone()[0]

        # Check whether bookmarks table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'bookmarks'
            );
        """)

        table_exists = cursor.fetchone()[0]

        # If table doesn't exist, return diagnostic information
        if not table_exists:

            return {
                "database": database_name,
                "bookmarks_table_exists": False,
                "message": "The Render backend is connected to PostgreSQL, but the bookmarks table does not exist in this database."
            }

        # Get bookmarks
        cursor.execute("""
            SELECT id, title, url, category
            FROM bookmarks
            ORDER BY id DESC
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
            "database": database_name,
            "bookmarks_table_exists": True,
            "bookmarks": bookmarks
        }

    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }

    finally:

        cursor.close()
        db.close()