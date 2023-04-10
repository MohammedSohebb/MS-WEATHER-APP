const apiKey = "3f4207b424bc40a1b9a311836b14c81e"; // Replace with your API key from OpenWeatherMap

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const temp = document.getElementById("temp");
const hum = document.getElementById("hum");
const windInfo = document.getElementById("wind-info");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      temp.innerHTML = `<i class="fas fa-thermometer-half"></i> ${temperature}°C`;
      hum.innerHTML = `<i class="fas fa-tint"></i> ${humidity}%`;
      windInfo.innerHTML = `<i class="fas fa-wind"></i> ${windSpeed} m/s`;
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});
