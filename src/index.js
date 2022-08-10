let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hour = now.getHours();
let minute = now.getMinutes();
let date = document.querySelector("#date");
if (minute <= 9) {
  date.innerHTML = days[day] + " " + hour + ":0" + minute;
} else {
  date.innerHTML = days[day] + " " + hour + ":" + minute;
}
let form = document.querySelector(".search-form");
//Current temperature
function dTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let ntemp = document.querySelector("#d-temp");
  ntemp.innerHTML = temperature + "°C";
  let dweather = document.querySelector("#desc");
  dweather.innerHTML = response.data.weather[0].description;
  let h1 = document.querySelector("#urcity");
  h1.innerHTML = response.data.name;
}
//Search for city
function searchC(event) {
  event.preventDefault();
  let apiKey = "ebb3d64cbdc8a91fbd86324a76ac4571";
  let cityInput = document.querySelector("#city-input");
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  let h2 = document.querySelector("#urcity");
  h2.innerHTML = cityInput.value;
  axios.get(url).then(dTemp);
}
form.addEventListener("submit", searchC);
//Your position
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
function Nav(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(CurPosition);
}
let mapBut = document.querySelector("#cur-location");
mapBut.addEventListener("click", Nav);
/*
let switchC = document.querySelector("#c-link");
let switchF = document.querySelector("#f-link");
let num = document.querySelector("#d-temp");
function switchCe(event) {
  let num = document.querySelector("#d-temp");
  event.preventDefault();
  let rnum = 59;
  rnum = Math.ceil(((rnum - 32) * 5) / 9);
  num.innerHTML = rnum + "°C";
}
function switchFe(event) {
  let num = document.querySelector("#d-temp");
  event.preventDefault();
  let rnum = 15;
  rnum = Math.ceil((rnum * 9) / 5 + 32);
  num.innerHTML = rnum + "°F";
}
switchC.addEventListener("click", switchCe);
switchF.addEventListener("click", switchFe);
*/
