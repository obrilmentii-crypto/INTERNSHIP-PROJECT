const API_URL =
    "https://bookmark-backend-pqlf.onrender.com/api/v1/bookmarks";

const form = document.getElementById("bookmarkForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const categoryInput = document.getElementById("category");

const bookmarksContainer =
    document.getElementById("bookmarksContainer");

const message =
    document.getElementById("message");


// ======================================
// LOAD BOOKMARKS
// ======================================

async function loadBookmarks() {

    try {

        message.textContent = "Loading bookmarks...";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Server error: ${response.status}`
            );
        }

        const bookmarks = await response.json();

        displayBookmarks(bookmarks);

        message.textContent = "";

    } catch (error) {

        console.error("Error loading bookmarks:", error);

        message.textContent =
            "Unable to connect to the backend.";

    }
}


// ======================================
// DISPLAY BOOKMARKS
// ======================================

function displayBookmarks(bookmarks) {

    bookmarksContainer.innerHTML = "";

    if (bookmarks.length === 0) {

        bookmarksContainer.innerHTML =
            "<p>No bookmarks saved yet.</p>";

        return;
    }

    bookmarks.forEach(bookmark => {

        const card = document.createElement("div");

        card.className = "bookmark-card";

        card.innerHTML = `
            <h3>${escapeHTML(bookmark.title)}</h3>

            <p>
                <a
                    href="${escapeHTML(bookmark.url)}"
                    target="_blank"
                >
                    ${escapeHTML(bookmark.url)}
                </a>
            </p>

            <p>
                <strong>Category:</strong>
                ${escapeHTML(bookmark.category || "None")}
            </p>

            <button
                class="delete-button"
                onclick="deleteBookmark(${bookmark.id})"
            >
                Delete
            </button>
        `;

        bookmarksContainer.appendChild(card);

    });
}


// ======================================
// ADD BOOKMARK
// ======================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    const category = categoryInput.value.trim();

    if (!title || !url) {

        alert("Please enter a title and URL.");

        return;
    }

    try {

        message.textContent = "Saving bookmark...";

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

            throw new Error(
                data.detail || "Could not save bookmark"
            );

        }

        console.log("Bookmark saved:", data);

        message.textContent =
            "Bookmark saved successfully!";

        // Clear the form
        form.reset();

        // Load bookmarks again
        await loadBookmarks();

    } catch (error) {

        console.error("Error saving bookmark:", error);

        message.textContent =
            "Could not save bookmark.";

        alert(error.message);

    }

});


// ======================================
// DELETE BOOKMARK
// ======================================

async function deleteBookmark(id) {

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.detail || "Could not delete bookmark"
            );

        }

        await loadBookmarks();

    } catch (error) {

        console.error("Error deleting bookmark:", error);

        alert(error.message);

    }
}


// ======================================
// SECURITY
// ======================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ======================================
// START APPLICATION
// ======================================

loadBookmarks();