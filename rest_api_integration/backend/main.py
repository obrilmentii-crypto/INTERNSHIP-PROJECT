from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# DATABASE CONNECTION
# =========================

def get_db_connection():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise Exception("DATABASE_URL is missing")

    return psycopg2.connect(database_url)


# =========================
# CREATE TABLE
# =========================

def create_table():

    db = get_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookmarks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                url TEXT NOT NULL,
                category VARCHAR(100) DEFAULT ''
            )
        """)

        db.commit()

        print("Bookmarks table is ready.")

    except Exception as e:

        db.rollback()

        print("Error creating bookmarks table:", e)

    finally:

        cursor.close()
        db.close()


# Create the table when the server starts
create_table()


# =========================
# BOOKMARK MODEL
# =========================

class Bookmark(BaseModel):
    title: str
    url: str
    category: str = ""


# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "message": "Bookmark Backend is running",
        "database": "PostgreSQL connected"
    }


# =========================
# HEALTH
# =========================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# =========================
# GET BOOKMARKS
# =========================

@app.get("/api/v1/bookmarks")
def get_bookmarks():

    db = get_db_connection()
    cursor = db.cursor()

    try:

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
            "bookmarks": bookmarks
        }

    except Exception as e:

        db.rollback()

        print("Error getting bookmarks:", e)

        raise HTTPException(
            status_code=500,
            detail="Database error while getting bookmarks"
        )

    finally:

        cursor.close()
        db.close()


# =========================
# ADD BOOKMARK
# =========================

@app.post("/api/v1/bookmarks")
def add_bookmark(bookmark: Bookmark):

    if not bookmark.title.strip():

        raise HTTPException(
            status_code=400,
            detail="Title is required"
        )

    if not bookmark.url.strip():

        raise HTTPException(
            status_code=400,
            detail="URL is required"
        )

    db = get_db_connection()
    cursor = db.cursor()

    try:

        cursor.execute("""
            INSERT INTO bookmarks (title, url, category)
            VALUES (%s, %s, %s)
            RETURNING id, title, url, category
        """, (
            bookmark.title.strip(),
            bookmark.url.strip(),
            bookmark.category.strip()
        ))

        row = cursor.fetchone()

        db.commit()

        return {
            "id": row[0],
            "title": row[1],
            "url": row[2],
            "category": row[3]
        }

    except Exception as e:

        db.rollback()

        print("Error adding bookmark:", e)

        raise HTTPException(
            status_code=500,
            detail="Database error while saving bookmark"
        )

    finally:

        cursor.close()
        db.close()


# =========================
# DELETE BOOKMARK
# =========================

@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int):

    db = get_db_connection()
    cursor = db.cursor()

    try:

        cursor.execute(
            """
            DELETE FROM bookmarks
            WHERE id = %s
            RETURNING id
            """,
            (bookmark_id,)
        )

        deleted = cursor.fetchone()

        if not deleted:

            db.rollback()

            raise HTTPException(
                status_code=404,
                detail="Bookmark not found"
            )

        db.commit()

        return {
            "message": "Bookmark deleted successfully",
            "id": bookmark_id
        }

    except HTTPException:

        raise

    except Exception as e:

        db.rollback()

        print("Error deleting bookmark:", e)

        raise HTTPException(
            status_code=500,
            detail="Database error while deleting bookmark"
        )

    finally:

        cursor.close()
        db.close()