
// Set current year
const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();

// Set last modified date
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = "Last Modified: " + document.lastModified;