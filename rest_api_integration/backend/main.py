from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()

app = FastAPI()

# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PostgreSQL connection
db = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

print("PostgreSQL connection successful!")


class Bookmark(BaseModel):
    title: str
    url: str
    category: str


@app.get("/")
def home():
    return {"message": "Backend is connected to PostgreSQL"}


# GET
@app.get("/api/v1/bookmarks")
def get_bookmarks():

    cursor = db.cursor()

    try:
        cursor.execute(
            "SELECT id, title, url, category FROM bookmarks ORDER BY id"
        )

        rows = cursor.fetchall()

        bookmarks = []

        for row in rows:
            bookmarks.append({
                "id": row[0],
                "title": row[1],
                "url": row[2],
                "category": row[3]
            })

        cursor.close()

        return {"bookmarks": bookmarks}

    except Exception as e:
        db.rollback()
        cursor.close()

        print("GET ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# POST
@app.post("/api/v1/bookmarks")
def create_bookmark(bookmark: Bookmark):

    cursor = db.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO bookmarks (title, url, category)
            VALUES (%s, %s, %s)
            RETURNING id, title, url, category
            """,
            (
                bookmark.title,
                bookmark.url,
                bookmark.category
            )
        )

        row = cursor.fetchone()

        db.commit()
        cursor.close()

        return {
            "id": row[0],
            "title": row[1],
            "url": row[2],
            "category": row[3]
        }

    except Exception as e:
        db.rollback()
        cursor.close()

        print("POST ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# DELETE
@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int):

    cursor = db.cursor()

    try:
        cursor.execute(
            "DELETE FROM bookmarks WHERE id = %s RETURNING id",
            (bookmark_id,)
        )

        deleted = cursor.fetchone()

        if deleted is None:
            db.rollback()
            cursor.close()

            raise HTTPException(
                status_code=404,
                detail="Bookmark not found"
            )

        db.commit()
        cursor.close()

        return {
            "message": "Bookmark deleted successfully",
            "id": bookmark_id
        }

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        cursor.close()

        print("DELETE ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )