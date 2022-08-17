document.querySelector("#searchButton").addEventListener("click", searchWeather)
document.querySelector("#searchText").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#searchButton").click();
    }
  });


function searchWeather(){
searchText = document.querySelector("#searchText").value.trim();
fetchWeather(searchText)
.then((response)=>{loadWeather(response)})
}

//fetch from api
function fetchWeather(city){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=066c24b1dbef5e109839495c0f1bdec7&units=metric`)
  .then((response)=> response.json())
}

//load fetched data to dom using template string
function loadWeather(apiResponse){
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
      <h2>Details</h2>
      <div>Humidity: ${apiResponse.main.humidity}%</div>
      <div>Clouds: ${apiResponse.clouds.all}%</div>
      <br>
      <div>Wind Direction: ${getCardinal(apiResponse.wind.deg)}</div>
      <div>Wind Speed: ${apiResponse.wind.speed} Kmph</div>
      <div>Wind Gust: ${apiResponse.wind.gust} Kmph</div>
  </div>
  <div class="weatherSection">
      <h2>Time</h2>
      <div>Local Time in ${apiResponse.name} (GMT ${apiResponse.timezone/3600}): ${localTime(apiResponse.timezone)}</div>
      <br>
      <div>Sunrise: ${new Date(apiResponse.sys.sunrise*1000).toTimeString()}</div>
      <br>
      <div>Sunset: ${new Date(apiResponse.sys.sunset*1000).toTimeString()}</div>
  </div>
`
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

// Copied from stackoverflow
function localTime(timezoneInSecs){
    var d = new Date();
    var utc = d.getTime();
    var localDate = new Date(utc + (1000*timezoneInSecs));
    return localDate.toUTCString().replace("GMT", "")
}
