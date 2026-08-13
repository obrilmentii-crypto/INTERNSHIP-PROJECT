const API_URL = "https://bookmark-backend-pqlf.onrender.com";

const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarksList = document.getElementById("bookmarksList");
const message = document.getElementById("message");


// ========================================
// LOAD BOOKMARKS
// ========================================

async function loadBookmarks() {

    try {

        message.textContent = "Loading bookmarks...";

        const response = await fetch(
            `${API_URL}/api/v1/bookmarks`
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        const data = await response.json();

        displayBookmarks(data.bookmarks);

        message.textContent = "";

    } catch (error) {

        console.error("LOAD ERROR:", error);

        message.textContent =
            "Unable to connect to the backend.";
    }
}


// ========================================
// DISPLAY BOOKMARKS
// ========================================

function displayBookmarks(bookmarks) {

    bookmarksList.innerHTML = "";

    if (!bookmarks || bookmarks.length === 0) {

        bookmarksList.innerHTML =
            "<p>No bookmarks yet.</p>";

        return;
    }

    bookmarks.forEach(bookmark => {

        const item = document.createElement("div");

        item.className = "bookmark";

        item.innerHTML = `
            <h3>${escapeHTML(bookmark.title)}</h3>

            <p>
                Category:
                ${escapeHTML(bookmark.category || "None")}
            </p>

            <a
                href="${escapeAttribute(bookmark.url)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${escapeHTML(bookmark.url)}
            </a>

            <br><br>

            <button
                onclick="deleteBookmark(${bookmark.id})"
            >
                Delete
            </button>
        `;

        bookmarksList.appendChild(item);
    });
}


// ========================================
// ADD BOOKMARK
// ========================================

bookmarkForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const title =
            document.getElementById("title").value.trim();

        const url =
            document.getElementById("url").value.trim();

        const category =
            document.getElementById("category").value.trim();


        if (!title || !url) {

            message.textContent =
                "Title and URL are required.";

            return;
        }


        try {

            message.textContent =
                "Saving bookmark...";


            const response = await fetch(
                `${API_URL}/api/v1/bookmarks`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: title,
                        url: url,
                        category: category
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail || "Failed to save bookmark"
                );
            }


            message.textContent =
                "Bookmark saved successfully!";


            bookmarkForm.reset();


            await loadBookmarks();


        } catch (error) {

            console.error("SAVE ERROR:", error);

            message.textContent =
                "Error saving bookmark: " + error.message;
        }
    }
);


// ========================================
// DELETE BOOKMARK
// ========================================

async function deleteBookmark(id) {

    try {

        const response = await fetch(
            `${API_URL}/api/v1/bookmarks/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Failed to delete bookmark"
            );
        }


        message.textContent =
            "Bookmark deleted successfully!";


        await loadBookmarks();


    } catch (error) {

        console.error("DELETE ERROR:", error);

        message.textContent =
            "Error deleting bookmark: " + error.message;
    }
}


// ========================================
// SECURITY HELPERS
// ========================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


function escapeAttribute(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// ========================================
// START APPLICATION
// ========================================

loadBookmarks();