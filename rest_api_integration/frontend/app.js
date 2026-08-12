const API_URL = "https://bookmark-backend-pqlf.onrender.com/api/v1/bookmarks";

const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarksContainer = document.getElementById("bookmarksContainer");

// Load bookmarks when the page opens
document.addEventListener("DOMContentLoaded", loadBookmarks);

// Get bookmarks from FastAPI
async function loadBookmarks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load bookmarks");
        }

        const bookmarks = await response.json();

        displayBookmarks(bookmarks);
    } catch (error) {
        console.error("Error loading bookmarks:", error);

        if (bookmarksContainer) {
            bookmarksContainer.innerHTML = `
                <p>Unable to load bookmarks. Please try again.</p>
            `;
        }
    }
}

// Display bookmarks on the page
function displayBookmarks(bookmarks) {
    if (!bookmarksContainer) {
        return;
    }

    bookmarksContainer.innerHTML = "";

    if (bookmarks.length === 0) {
        bookmarksContainer.innerHTML = `
            <p>No bookmarks yet. Add your first bookmark!</p>
        `;
        return;
    }

    bookmarks.forEach(bookmark => {
        const bookmarkCard = document.createElement("div");

        bookmarkCard.className = "bookmark-card";

        bookmarkCard.innerHTML = `
            <h3>${escapeHTML(bookmark.title)}</h3>

            <p>
                <a href="${escapeAttribute(bookmark.url)}" target="_blank">
                    ${escapeHTML(bookmark.url)}
                </a>
            </p>

            <p>
                <strong>Category:</strong>
                ${escapeHTML(bookmark.category || "Uncategorized")}
            </p>

            <button class="delete-btn" data-id="${bookmark.id}">
                Delete
            </button>
        `;

        bookmarksContainer.appendChild(bookmarkCard);
    });

    // Add delete event to each button
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            deleteBookmark(id);
        });
    });
}

// Add a new bookmark
async function addBookmark(title, url, category) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                url: url,
                category: category
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Failed to add bookmark");
        }

        // Clear the form
        if (bookmarkForm) {
            bookmarkForm.reset();
        }

        // Reload bookmarks
        await loadBookmarks();

    } catch (error) {
        console.error("Error adding bookmark:", error);
        alert(error.message);
    }
}

async function deleteBookmark(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Failed to delete bookmark");
        }

        // Reload bookmarks
        await loadBookmarks();

    } catch (error) {
        console.error("Error deleting bookmark:", error);
        alert(error.message);
    }
}

if (bookmarkForm) {
    bookmarkForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const titleInput = document.getElementById("title");
        const urlInput = document.getElementById("url");
        const categoryInput = document.getElementById("category");

        const title = titleInput.value.trim();
        const url = urlInput.value.trim();
        const category = categoryInput
            ? categoryInput.value.trim()
            : "";

        if (!title || !url) {
            alert("Title and URL are required.");
            return;
        }

        await addBookmark(title, url, category);
    });
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

function escapeAttribute(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}