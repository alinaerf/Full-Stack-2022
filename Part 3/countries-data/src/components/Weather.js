import {useState, useEffect} from 'react'

const Weather =({city})=>{
    const api=  {
        key:process.env.REACT_APP_API_KEY,
        base:"https://api.openweathermap.org/data/2.5/"
    }
    const [weather, setWeather]=useState()
    useEffect(()=>{
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result=>{
            setWeather(result)
        })
    })
    console.log(weather)
    console.log(city)
    if (weather!==undefined){
        return(
            <div>
            <div>temperature {weather.main.temp} Celcius</div>
            <img alt="weather" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <div>wind {weather.wind.speed} m/s</div>
            </div>
        )
    }
    else{
        return(
            <div>
                Loading...
            </div>
        )
    }
    

}
export default Weather