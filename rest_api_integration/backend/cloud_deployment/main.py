from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# PostgreSQL connection
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL environment variable is missing")

db = psycopg2.connect(DATABASE_URL)

print("PostgreSQL connection successful!")


@app.get("/")
def home():
    return {
        "message": "Backend is connected to PostgreSQL"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/v1/bookmarks")
def get_bookmarks():

    cursor = db.cursor()

    cursor.execute(
        """
        SELECT id, title, url, category
        FROM bookmarks
        ORDER BY id
        """
    )

    rows = cursor.fetchall()

    cursor.close()

    bookmarks = []

    for row in rows:
        bookmarks.append({
            "id": row[0],
            "title": row[1],
            "url": row[2],
            "category": row[3]
        })

    return bookmarks


@app.post("/api/v1/bookmarks", status_code=201)
def create_bookmark(bookmark: dict):

    title = bookmark.get("title")
    url = bookmark.get("url")
    category = bookmark.get("category", "")

    if not title or not url:
        raise HTTPException(
            status_code=400,
            detail="Title and URL are required"
        )

    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO bookmarks (title, url, category)
        VALUES (%s, %s, %s)
        RETURNING id
        """,
        (title, url, category)
    )

    new_id = cursor.fetchone()[0]

    db.commit()

    cursor.close()

    return {
        "id": new_id,
        "title": title,
        "url": url,
        "category": category
    }


@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int):

    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM bookmarks
        WHERE id = %s
        RETURNING id
        """,
        (bookmark_id,)
    )

    deleted = cursor.fetchone()

    if deleted is None:
        cursor.close()

        raise HTTPException(
            status_code=404,
            detail="Bookmark not found"
        )

    db.commit()

    cursor.close()

    return {
        "message": "Bookmark deleted successfully"
    }