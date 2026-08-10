from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

bookmarks = []

@app.get("/api/v1/bookmarks")
def get_bookmarks():
    return bookmarks


@app.post("/api/v1/bookmarks")
def add_bookmark(data: dict):

    if not data.get("title") or not data.get("url"):
        return JSONResponse(
            status_code=400,
            content={"error": "Title and URL are required"}
        )

    bookmark = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "url": data["url"],
        "category": data.get("category", "")
    }

    bookmarks.append(bookmark)

    return JSONResponse(
        status_code=201,
        content=bookmark
    )


@app.delete("/api/v1/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: str):

    for bookmark in bookmarks:

        if bookmark["id"] == bookmark_id:
            bookmarks.remove(bookmark)

            return {
                "message": "Bookmark deleted"
            }

    return JSONResponse(
        status_code=404,
        content={"error": "Bookmark not found"}
    )



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="localhost",
        port=5000
    )