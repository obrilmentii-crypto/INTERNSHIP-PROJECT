const API_URL = "http://localhost:5000/api/v1/bookmarks";

const form = document.getElementById("bookmarkForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const categoryInput = document.getElementById("category");
const bookmarksList = document.getElementById("bookmarksList");
const message = document.getElementById("message");


// Get bookmarks from backend
async function loadBookmarks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Server error");
        }

        const bookmarks = await response.json();

        bookmarksList.innerHTML = "";

        bookmarks.forEach(bookmark => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${bookmark.title}</h3>
                <p>${bookmark.category || "No category"}</p>
                <a href="${bookmark.url}" target="_blank">
                    ${bookmark.url}
                </a>
                <br><br>
                <button onclick="deleteBookmark(${bookmark.id})">
                    Delete
                </button>
            `;

            bookmarksList.appendChild(card);
        });

    } catch (error) {
        message.textContent = "Cannot connect to the server.";
        message.style.color = "red";
    }
}


// Add bookmark
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const bookmark = {
        title: titleInput.value,
        url: urlInput.value,
        category: categoryInput.value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookmark)
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.detail || "Something went wrong.";
            message.style.color = "red";
            return;
        }

        message.textContent = "Bookmark added successfully!";
        message.style.color = "green";

        form.reset();

        loadBookmarks();

    } catch (error) {
        message.textContent = "Cannot connect to the server.";
        message.style.color = "red";
    }
});


// Delete bookmark
async function deleteBookmark(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        loadBookmarks();

    } catch (error) {
        message.textContent = "Cannot connect to the server.";
        message.style.color = "red";
    }
}


// Load bookmarks when page opens
loadBookmarks();