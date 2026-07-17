
const apiKey = "YOUR_API_KEY";

const lat = 16.7666;
const lon = -3.0026;

const currentURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {

    try {

        const currentResponse = await fetch(currentURL);
        const currentData = await currentResponse.json();

        document.querySelector("#temperature").textContent =
            `${Math.round(currentData.main.temp)}°C`;

        document.querySelector("#description").textContent =
            currentData.weather[0].description;

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        const forecastContainer = document.querySelector("#forecast");

        const forecastDays = forecastData.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        forecastDays.slice(0, 3).forEach(day => {

            const forecastCard = document.createElement("p");

            forecastCard.textContent =
                `${new Date(day.dt_txt).toLocaleDateString()} - ${Math.round(day.main.temp)}°C`;

            forecastContainer.appendChild(forecastCard);

        });

    } catch (error) {
        console.error(error);
    }
}

getWeather();
