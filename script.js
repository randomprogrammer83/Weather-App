const input = document.querySelector('.inp');
let buttons = document.querySelector('#btn');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const wind_speed_value = document.querySelector('#wind_speed');
const img = document.querySelector('.img');
const humidity = document.querySelector('#humidity');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

buttons.addEventListener('click', function () {
  // alert('button is clicekd')
  whether_data(input.value);
});
async function whether_data(city) {
  const api_key = '9e50e0dd4c8a699083a2e0e96eb26480';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (data.cod === `404`) {
    location_not_found.style.display = 'flex';
    weather_body.style.display = 'none';
    console.log('error');
    return;
  }
  location_not_found.style.display = 'none';

  weather_body.style.display = 'flex';

  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  description.innerHTML = `${data.weather[0].description}`;
  wind_speed_value.innerHTML = `${data.wind.speed}KM/H`;
  humidity.innerHTML = `${data.main.humidity}%`;
  location_not_found.style.display = 'none';

  switch (true) {
    case /cloud/i.test(data.weather[0].main):
      img.src = 'cloud.png';
      break;
    case /clear/i.test(data.weather[0].main):
      img.src = 'clear.png';
      break;
    case /rain/i.test(data.weather[0].main):
      img.src = 'rain.png';
      break;
    case /mist/i.test(data.weather[0].main):
      img.src = 'mistt.png';
      break;
    case /dust/i.test(data.weather[0].main):
      img.src = 'dust.png';
      break;
    case /haze/i.test(data.weather[0].main):
      img.src = 'hage.png';
      break;
    default:
      img.src = 'unknown.png';
  }
}
