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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
  <div class = "container-row-cols-md-3">
   <div class="card day">
    <div class="card-body">
      <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42>
        <span class="card-text">${Math.round(forecastDay.temp.max)}ºC</span>
        <span class="minimum-temp"> ${Math.round(forecastDay.temp.min)}ºC</span>
     </div>
    </div>
  </div>
</div>

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ab71c92f5b2dc5177b732d5b87167782";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
