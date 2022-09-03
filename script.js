//global var
var lat ='';
var lon ='';
var result='';
var searchBtnEl = document.getElementById('searchBtn');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvEl = document.getElementById('uv');
var cityHeaderEl = document.getElementById('cityHeader');
var weatherBoardEl = document.getElementById('weatherBoard');


searchBtnEl.onclick = function search(){
    start();
    setCity();
    
}

function setCity(){
    cityEl = {city: ''};
    cityEl.city = document.getElementById('cityName').value;
    console.log(cityEl.city)
    return cityEl.city;
}

// on click function. Grabs the lon and lat of the city searched
 async function start(){
     result = await setCity();
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=f4e9f8a1bbdb70ea1144dd0d671eb352`;
   fetch(requestUrl)
    .then(res=>res.json())
    .then(data=>{
        lat= `${data.coord.lat}`;
        lon= `${data.coord.lon}`;
        getWeather(lat, lon,result);
    })
    .catch((err)=>{
        console.log(err);
    })
}




function getWeather(lat, lon, result){
    var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f4e9f8a1bbdb70ea1144dd0d671eb352`;

    fetch(requestWeatherUrl)
    .then(res=>res.json())
    .then(data=>{
        //edits the innherHTML of front end elements to display weather conditions of searched city
        cityHeaderEl.innerHTML=``;
        tempEl.innerHTML  = ``;
        humidityEl.innerHTML  = ``;
        windEl.innerHTML  = ``;
        uvEl.innerHTML  = ``;
        cityHeaderEl.innerHTML=`${result}`;
        tempEl.innerHTML  = `Temp: ${data.current.temp}`;
        humidityEl.innerHTML  = `Humidity: ${data.current.humidity}`;
        windEl.innerHTML  = `Wind: ${data.current.wind_speed}`;
        uvEl.innerHTML  = `UV Index: ${data.current.uvi}`;
        // weatherDescriptionEl.innerHTML = `${data.current.weather[0].main}`
    })
}
