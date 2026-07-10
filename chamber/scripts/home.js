
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        menuButton.classList.toggle("open");
        navigation.classList.toggle("open");
    });
}

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Weather API
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const lat = 10.3157;
const lon = 123.8854;

const weatherUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error("Weather data unavailable.");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        document.querySelector("#current-temp").textContent = "Unavailable";
        document.querySelector("#weather-desc").textContent =
            "Weather data could not be loaded.";
        document.querySelector("#forecast").textContent = "";
    }
}

function displayWeather(data) {
    const current = data.list[0];

    document.querySelector("#current-temp").textContent =
        `${Math.round(current.main.temp)}°F`;

    document.querySelector("#weather-desc").textContent =
        current.weather[0].description;

    const forecastContainer = document.querySelector("#forecast");
    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p><strong>${date.toLocaleDateString("en-US", {
            weekday: "long"
        })}</strong></p>
            <p>${Math.round(day.main.temp)}°F</p>
            <p>${day.weather[0].description}</p>
        `;

        forecastContainer.appendChild(card);
    });
}

// Spotlight Members
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Member data unavailable.");
        }

        const data = await response.json();
        displaySpotlights(data.members);

    } catch (error) {
        document.querySelector("#spotlights").textContent =
            "Spotlight members could not be loaded.";
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector("#spotlights");
    spotlightContainer.innerHTML = "";

    const qualifiedMembers = members.filter(member =>
        member.level.toLowerCase() === "gold" ||
        member.level.toLowerCase() === "silver"
    );

    const shuffledMembers = [...qualifiedMembers].sort(
        () => Math.random() - 0.5
    );

    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            images/${member.image}

            <h3>${member.name}</h3>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Membership:</strong> ${member.level}</p>

            <p>
                ${member.website}
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getWeather();
getSpotlights();
