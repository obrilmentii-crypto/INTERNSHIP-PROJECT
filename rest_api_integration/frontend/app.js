const API = "http://localhost:5000/api/v1/bookmarks";

const form = document.getElementById("form");
const bookmarkdisc = document.getElementById("bookmarks");
const message =document.getElementById("message");

async function getBookmarks() {

    try {

        const response = await fetch(API);

        const bookmarks = await response.json();

        bookmarksDiv.innerHTML = "";

        bookmarks.forEach(bookmark => {

            bookmarksDiv.innerHTML += `
                <div class="bookmark">
                    <h3>${bookmark.title}</h3>

                    <a href="${bookmark.url}" target="_blank">
                        ${bookmark.url}
                    </a>

                    <p>Category: ${bookmark.category}</p>

                    <button onclick="deleteBookmark('${bookmark.id}')">
                        Delete
                    </button>
                </div>
            `;

        });

    } catch (error) {
         message.textContent =
            "Cannot connect to the server.";

    }
}

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const category = document.getElementById("category").value;


    try {

        const response = await fetch(API, {

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

            message.textContent = data.error;

            return;
        }


        message.textContent =
            "Bookmark added successfully!";

        form.reset();

        getBookmarks();

    } catch (error) {

        message.textContent =
            "Cannot connect to the server.";
    }

});

async function deleteBookmark(id) {

    try {

        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });


        const data = await response.json();


        if (!response.ok) {

            message.textContent = data.error;

            return;
        }


        message.textContent =
            "Bookmark deleted!";

        getBookmarks();

    } catch (error) {

        message.textContent =
            "Cannot connect to the server.";
    }
}

getBookmarks();
