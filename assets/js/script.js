var apiKey = 'c7f3d71450efdca51fea8035a42258bd';

function searchApi(city) {
    console.log(apiKey);
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(url).then(function(response){
        console.log(response);
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
        cityNameEl.textContent = cityName; //add unit of measurement and labels
        
        var currentDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
        var currentDateEl = document.createElement("p");
        currentDateEl.textContent = currentDate; //add unit of measurement and labels


        var icon = data.weather[0].icon;
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "https://www.openweathermap.org/img/wn/" + icon + ".png"); //add unit of measurement and labels

        var temperature = data.main.temp;
        var tempEl = document.createElement("p");
        tempEl.textContent = temperature + " F"; //copy symbol for degree //add unit of measurement and labels

        var humidity = data.main.humidity;
        var humidityEl = document.createElement("p");
        humidityEl.textContent = humidity; //add unit of measurement and labels

        var windSpeed = data.wind.speed;
        var windSpeedEl = document.createElement("p");
        windSpeedEl.textContent = windSpeed; //add unit of measurement //add unit of measurement and labels
     
        document.querySelector("#current-weather").append(cityNameEl, currentDateEl, iconEl, tempEl, humidityEl, windSpeedEl);
        

    })
}

function getForecast(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(function(respone){
        console.log(respone);
        return respone.json();
    })
}

function saveToStorage(cityName) {
    var history = JSON.parse(localStorage.getItem('past-searches')) || []
    if(history.includes(cityName)){
        console.log("already in here ya bum") //need to remove
        return
    }
    history.push(cityName)
    if(history.length > 5){
        history.shift();
    }
    localStorage.setItem('past-searches',JSON.stringify(history));
    renderStorage()
}

function renderStorage() {
    var history = JSON.parse(localStorage.getItem('past-searches')) || [];
    console.log(history)
    if(history.length === 0){
        return
    }
}

function handleFormSubmit(event) {
    event.preventDefault()
    // console.log('trigerred')
    var cityInput = document.getElementById('cityInput').value.trim();
    if (!cityInput){
        alert("Please enter a City") //update text
        return
    }
    searchApi(cityInput)
    saveToStorage(cityInput)
}

document.querySelector('form').addEventListener('submit', handleFormSubmit)