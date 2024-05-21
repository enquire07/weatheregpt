async function fetchCurrentWeather(city) {
  try {
    const response = await fetch(`API_URL_FOR_CURRENT_WEATHER?city=${city}`);
    const data = await response.json();
    renderCurrentWeather(data);
  } catch (error) {
    console.error('Error fetching current weather data:', error);
  }
}

function renderCurrentWeather(data) {
  const currentWeatherSection = document.querySelector('.current-weather');
  currentWeatherSection.innerHTML = `
        <h2>${data.city}</h2>
        <p>${data.temperature}°C</p>
        <p>${data.description}</p>
    `;
}

// Call this function with a default city or user's input
fetchCurrentWeather('New York');

async function fetchWeeklyWeather(city) {
  try {
    const response = await fetch(`API_URL_FOR_WEEKLY_WEATHER?city=${city}`);
    const data = await response.json();
    renderWeeklyWeather(data);
  } catch (error) {
    console.error('Error fetching weekly weather data:', error);
  }
}

function renderWeeklyWeather(data) {
  const forecastSection = document.querySelector('.forecast__days');
  forecastSection.innerHTML = data.forecast
    .map(
      day => `
        <li class="day-weather">
            <p>${day.date}</p>
            <p>${day.temperature}°C</p>
            <p>${day.description}</p>
        </li>
    `
    )
    .join('');
}

document.querySelector('.button-forecast').addEventListener('click', () => {
  fetchWeeklyWeather('New York');
});

function toggleMoreInfo() {
  const moreInfoSection = document.querySelector('.forecast-info__list');
  moreInfoSection.classList.toggle('hidden');
}

document
  .querySelector('.forecast-info__btn')
  .addEventListener('click', toggleMoreInfo);

function toggleChart() {
  const chartSection = document.querySelector('.fivedays-chart');
  chartSection.classList.toggle('hidden');
}

document
  .querySelector('.showchartBtnJs')
  .addEventListener('click', toggleChart);

async function fetchChartData() {
  try {
    const response = await fetch('API_URL_FOR_CHART_DATA');
    const data = await response.json();
    renderChart(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
}

function renderChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: [
        {
          label: 'Temperature',
          data: data.temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

document
  .querySelector('.fivedays-chart')
  .addEventListener('click', fetchChartData);
