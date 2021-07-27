const weatherAPI = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchBoxInput = document.getElementById('input-box');

searchBoxInput.addEventListener('keypress',(event)=>{
    if(event.keyCode==13){
        console.log(searchBoxInput.value )
        getWeatherReport(searchBoxInput.value)
        document.querySelector(".weather-body").style.display = "block"
    }
})


//getWeather report
function getWeatherReport(city){
    fetch(`${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherReport);
}


//show Weather Report

function showWeatherReport(weather){
    console.log(weather)

    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`


    let temperature = document.getElementById('temp');

    temperature.innerHTML= `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxtemp = document.getElementById('min-max')
    minMaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`


    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`


    let date = document.getElementById('date');

    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent=="Clear" ||weatherType.textContent=="Haze" ){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent=="Clouds"){
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }
   
    else if(weatherType.textContent=="Rain"){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent=="Mist"){
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    } 
    else if(weatherType.textContent=="Snow"){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }


     
}



function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Thursday","Friday","Saturday"]

    let months = ["jan","feb","Mar"," Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()]
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`


}



//date


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 3ac4b135863b3d9bc16d12bd13c9dc1c