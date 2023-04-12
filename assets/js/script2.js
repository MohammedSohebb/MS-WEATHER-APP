// Initialize the Azure Maps SDK
var map, searchInput;
var subscriptionKey = 'Xud7Ai-Yo-kwULKdaYRalVBFyE55TIi2-C2xoLqPcB8';
var mapStyle = 'road_shaded_relief';

// Wait for the page to load before creating the map
window.onload = function () {
    // Create a new map object
    map = new atlas.Map('map', {
        center: [-122.33, 47.6],
        zoom: 10,
        language: 'en-US',
        view: 'Auto',
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: subscriptionKey
        },
        style: 'vector',
        enableAccessibility: true
    });

    // Add a search bar to the map
    searchInput = document.getElementById('search');
    map.controls.add(new atlas.control.SearchControl({
        style: 'auto',
        placeHolder: 'Search',
        showRemoveButton: true,
        showFeedbackButton: false,
        searchCallback: searchCallback
    }), {
        position: 'top-left'
    });
}

// Define the search callback function
function searchCallback(searchResponse) {
    if (searchResponse && searchResponse.results && searchResponse.results.length > 0) {
        var result = searchResponse.results[0];
        map.setCamera({
            center: result.position,
            zoom: 12
        });
    }
}

// Define a function to get the weather data
function getWeatherData(city) {
    var xhr = new XMLHttpRequest();
    var apiKey = '01f63db49a7e11b15a04d7516f0f9451';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var weatherData = JSON.parse(xhr.responseText);
            displayWeatherData(weatherData);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Define a function to display the weather data
function displayWeatherData(weatherData) {
    var cityName = weatherData.name;
    var temperature = weatherData.main.temp;
    var description = weatherData.weather[0].description;
    var iconCode = weatherData.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    
    var cityElement = document.getElementById('city');
    var temperatureElement = document.getElementById('temperature');
    var descriptionElement = document.getElementById('description');
    var iconElement = document.getElementById('icon');
    
    cityElement.innerHTML = cityName;
    temperatureElement.innerHTML = temperature + '°C';
    descriptionElement.innerHTML = description;
    iconElement.src = iconUrl;
}

// Get the city name from the search input field and get the weather data
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var city = searchInput.value;
    getWeatherData(city);
});
