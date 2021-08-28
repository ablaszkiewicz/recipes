let tempCelc = document.querySelector('.temp');
let tempDescription = document.querySelector('.description');
let humidity = document.querySelector('.humidity');
let realFeel = document.querySelector('.real-feel');
let pressure = document.querySelector('.pressure');
let image = document.querySelector('.icon');
let clock = document.querySelector('.clock');

const input = document.querySelector('.input');
const button = document.querySelector('.button');
button.addEventListener('click', main);

input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    main();
  }
});

function main() {
  const city = input.value;
  let data = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7132115f480498cabb4cafad0d0f8b1d&units=metric`;
  console.log(city);

  //convert api response to json
  fetch(data)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const img = new Image();
      img.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      image.appendChild(img);
      const container = document.getElementById('container');
      container.appendChild(img);
      console.log(data.main.temp);
      tempCelc.innerHTML = 'temperature: ' + data.main.temp.toFixed(1) + ' \u00B0C';
      tempDescription.innerHTML = 'description: ' + data.weather[0].description;
      humidity.innerHTML = 'humidity: ' + data.main.humidity + '%';
      realFeel.innerHTML = 'realFeel: ' + data.main.feels_like + ' \u00B0C';
      let offset = data.timezone / 3600;
      setInterval(getLocalTime, 1000);

      //works only if host time == Central European Summer Time
      function getLocalTime() {
        const today = new Date();
        console.log(offset);
        let hour = today.getHours();
        if (hour < 10) hour = '0' + hour;

        let min = today.getMinutes();
        if (min < 10) min = '0' + min;

        let sec = today.getSeconds();
        if (sec < 10) sec = '0' + sec;

        let localTime = hour - 2 + offset + ':' + min + ':' + sec;
        clock.innerHTML = city.toUpperCase() + ' time zone: ' + localTime;
        console.log(localTime);
      }
    });
}
