document.querySelector("#searchButton").addEventListener("click", searchWeather)
document.querySelector("#searchText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#searchButton").click();
    }
  });


function searchWeather(){
document.querySelector("#loadingContainer").classList.remove("hidden")
searchText = document.querySelector("#searchText").value.trim();
fetchCurrentWeather(searchText)
.then((response)=>{loadCurrentWeather(response)})
.then(()=>fetchForecastWeather(searchText))
.then((response)=>{loadForecastWeather(response)})
.then(()=>document.querySelector("#loadingContainer").classList.add("hidden"))
.catch(()=>{
  document.querySelector("#loadingContainer").classList.add("hidden")
  let container = document.querySelector("#weatherContainer")
  container.innerHTML = "Something went wrong. Try Searching again."
}
)
}

//fetch from api
function fetchCurrentWeather(city){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=066c24b1dbef5e109839495c0f1bdec7&units=metric`)
  .then((response)=> response.json())
}

function fetchForecastWeather(city){
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=066c24b1dbef5e109839495c0f1bdec7&units=metric`)
  .then((response)=> response.json())
}

function loadCurrentWeather(apiResponse){
  let container = document.querySelector("#weatherContainer")
  container.innerHTML = ""
  container.innerHTML = `
  <div id="weatherHead">
      <div>
          <div id="cityName">${apiResponse.name}, ${apiResponse.sys.country}</div>
          <div>${apiResponse.main.temp}c, feels like ${apiResponse.main.feels_like}c</div>
      </div>
          <figure>
              <img src="http://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@2x.png" alt="weather-icon" id="weatherIcon">
          <figcaption>${apiResponse.weather[0].description}</figcaption>
          </figure>
  </div>
  <div class="weatherSection">
      <h2>Current Weather</h2>
      <div>Humidity: ${apiResponse.main.humidity}%</div>
      <div>Clouds: ${apiResponse.clouds.all}%</div>
      <br>
      <div>Wind Direction: ${getCardinal(apiResponse.wind.deg)}</div>
      <div>Wind Speed: ${apiResponse.wind.speed} Kmph</div>
      <div>Wind Gust: ${apiResponse.wind.gust} Kmph</div>
  </div>
  <div class="weatherSection">
  <h2>5 Days Forecast</h2>
  <div id="forecastContainer"></div>
  </div>
  <div class="weatherSection">
      <h2>Time</h2>
      <div>Sunrise: ${formatDate(apiResponse.sys.sunrise).hours}:${formatDate(apiResponse.sys.sunrise).minutes} ${formatDate(apiResponse.sys.sunset).ampm} (converted to your timezone)</div>
      <br>
      <div>Sunset: ${formatDate(apiResponse.sys.sunset).hours}:${formatDate(apiResponse.sys.sunset).minutes} ${formatDate(apiResponse.sys.sunset).ampm} (converted to your timezone)</div>
      <br>
      <div>Local Time in ${apiResponse.name} (GMT ${apiResponse.timezone/3600}): ${localDate(apiResponse.timezone)}</div>
  </div>
`}

function loadForecastWeather(apiResponse){
  let container = document.querySelector("#forecastContainer")
  container.innerHTML = ""
  apiResponse.list.forEach((forecast)=>{
    let section = document.createElement("div");
    section.classList.add("forecastSection");
    section.innerHTML =`            
    <div class="forecast-date">${formatDate(forecast.dt).day} ${formatDate(forecast.dt).month}</div>            
    <div class="forecast-time">${formatDate(forecast.dt).hours} ${formatDate(forecast.dt).ampm}</div>            
    <div class="forecast-description">${Math.round(forecast.main.temp_min)}-${Math.round(forecast.main.temp_max)}c</div>
    <div class="forecast-description">feels ${Math.round(forecast.main.feels_like)}c</div>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather-icon">
    <div class="forecast-description">${forecast.weather[0].description}</div>
    <br>
    <div class="forecast-description">${forecast.wind.speed} Kmph ${getCardinal(forecast.wind.deg)}</div>
    <div class="forecast-description">${forecast.clouds.all}% clouds</div>
    `
    container.appendChild(section);
  })
}

function formatDate(unix){
  unix = unix*1000
  let date = new Date(unix)
  let year = date.getFullYear()
  let month = date.toLocaleString('default', { month: 'short'})
  let day = date.toLocaleString('default', {day:'numeric'})
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let ampm = hours >= 12 ? 'PM' : 'AM';
  if(hours>12){
    hours = hours-12
  }
  if(minutes<10){
    minutes = `0${minutes}`
  }
  return {year, day, month, hours, minutes, seconds, ampm}
}

function localDate(timezoneSecs){
now = new Date().getTime()
timezone = timezoneSecs*1000
timeOffset = new Date().getTimezoneOffset()*60*1000
nowLocal = formatDate((now+timeOffset+timezone)/1000)
return `${nowLocal.hours}:${nowLocal.minutes} ${nowLocal.ampm} - ${nowLocal.day} ${nowLocal.month} ${nowLocal.year}`
}
// Copied from Github
function getCardinal(angle) {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;
  
    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "NW";
  }
