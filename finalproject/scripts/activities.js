import { fetchActivities } from "./data.js";


const container =
    document.querySelector("#activity-list");

const categoryFilter =
    document.querySelector("#category-filter");

const status =
    document.querySelector("#activity-status");

const dialog =
    document.querySelector("#activity-dialog");

const dialogTitle =
    document.querySelector("#dialog-title");

const dialogBody =
    document.querySelector("#dialog-body");

const favoriteButton =
    document.querySelector("#favorite-button");


let activities = [];

let selectedActivity = null;


/* =========================
   LOCAL STORAGE
   ========================= */

function getFavorites() {

    const storedFavorites =
        localStorage.getItem("weekendFavorites");


    if (storedFavorites) {

        return JSON.parse(
            storedFavorites
        );

    }


    return [];
}


function saveFavorite(activityId) {

    const favorites =
        getFavorites();


    if (!favorites.includes(activityId)) {

        favorites.push(activityId);


        localStorage.setItem(
            "weekendFavorites",
            JSON.stringify(favorites)
        );

    }

}


/* =========================
   CREATE CARD
   ========================= */

function createCard(activity) {

    return `
        <article class="card">

            <h2>
                ${activity.name}
            </h2>

            <ul class="card-meta">

                <li>
                    <strong>Category:</strong>
                    ${activity.category}
                </li>

                <li>
                    <strong>Duration:</strong>
                    ${activity.duration}
                </li>

                <li>
                    <strong>Budget:</strong>
                    ${activity.budget}
                </li>

                <li>
                    <strong>ID:</strong>
                    ${activity.id}
                </li>

            </ul>

            <p>
                ${activity.description}
            </p>

            <button
                type="button"
                data-details="${activity.id}"
            >
                View Details
            </button>

        </article>
    `;

}


/* =========================
   RENDER ACTIVITIES
   ========================= */

function renderActivities(items) {

    container.innerHTML =
        items
            .map(createCard)
            .join("");


    status.textContent =
        `${items.length} activities displayed.`;


    const detailButtons =
        document.querySelectorAll(
            "[data-details]"
        );


    detailButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset.details
                    );


                selectedActivity =
                    activities.find(
                        (activity) =>
                            activity.id === id
                    );


                if (selectedActivity) {

                    openActivityDialog(
                        selectedActivity
                    );

                }

            }
        );

    });

}


/* =========================
   MODAL
   ========================= */

function openActivityDialog(activity) {

    dialogTitle.textContent =
        activity.name;


    dialogBody.innerHTML = `

        <p>
            ${activity.description}
        </p>

        <p>
            <strong>Category:</strong>
            ${activity.category}
        </p>

        <p>
            <strong>Duration:</strong>
            ${activity.duration}
        </p>

        <p>
            <strong>Budget:</strong>
            ${activity.budget}
        </p>

    `;


    dialog.showModal();

}


/* =========================
   FILTER
   ========================= */

categoryFilter.addEventListener(
    "change",
    () => {

        const selectedCategory =
            categoryFilter.value;


        if (selectedCategory === "all") {

            renderActivities(
                activities
            );

            return;

        }


        const filteredActivities =
            activities.filter(
                (activity) =>
                    activity.category ===
                    selectedCategory
            );


        renderActivities(
            filteredActivities
        );

    }
);


/* =========================
   SAVE FAVORITE
   ========================= */

favoriteButton.addEventListener(
    "click",
    () => {

        if (!selectedActivity) {

            return;

        }


        saveFavorite(
            selectedActivity.id
        );


        favoriteButton.textContent =
            "Saved";


        setTimeout(
            () => {

                favoriteButton.textContent =
                    "Save to Favorites";

            },
            1200
        );

    }
);


/* =========================
   LOAD DATA
   ========================= */

async function initialize() {

    try {

        activities =
            await fetchActivities();


        if (!Array.isArray(activities)) {

            throw new Error(
                "Activity data is not an array."
            );

        }


        renderActivities(
            activities
        );

    } catch (error) {

        console.error(
            "Activity loading error:",
            error
        );


        container.innerHTML = `
            <p>
                Activity data could not be loaded.
                Please try again later.
            </p>
        `;


        status.textContent =
            "Data loading error.";

    }

}


initialize();