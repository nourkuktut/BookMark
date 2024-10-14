//^Function
function submitForm() {
    // Get input values
    var siteName = document.querySelector("#site-name").value.trim();
    var siteUrl = document.querySelector("#site-url").value.trim();

    if (!validateInput(siteName, siteUrl)) {
        return;
    }

    // Save bookmark
    saveBookmark(siteName, siteUrl);

    // Clear form
    document.querySelector("form").reset();

    // Fetch and display bookmarks again
    fetchBookmarks();
}

// Function to validate name and URL
function validateInput(name, url) {
    if (name.length < 3) {
        alert("Site name must be at least 3 characters long");
        return false;
    }

    var urlPattern =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

    if (!urlPattern.test(url)) {
        alert("Please enter a valid URL");
        return false;
    }

    return true;
}

// Function to save bookmark
function saveBookmark(name, url) {
    var bookmark = {
        name,
        url,
    };

    // Check if bookmarks exist in local storage
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }

    // Add new bookmark to array
    bookmarks.push(bookmark);

    // Save updated bookmarks back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Function to fetch and display bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    var bookmarksResults = document.querySelector("#bookmarks-results");

    // Clear previous results
    bookmarksResults.innerHTML = "";

    // Loop through bookmarks and display them
    bookmarks.forEach((bookmark, index) => {
        bookmarksResults.innerHTML += `
          <tr>
              <td>${index + 1}</td>
              <td>${bookmark.name}</td>
              <td><button type="button" class="visite c-button c-button--gooey"><a href="${
                bookmark.url
              }" target="_blank">Visit</a></td></button>
              <td><button class="delete c-button c-button--gooey" onclick="deleteBookmark('${
                bookmark.url
              }')">Delete</button></td>
          </tr>
      `;
    });
}

// Function to delete bookmark
function deleteBookmark(url) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    // Fetch and display updated bookmarks
    fetchBookmarks();
}