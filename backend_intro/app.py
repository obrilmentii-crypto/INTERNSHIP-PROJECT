from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse
from datetime import datetime, timezone

app = FastAPI()


@app.get("/health")
def health():
    return {
        "status": "UP",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": "development"
    }


@app.post("/api/echo")
def echo(payload: dict = Body(...)):
    if "message" not in payload:
        raise HTTPException(
            status_code=400,
            detail="Missing required 'message' field in body"
        )

    message = payload["message"]

    return {
        "received_message": message,
        "character_count": len(message),
        "processed_at": datetime.now(timezone.utc).isoformat()
    }


@app.exception_handler(404)
async def not_found(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Route not found"}
    )