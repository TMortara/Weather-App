var apiKey = 'c7f3d71450efdca51fea8035a42258bd';

function searchApi(city) {
    console.log(apiKey);
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(url).then(function(response){
        console.log(response.status);
        if (response.status !== 200) {
            alert("Status: " + response.status + "\n" + "Please enter a valid city.");
        }
        return response.json();
    }).then(function(data){
        console.log(data);
        getWeather(data[0].lat, data[0].lon);
        getForecast(data[0].lat, data[0].lon);
    })
}

function getWeather(lat, lon) {
    var url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        var cityName = data.name;
        var cityNameEl = document.createElement("p");
        cityNameEl.textContent = cityName;
        
        var currentDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
        var currentDateEl = document.createElement("p");
        currentDateEl.textContent = currentDate;

        var icon = data.weather[0].icon;
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "https://www.openweathermap.org/img/wn/" + icon + ".png");

        var temperature = data.main.temp;
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temperature: " + (Math.floor(temperature)) + "°F";

        var humidity = data.main.humidity;
        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humidity: " + humidity + "%";

        var windSpeed = data.wind.speed;
        var windSpeedEl = document.createElement("p");
        windSpeedEl.textContent = "Wind Speed: " + windSpeed + " mph";
     
        document.querySelector("#current-weather").append(cityNameEl, currentDateEl, iconEl, tempEl, humidityEl, windSpeedEl);
        

    })
}

function getForecast(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(function(respone){
        return respone.json();
    })
    .then(function(data){
        console.log(data);   
    })
    // for (var i = 1; data.length < 6; i++) {
    //     var Date = new Date(data.dt * 1000).toLocaleDateString("en-US");
    //     var DateEl = document.createElement("p");
    //     DateEl.textContent = Date;
    // }
}

function saveToStorage(cityName) {
    var history = JSON.parse(localStorage.getItem('past-searches')) || [];
    if(history.includes(cityName)){
        console.log("already in here ya bum"); //need to remove
        return
    }
    history.push(cityName);
    if(history.length > 5){
        history.shift();
    }
    localStorage.setItem('past-searches',JSON.stringify(history));
    renderStorage();
}

function renderStorage() {
    var history = JSON.parse(localStorage.getItem('past-searches')) || [];
    console.log(history);
    if(history.length === 0){
        return;
    } else {
        var searchHistoryEl = document.querySelector("#search-history");
        searchHistoryEl.innerHTML = "";
        var searchHistory = JSON.parse(localStorage.getItem(history)) || [];
        for (var i = 0; i < history.length; i++) {
            var cityList = document.createElement("button");
            cityList.textContent = `${history[i]}`;
            cityList.setAttribute("data-index", i);
            searchHistoryEl.appendChild(cityList);
            cityList.addEventListener("click", getWeather, false);
        } 
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    // console.log('trigerred')
    var cityInput = document.getElementById('cityInput').value.trim();
    if (!cityInput){
        alert("Please enter a city!"); 
        return;
    }
    searchApi(cityInput);
    saveToStorage(cityInput);
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);