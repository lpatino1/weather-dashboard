//global var
var cityEl = document.getElementById('cityName').value;
var searchBtnEl = document.getElementById('searchBtn');
var tempEl = dopcument.getElementById('temp');
var windEl = dopcument.getElementById('wind');
var humidityEl = dopcument.getElementById('humidity');
var uvEl = dopcument.getElementById('uv');

var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl}&appid=f4e9f8a1bbdb70ea1144dd0d671eb352`;


searchBtnEl.onclick = function(){
    console.log(requestUrl)
    console.log(cityEl);
    fetch(requestUrl)
    .then(res=>res.json())
    .then(data=>{

    })
    .catch((err)=>{
        console.log(err);
    })
}