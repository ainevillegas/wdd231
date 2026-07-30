import { places } from "../data/places.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

displayPlaces();
displayVisitMessage();

/**
 * Creates and displays the eight Discover cards.
 */
function displayPlaces() {
    if (!discoverGrid) {
        return;
    }

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.imageAlt;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";
        button.setAttribute(
            "aria-label",
            `Learn more about ${place.name}`
        );

        card.append(
            title,
            figure,
            address,
            description,
            button
        );

        discoverGrid.appendChild(card);
    });
}

/**
 * Displays a custom message based on the visitor's previous visit.
 */
function displayVisitMessage() {
    if (!visitMessage) {
        return;
    }

    const lastVisit = localStorage.getItem("discoverLastVisit");
    const currentVisit = Date.now();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (lastVisit === null) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference =
            currentVisit - Number(lastVisit);

        const numberOfDays = Math.floor(
            timeDifference / millisecondsPerDay
        );

        if (numberOfDays < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else {
            const dayLabel =
                numberOfDays === 1 ? "day" : "days";

            visitMessage.textContent =
                `You last visited ${numberOfDays} ${dayLabel} ago.`;
        }
    }

    localStorage.setItem(
        "discoverLastVisit",
        currentVisit.toString()
    );
}