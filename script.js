const cityCoordinates = {
  "Berlin, Germany": { lat: 52.52, lon: 13.405 },
  "Helsinki, Finland": { lat: 60.1695, lon: 24.9354 },
  "Madrid, Spain": { lat: 40.4168, lon: -3.7038 },
  "Paris, France": { lat: 48.8566, lon: 2.3522 },
  "Rome, Italy": { lat: 41.9028, lon: 12.4964 },
  "Amsterdam, Netherlands": { lat: 52.3676, lon: 4.9041 }
};

document.getElementById("citySelect").addEventListener("change", async function () {
  const selectedCity = this.value;
  if (!selectedCity) return;

  const coords = cityCoordinates[selectedCity];
  const url = `http://www.7timer.info/bin/api.pl?lon=${coords.lon}&lat=${coords.lat}&product=civil&output=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayForecast(data.dataseries);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

function displayForecast(data) {
  const container = document.getElementById("forecastContainer");
  container.innerHTML = ""; // Clear previous

  data.slice(0, 7).forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <h4>${formatDate(day.date)}</h4>
      <p>${day.weather.replace(/_/g, " ").toUpperCase()}</p>
      <p>H: ${day.temp2m.max}°C</p>
      <p>L: ${day.temp2m.min}°C</p>
    `;
    container.appendChild(card);
  });
}

function formatDate(dateStr) {
  const year = dateStr.toString().substring(0, 4);
  const month = dateStr.toString().substring(4, 6);
  const day = dateStr.toString().substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  return date.toDateString().slice(0, 10);
}
