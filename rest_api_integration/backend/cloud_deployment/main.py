from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI(title="Bookmark API")

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# DATABASE CONNECTION
# --------------------------------------------------

def get_db_connection():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise Exception("DATABASE_URL is not configured")

    return psycopg2.connect(database_url)


# --------------------------------------------------
# CREATE / CHECK TABLE
# --------------------------------------------------

def create_table():

    db = get_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookmarks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                url TEXT NOT NULL,
                category TEXT
            );
        """)

        # If your existing table does not have category,
        # add it automatically.
        cursor.execute("""
            ALTER TABLE bookmarks
            ADD COLUMN IF NOT EXISTS category TEXT;
        """)

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        cursor.close()
        db.close()


# --------------------------------------------------
# STARTUP
# --------------------------------------------------

@app.on_event("startup")
def startup():

    try:
        create_table()
        print("PostgreSQL connected successfully")
        print("Bookmarks table checked successfully")

    except Exception as e:
        print("DATABASE ERROR:", e)


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "Bookmark Backend is running"
    }


# --------------------------------------------------
# HEALTH
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# --------------------------------------------------
# GET ALL BOOKMARKS
# --------------------------------------------------

@app.get("/api/v1/bookmarks")
def get_bookmarks():

    db = get_db_connection()
    cursor = db.cursor()

    try:

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
            "bookmarks": bookmarks
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    finally:

        cursor.close()
        db.close()


# --------------------------------------------------
# BOOKMARK MODEL
# --------------------------------------------------

class Bookmark(BaseModel):

    title: str
    url: str
    category: str | None = None


# --------------------------------------------------
# ADD BOOKMARK
# --------------------------------------------------

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
            RETURNING id, title, url, category;
        """, (
            bookmark.title,
            bookmark.url,
            bookmark.category
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

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    finally:

        cursor.close()
        db.close()


# --------------------------------------------------
# DELETE BOOKMARK
# --------------------------------------------------

@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int):

    db = get_db_connection()
    cursor = db.cursor()

    try:

        cursor.execute("""
            DELETE FROM bookmarks
            WHERE id = %s
            RETURNING id;
        """, (bookmark_id,))

        deleted = cursor.fetchone()

        if deleted is None:

            db.rollback()

            raise HTTPException(
                status_code=404,
                detail="Bookmark not found"
            )

        db.commit()

        return {
            "message": "Bookmark deleted successfully",
            "id": deleted[0]
        }

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    finally:

        cursor.close()
        db.close()