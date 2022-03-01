let now = new Date();

let h1 = document.querySelector("h1");

let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h1.innerHTML = `${day}, ${date} ${month} ${year}`;

let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  h3.innerHTML = `0${hours}:${minutes}`;
} else {
  h3.innerHTML = `${hours}:${minutes}`;
}
if (minutes < 10) {
  h3.innerHTML = `${hours}:0${minutes}`;
} else {
  h3.innerHTML = `${hours}:${minutes}`;
}
function temperatureToday(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}Km/h`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  iconElement.setAttribute(
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("iconElement").innerHTML =
    response.data.weather[0].icon;
}
function searching(event) {
  event.preventDefault();
  let apiKey = "ab71c92f5b2dc5177b732d5b87167782";
  let city = document.querySelector("#input-text").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperatureToday);
}
let form = document.querySelector("#search-button");
form.addEventListener("click", searching);

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let temperaturee = temperature.innerHTML;
  temperature.innerHTML = Math.round(temperaturee * (9 / 5) + 32);
}
let changeToFahrenheit = document.querySelector("#fahrenheit-link");
changeToFahrenheit.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#temp");
  let temperatureeF = temperatureF.innerHTML;
  temperatureF.innerHTML = Math.round(temperatureeF / (9 * 5) - 32);
}
let changeToCelsius = document.querySelector("#celsius-link");
changeToCelsius.addEventListener("click", fahrenheitToCelsius);
