const form =
    document.querySelector("#planner-form");

const savedMessage =
    document.querySelector("#saved-message");

const favoriteSummary =
    document.querySelector("#favorite-summary");

const clearButton =
    document.querySelector("#clear-storage");


/*
  GET FAVORITES
*/

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


/*
  DISPLAY NUMBER OF FAVORITES
*/

function renderFavoriteSummary() {

    const favorites =
        getFavorites();


    const count =
        favorites.length;


    if (count === 1) {

        favoriteSummary.textContent =
            "You currently have 1 saved favorite activity.";

    } else {

        favoriteSummary.textContent =
            `You currently have ${count} saved favorite activities.`;

    }
}


/*
  RESTORE SAVED NAME
*/

const savedName =
    localStorage.getItem("plannerName");


if (savedName) {

    const nameField =
        document.querySelector("#name");


    nameField.value =
        savedName;


    savedMessage.textContent =
        `Welcome back, ${savedName}. Your name was restored from local storage.`;
}


/*
  SAVE NAME WHEN FORM IS SUBMITTED
*/

form.addEventListener(
    "submit",
    () => {

        const name =
            document
                .querySelector("#name")
                .value
                .trim();


        localStorage.setItem(
            "plannerName",
            name
        );
    }
);


/*
  CLEAR LOCAL STORAGE
*/

clearButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "plannerName"
        );


        localStorage.removeItem(
            "weekendFavorites"
        );


        savedMessage.textContent =
            "Saved planner data was cleared.";


        document.querySelector("#name").value =
            "";


        renderFavoriteSummary();
    }
);


/*
  RUN WHEN PAGE LOADS
*/

renderFavoriteSummary();