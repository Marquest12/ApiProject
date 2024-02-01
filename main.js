// const { default: apiKey } = require('./apikey');

// import apiKey from "./apikey";
require('dotenv').config()

const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const apiKey = process.env.Api_Key
function getWeather(city) {
    const url = `${apiUrl}` + city+ `&appid=${apiKey}`;
console.log(process.env.Secret_Key)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the weather data here
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°c" ;
        document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h"

        if(data.weather[0].main =="Clouds"){
            weatherIcon.src="images/clouds.png";
        }
        else if(data.weather[0].main =="Clear"){
            weatherIcon.src="images/clear.png";
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src="images/drizzle.png";
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src="images/mist.png";
        }
        else if(data.weather[0].main =="Rain"){
            weatherIcon.src="images/rain.png";
        }

        document.querySelector(".weather").style.display = "block"; 
        document.querySelector(".error").style.display = "none"
       
        })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching weather:', error.message);
      });
  }

  searchBtn.addEventListener('click', () => {
    const city =searchBox.value ;
    if (city) {
      getWeather(city);
    }
    console.log(city)
  });


