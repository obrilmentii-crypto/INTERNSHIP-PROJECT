# Automated Regression Test Suite

## Overview

This project contains an automated regression test suite for the JSONPlaceholder User & Post Management API.

**API:** https://jsonplaceholder.typicode.com

## Technologies

* Python
* pytest
* requests
* GitHub Actions

## Automated Tests

### Test 1 — Status & Schema Contract Test

Tests `GET /posts/1` and verifies:

* Status code is `200 OK`
* Response is a JSON object
* `id` is numeric
* `userId` is numeric
* `title` is a string
* `body` is a string

### Test 2 — Data-Driven Creation Test

Tests `POST /posts` using three different payloads.

Each request verifies:

* Status code is `201 Created`
* A resource `id` is returned
* The returned data matches the submitted payload

### Test 3 — Negative Assertion & Error Handling

Tests:

`GET /posts/999999`

Expected result:

`404 Not Found`

### Test 4 — Performance Latency SLA Check

Tests:

`GET /posts`

The API response must:

* Return status code `200`
* Have a response latency below `1500ms`

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Run Tests

Run the complete test suite:

```bash
python -m pytest -v
```

## Project Structure

```text
test_automation/
│
├── test/
│   └── test_api_automation.py
│
├── pytest.ini
├── requirements.txt
└── README.md
```

## Continuous Integration

GitHub Actions is configured to run the automated regression test suite on pushes and pull requests.

If any automated assertion fails, the CI pipeline fails.

## Current Status

The test suite is prepared for execution. Run the following command to execute it:

```bash
python -m pytest -v
```
