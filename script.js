
//global var
var lat ='';
var lon ='';
var result='';
flag = false;

//query selectors
var searchBtnEl = document.getElementById('searchBtn');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvEl = document.getElementById('uv');
var cityHeaderEl = document.getElementById('cityHeader');
var IconEl = document.getElementById('cityIcon');

var descriptionEL = document.getElementById('cd1');
var currentDateEl= document.getElementById('cwd');
var currentWeatherEl= document.getElementById('cw1');





searchBtnEl.onclick = function search(e){
    e.preventDefault();
    start();
    
}

function setCity(query){

    if (flag){
        console.log(query)
        return query;
    }else{
        cityEl = {city: ''};
        cityEl.city = document.getElementById('cityName').value;
   
     return cityEl.city;
    }
}

// on click function. Grabs the lon and lat of the city searched
 async function start(){
     result = await setCity();
     flag=false;
    console.log(result)
     window.localStorage.setItem(`${result}`,`${result}`);



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
    var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=f4e9f8a1bbdb70ea1144dd0d671eb352`;

    fetch(requestWeatherUrl)
    .then(res=>res.json())
    .then(data=>{

        console.log(data);

        let placeholder=`${data.current.weather[0].icon}`
        
        //icon url
        const icon = `http://openweathermap.org/img/wn/${placeholder}@2x.png`;
       
        let iconImg= document.createElement('img');
        iconImg.src=icon;
        IconEl.src=icon;

        //date display
        let datePlaceholder=`${data.current.dt}`
        let dateTimeString = moment.unix(datePlaceholder).format("DD-MM-YYYY");
       

        //edits the innherHTML of front end elements to display weather conditions of searched city
        descriptionEL.innerHTML  = `${data.current.weather[0].description}`;
        currentDateEl.innerHTML = dateTimeString;
        currentWeatherEl.innerHTML =`Description: ${data.current.weather[0].main}`;
        cityHeaderEl.innerHTML=`${result}`;
        tempEl.innerHTML  = `Temp: ${data.current.temp}`;
        humidityEl.innerHTML  = `Humidity: ${data.current.humidity}`;
        windEl.innerHTML  = `Wind: ${data.current.wind_speed} MPH`;
        uvEl.innerHTML  = `UV Index: ${data.current.uvi}`;
       ////////////////////////////////////////////////////////////////////////

        var dailyContainerEl = document.getElementById('dailyContainer');

        //removes previous search's cards to avoid duplicates
        function removeCards(){
            let element=document.getElementById('dailyCards');
            if(typeof(element) != 'undefined' && element !=null){
                return;
            } else{
                // while(dailyItemEl.hasChildNodes(){
                //     dailyItemEl.removeChild(dailyItemEl.firstChild);
                // }
                while(dailyContainerEl.hasChildNodes()){
                    dailyContainerEl.removeChild(dailyContainerEl.firstChild);
                }
            }
            
        }
        removeCards();

        for(i=0; i<5;i++){


            datePlaceholder= `${data.daily[i].dt}`;
            dateTimeString = moment.unix(datePlaceholder).format("DD-MM-YYYY");

            placeholder=`${data.daily[i].weather[0].icon}`

            
            //create elements
            var dailyCards= document.createElement('div');
            dailyCards.setAttribute("class", "forecastItems col-3");
            dailyContainerEl.appendChild(dailyCards);
          
            //create icon element
            var dailyIcon= document.createElement("img");
            dailyIcon.src=icon;
            dailyCards.appendChild(dailyIcon);
            
            var h4El =document.createElement('h4');
            h4El.textContent= dateTimeString;
            dailyCards.appendChild(h4El);

            var dailyItemEl=document.createElement('ul');
            dailyCards.appendChild(dailyItemEl);

            var li1 = document.createElement('li');
            var li2 = document.createElement('li');
            var li3 = document.createElement('li');
            var li4 = document.createElement('li');

            //add text
            li1.textContent=`Temp: ${data.daily[i].temp.day}`
            li2.textContent=`Wind: ${data.daily[i].wind_speed} MPH`
            li3.textContent=`Humidity: ${data.daily[i].humidity}`

            dailyItemEl.appendChild(li1);
            dailyItemEl.appendChild(li2);
            dailyItemEl.appendChild(li3);
            dailyItemEl.appendChild(li4);
        }

        
        
    })

    renderHistory(result);
   
}

function renderHistory(ok){
    let newObject = window.localStorage.getItem(`${ok}`);
  

    var searchListEl =document.getElementById('searchList');
    var item=document.createElement('li');
    item.setAttribute("id", `${ok}`);
    item.textContent=`${newObject}`;
    searchListEl.appendChild(item);
    
    searchListEl.addEventListener("click", function searchAgain(e){
        e.stopEventPropagation;
        var target= e.target;
        var targetContent= target.innerHTML;
        console.log(targetContent)
        start();
        flag = true;
        setCity(targetContent);

    })
}