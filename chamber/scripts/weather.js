const latitude = 15.2230;
const longitude = 120.5740;

const weatherContainer = document.querySelector("#weather");
const forecastContainer = document.querySelector("#forecast");

const weatherURL =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=Asia%2FManila` +
    `&forecast_days=4`;

async function loadWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        displayCurrentWeather(data.current);
        displayForecast(data.daily);
    } catch (error) {
        console.error("Weather loading error:", error);

        weatherContainer.innerHTML = `
            <p class="weather-error">
                Weather information is currently unavailable.
            </p>
        `;

        forecastContainer.innerHTML = `
            <p class="weather-error">
                Forecast information is currently unavailable.
            </p>
        `;
    }
}

function displayCurrentWeather(current) {
    const weather = getWeatherInformation(current.weather_code);

    weatherContainer.innerHTML = `
        <div class="current-weather">

            <div
                class="weather-symbol"
                role="img"
                aria-label="${weather.description}"
            >
                ${weather.icon}
            </div>

            <div class="weather-details">

                <p class="current-temperature">
                    ${Math.round(current.temperature_2m)}&deg;C
                </p>

                <p>${weather.description}</p>

                <p>
                    Humidity:
                    ${current.relative_humidity_2m}%
                </p>

                <p>
                    Wind Speed:
                    ${Math.round(current.wind_speed_10m)} km/h
                </p>

            </div>

        </div>
    `;
}

function displayForecast(daily) {
    forecastContainer.innerHTML = "";

    /*
     * Index 0 represents today.
     * Use indexes 1 to 3 for the next three days.
     */
    for (let index = 1; index <= 3; index += 1) {
        const date = new Date(`${daily.time[index]}T12:00:00`);
        const weather = getWeatherInformation(
            daily.weather_code[index]
        );

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const maximumTemperature = Math.round(
            daily.temperature_2m_max[index]
        );

        const minimumTemperature = Math.round(
            daily.temperature_2m_min[index]
        );

        const forecastCard = document.createElement("article");
        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>

            <div
                class="forecast-symbol"
                role="img"
                aria-label="${weather.description}"
            >
                ${weather.icon}
            </div>

            <p class="forecast-temperature">
                ${maximumTemperature}&deg;C
            </p>

            <p>
                Low: ${minimumTemperature}&deg;C
            </p>

            <p>${weather.description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    }
}

function getWeatherInformation(code) {
    const weatherCodes = {
        0: {
            description: "Clear Sky",
            icon: "☀️"
        },
        1: {
            description: "Mainly Clear",
            icon: "🌤️"
        },
        2: {
            description: "Partly Cloudy",
            icon: "⛅"
        },
        3: {
            description: "Overcast",
            icon: "☁️"
        },
        45: {
            description: "Fog",
            icon: "🌫️"
        },
        48: {
            description: "Rime Fog",
            icon: "🌫️"
        },
        51: {
            description: "Light Drizzle",
            icon: "🌦️"
        },
        53: {
            description: "Moderate Drizzle",
            icon: "🌦️"
        },
        55: {
            description: "Heavy Drizzle",
            icon: "🌧️"
        },
        56: {
            description: "Light Freezing Drizzle",
            icon: "🌧️"
        },
        57: {
            description: "Heavy Freezing Drizzle",
            icon: "🌧️"
        },
        61: {
            description: "Light Rain",
            icon: "🌦️"
        },
        63: {
            description: "Moderate Rain",
            icon: "🌧️"
        },
        65: {
            description: "Heavy Rain",
            icon: "🌧️"
        },
        66: {
            description: "Light Freezing Rain",
            icon: "🌧️"
        },
        67: {
            description: "Heavy Freezing Rain",
            icon: "🌧️"
        },
        71: {
            description: "Light Snow",
            icon: "🌨️"
        },
        73: {
            description: "Moderate Snow",
            icon: "🌨️"
        },
        75: {
            description: "Heavy Snow",
            icon: "❄️"
        },
        77: {
            description: "Snow Grains",
            icon: "❄️"
        },
        80: {
            description: "Light Rain Showers",
            icon: "🌦️"
        },
        81: {
            description: "Moderate Rain Showers",
            icon: "🌧️"
        },
        82: {
            description: "Heavy Rain Showers",
            icon: "⛈️"
        },
        85: {
            description: "Light Snow Showers",
            icon: "🌨️"
        },
        86: {
            description: "Heavy Snow Showers",
            icon: "❄️"
        },
        95: {
            description: "Thunderstorm",
            icon: "⛈️"
        },
        96: {
            description: "Thunderstorm with Hail",
            icon: "⛈️"
        },
        99: {
            description: "Severe Thunderstorm with Hail",
            icon: "⛈️"
        }
    };

    return weatherCodes[code] || {
        description: "Unknown Conditions",
        icon: "🌡️"
    };
}

loadWeather();