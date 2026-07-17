const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

const latitude = 15.223;
const longitude = 120.574;

const currentWeatherElement =
    document.querySelector("#currentWeather");

const forecastElement =
    document.querySelector("#forecast");

const spotlightContainer =
    document.querySelector("#spotlightContainer");

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentWeatherURL),
                fetch(forecastURL)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be retrieved.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        currentWeatherElement.innerHTML = `
            <p>Weather information is currently unavailable.</p>
        `;

        forecastElement.innerHTML = `
            <p>Forecast information is currently unavailable.</p>
        `;
    }
}

function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);

    const description =
        capitalizeWords(data.weather[0].description);

    const iconCode = data.weather[0].icon;

    const iconURL =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    currentWeatherElement.innerHTML = `
        <div class="current-weather-details">
            <p class="current-temperature">
                Current conditions in Mabalacat:
                <strong>${temperature}&deg;F</strong>
            </p>

            <p class="current-description">
                ${description}
            </p>
        </div>

        <img
            src="${iconURL}"
            alt="${description}"
            width="65"
            height="65">
    `;
}

function displayForecast(data) {
    const dailyForecasts = data.list
        .filter((item) =>
            item.dt_txt.includes("12:00:00")
        )
        .slice(0, 3);

    forecastElement.innerHTML = "";

    dailyForecasts.forEach((forecast) => {
        const date =
            new Date(forecast.dt_txt.replace(" ", "T"));

        const dayName =
            new Intl.DateTimeFormat("en-US", {
                weekday: "long"
            }).format(date);

        const temperature =
            Math.round(forecast.main.temp);

        const description =
            forecast.weather[0].description;

        const iconCode =
            forecast.weather[0].icon;

        const iconURL =
            `https://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastCard =
            document.createElement("article");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>

            <img
                src="${iconURL}"
                alt="${description}"
                width="42"
                height="42">

            <p class="forecast-temperature">
                ${temperature}&deg;F
            </p>

            <p>${description}</p>
        `;

        forecastElement.appendChild(forecastCard);
    });
}

function capitalizeWords(text) {
    return text
        .split(" ")
        .map((word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
}

async function getSpotlightMembers() {
    try {
        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Member data could not be retrieved.");
        }

        const data = await response.json();

        const members =
            Array.isArray(data)
                ? data
                : data.members;

        if (!Array.isArray(members)) {
            throw new Error("Invalid members JSON structure.");
        }

        const qualifiedMembers =
            members.filter((member) => {
                const level =
                    Number(member.membershipLevel);

                return level === 2 || level === 3;
            });

        const selectedMembers =
            shuffleArray(qualifiedMembers).slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightContainer.innerHTML = `
            <p>
                Member spotlight information is currently unavailable.
            </p>
        `;
    }
}

function shuffleArray(array) {
    const shuffled = [...array];

    for (
        let index = shuffled.length - 1;
        index > 0;
        index--
    ) {
        const randomIndex =
            Math.floor(Math.random() * (index + 1));

        [
            shuffled[index],
            shuffled[randomIndex]
        ] = [
                shuffled[randomIndex],
                shuffled[index]
            ];
    }

    return shuffled;
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        const membershipLabel =
            Number(member.membershipLevel) === 3
                ? "Gold"
                : "Silver";

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <div class="spotlight-card-header">
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    width="76"
                    height="76"
                    loading="lazy">

                <p class="membership">
                    ${membershipLabel} Member
                </p>
            </div>

            <h3>${member.name}</h3>

            <p>
                <strong>ADDRESS:</strong>
                ${member.address}
            </p>

            <p>
                <strong>PHONE:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>URL:</strong>

                <a href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getWeather();
getSpotlightMembers();