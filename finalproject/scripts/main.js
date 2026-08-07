const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}


// Highlight the current page in the navigation

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#site-nav a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});


// Automatically display the current year

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}

const lastModified =
    document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}