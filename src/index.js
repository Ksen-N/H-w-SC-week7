function TimeC(time) {
  let day = time.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let hour = time.getHours();
  let minute = time.getMinutes();
  if (minute <= 9) {
    return days[day] + " " + hour + ":0" + minute;
  } else {
    return days[day] + " " + hour + ":" + minute;
  }
}
//Current time
let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = TimeC(now);
//Current temperature at your city
function dTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let ntemp = document.querySelector("#d-temp");
  ntemp.innerHTML = temperature;

  cTemp = response.data.main.temp;

  let dweather = document.querySelector("#desc");
  dweather.innerHTML = response.data.weather[0].description;

  let h1 = document.querySelector("#urcity");
  h1.innerHTML = response.data.name;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = response.data.main.humidity + "%";

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h";

  let icon = document.querySelector("#w-icon");
  icon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  icon.setAttribute(
    "alt",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].description +
      "@2x.png"
  );
}
function searchC(city) {
  let apiKey = "ebb3d64cbdc8a91fbd86324a76ac4571";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(url).then(dTemp);
}
function CurPosition(position) {
  let apiKey = "ebb3d64cbdc8a91fbd86324a76ac4571";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=" +
    apiKey;
  axios.get(url).then(dTemp);
}
function SubC(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchC(city);
}
function Nav(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(CurPosition);
}
//Switch units
let cTemp = null;
let switchC = document.querySelector("#c-link");
let switchF = document.querySelector("#f-link");
function switchCe(event) {
  let tempElement = document.querySelector("#d-temp");
  event.preventDefault();
  tempElement.innerHTML = Math.round(cTemp);
  switchF.classList.remove("active");
  switchC.classList.add("active");
}
function switchFe(event) {
  let tempElement = document.querySelector("#d-temp");
  event.preventDefault();
  let Fnum = Math.round((tempElement.innerHTML * 9) / 5 + 32);
  tempElement.innerHTML = Fnum;
  switchF.classList.add("active");
  switchC.classList.remove("active");
}
switchC.addEventListener("click", switchCe);
switchF.addEventListener("click", switchFe);

let form = document.querySelector(".search-form");
form.addEventListener("submit", SubC);

let mapBut = document.querySelector("#cur-location");
mapBut.addEventListener("click", Nav);

searchC("Kharkiv");
