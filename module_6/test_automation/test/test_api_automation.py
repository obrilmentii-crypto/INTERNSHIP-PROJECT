import time
import requests
import pytest


BASE_URL = "https://jsonplaceholder.typicode.com"


def test_get_post_status_and_schema():
    response = requests.get(
        f"{BASE_URL}/posts/1",
        timeout=10
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, dict)

    required_fields = [
        "id",
        "userId",
        "title",
        "body"
    ]

    for field in required_fields:
        assert field in data

    assert isinstance(data["id"], int)
    assert isinstance(data["userId"], int)
    assert isinstance(data["title"], str)
    assert isinstance(data["body"], str)


test_payloads = [
    {
        "title": "First automated test post",
        "body": "This is the first test body.",
        "userId": 1
    },
    {
        "title": "Second automated test post",
        "body": "This is the second test body.",
        "userId": 2
    },
    {
        "title": "Third automated test post",
        "body": "This is the third test body.",
        "userId": 3
    }
]


@pytest.mark.parametrize("payload", test_payloads)
def test_create_post(payload):
    response = requests.post(
        f"{BASE_URL}/posts",
        json=payload,
        timeout=10
    )

    assert response.status_code == 201

    data = response.json()

    assert "id" in data

    assert isinstance(data["id"], int)

    assert data["title"] == payload["title"]
    assert data["body"] == payload["body"]
    assert data["userId"] == payload["userId"]


def test_nonexistent_post_returns_404():
    response = requests.get(
        f"{BASE_URL}/posts/999999",
        timeout=10
    )

    assert response.status_code == 404

def test_get_posts_latency():
    start_time = time.perf_counter()

    response = requests.get(
        f"{BASE_URL}/posts",
        timeout=10
    )

    end_time = time.perf_counter()

    latency_ms = (end_time - start_time) * 1000

    assert response.status_code == 200

    assert latency_ms < 1500, (
        f"API latency was {latency_ms:.2f} ms, "
        f"which exceeds the 1500 ms SLA"
    )