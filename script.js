const apiKey = "ApiKey";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=en`;

  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })

    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(data.message || "Error");
      }
      displayWeather(data);
    })

    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>${error.message}</p>`;
    });
}
function displayWeather(data) {
  const name = data.name;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  const html = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p><strong>${desc}</strong></p>
      <p>Temperature: ${temp}°C</p>
      <p>Feels like: ${feels}°C</p>
    `;

  document.getElementById("weatherResult").innerHTML = html;
}
