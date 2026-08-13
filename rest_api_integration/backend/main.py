from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

# Allow your frontend to connect
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
        raise Exception("DATABASE_URL is not set")

    return psycopg2.connect(database_url)


# =========================
# CREATE TABLE
# =========================

def create_table():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookmarks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            url TEXT NOT NULL,
            category VARCHAR(100)
        )
    """)

    db.commit()
    cursor.close()
    db.close()


# Create table when server starts
create_table()


# =========================
# DATA MODEL
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
# HEALTH CHECK
# =========================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =========================
# GET ALL BOOKMARKS
# =========================

@app.get("/api/v1/bookmarks")
def get_bookmarks():

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("""
        SELECT id, title, url, category
        FROM bookmarks
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    cursor.close()
    db.close()

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

    cursor.execute("""
        INSERT INTO bookmarks (title, url, category)
        VALUES (%s, %s, %s)
        RETURNING id, title, url, category
    """, (
        bookmark.title,
        bookmark.url,
        bookmark.category
    ))

    row = cursor.fetchone()

    db.commit()

    cursor.close()
    db.close()

    return {
        "id": row[0],
        "title": row[1],
        "url": row[2],
        "category": row[3]
    }


# =========================
# DELETE BOOKMARK
# =========================

@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int):

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM bookmarks WHERE id = %s RETURNING id",
        (bookmark_id,)
    )

    deleted = cursor.fetchone()

    if not deleted:
        cursor.close()
        db.close()

        raise HTTPException(
            status_code=404,
            detail="Bookmark not found"
        )

    db.commit()

    cursor.close()
    db.close()

    return {
        "message": "Bookmark deleted successfully",
        "id": bookmark_id
    }