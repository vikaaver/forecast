const weathercode = document.querySelector("#weatherCard");
const info = document.querySelector("#info");
const place = document.querySelector("#place");
const temperatureItem = document.querySelector("#temperature");
const wind = document.querySelector("#wind");
const forecast = document.querySelector("#forecast");
console.log(forecast);

async function loadWeather() {
  const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const obj = await res.json();
  const { latitude, longitude, city, country } = obj;
  console.log(latitude, longitude, city);

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );

  const data = await response.json();

  const { current_weather } = data;
  const { windSpeed, winddirection, weathercode, temperature } =
    current_weather;
  forecast.textContent = getWeatherDescription(weathercode);

  info.textContent = "Our forecast is: ";
  place.textContent = `${city} , ${country}`;
  temperatureItem.textContent =
    temperature + " " + data.current_weather_units.temperature;
  wind.textContent = windSpeed + " " + data.current_weather_units.windspeed;
  weatherCard.classList.add("show");

  const weatherDescription = getWeatherDescription(weathercode);
  console.log("Описание погоды:", weatherDescription);
}

function getWeatherDescription(code) {
  let weatherDescription;
  switch (code) {
    case 0:
      return "Clear";

    case 1:
      return "Mainly clear";

    case 2:
      return " partly cloudy";

    case 3:
      return "overcast";

    case 45:
      return "Fog and depositing rime fog";

    case 48:
      return "depositing rime fog";

    case 51:
      return " Light drizzle";

    case 53:
      return "moderate drizzle";

    case 55:
      return "dense intensity";

    case 56:
      return "Freezing Drizzle: Light ";

    case 57:
      return "Freezing Drizzle: dense intensity ";

    case 61:
      return "Rain: Slight ";

    case 63:
      return "Rain: moderate ";

    case 65:
      return "Rain: heavy intensity ";

    case 66:
      return "Freezing Rain: Light";

    case 67:
      return "Freezing Rain: heavy intensity";

    case 71:
      return "Snow fall: Slight";

    case 73:
      return "Snow fall: moderate";

    case 75:
      return "Snow fall: heavy intensity";

    case 77:
      return "Snow grains";

    case 80:
      return "Slight Rain showers";
    case 81:
      return "Moderate Rain showers";
    case 82:
      return "Violent Rain showers";
    case 85:
      return "Slight Snow showers";
    case 86:
      return "Heavy Snow showers";
    case 95:
      return "Thunderstorm moderate";
    case 96:
      return "Thunderstorm slight";
    case 99:
      return "Thunderstorm slight";
  }
}

loadWeather();
