function saveToStorage(cityName){
    var history = JSON.parse(localStorage.getItem('past-searches')) || []
    if(history.includes(cityName)){
        console.log("already in here ya bum")
        return
    }
    history.push(cityName)
    if(history.length > 5){
        history.shift()
    }
    localStorage.setItem('past-searches',JSON.stringify(history))
    renderStorage()
}

function renderStorage(){
    var history = JSON.parse(localStorage.getItem('past-searches')) || []
    console.log(history)
    if(history.length ===0){
        return
    }
}

function handleFormSubmit(event){
    event.preventDefault()
    console.log('trigerred')
    var cityInput = document.getElementById('cityInput').value.trim()
    if (!cityInput){
        alert("Please enter a city")
        return
    }
    //searchApi(cityInput)
    saveToStorage(cityInput)
}

document.querySelector('form').addEventListener('submit', handleFormSubmit)