var countryName = prompt(`Enter Country Name`).toUpperCase()
var countriesDataReq = new XMLHttpRequest()
var countriesURL = "https://restcountries.eu/rest/v2/all"
countriesDataReq.open("GET",countriesURL,true)
countriesDataReq.send()
var countriesData 
countriesDataReq.onload = () =>{
    if(countriesDataReq.status===200){
         countriesData = JSON.parse(countriesDataReq.response)
         var capital,lat,lng
         countriesData.forEach((country)=>{
             if(country.name.toUpperCase()===countryName){
                 capital = country.capital
                 lat = country.latlng[0]
                 lng = country.latlng[1]
             }
         })

         console.log(`NAME: ${countryName}  CAPITAL: ${capital}  LAT: ${lat}  LNG: ${lng}`)
         console.log("Country Weather data")

         var weatherDataReq = new XMLHttpRequest()
         var key = `eb1248bbe7e3c47a06bd14ab181a98e0`
         var weatherDataURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}`
         weatherDataReq.open("GET",weatherDataURL,true)
         weatherDataReq.send()
         var weatherData
         weatherDataReq.onload = () =>{
             if(weatherDataReq.status===200){
                console.log("Weather-data by city: "+capital)
                 weatherData = JSON.parse(weatherDataReq.response)
                 var temp = weatherData.main.temp
                 var desc = weatherData.weather[0].description
                 console.log(`Temperature: ${temp} Description: ${desc}`)
                 console.log(weatherData)
             }
             else{
                console.log(`Error ${weatherDataReq.status} ${weatherDataReq.statusText}`)
             }
         }

         var weatherDataByLatLngReq = new XMLHttpRequest()
         var weatherDataByLatLngURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
         weatherDataByLatLngReq.open("GET",weatherDataByLatLngURL,true)
         weatherDataByLatLngReq.send()
         var weatherDataByLatLng
         weatherDataByLatLngReq.onload = () =>{
             if(weatherDataByLatLngReq.status===200){
                 console.log(`Weather-data by lat-lng: ${lat}-${lng}`)
                 weatherDataByLatLng = JSON.parse(weatherDataByLatLngReq.response)
                 var temp = weatherDataByLatLng.main.temp
                 var desc = weatherDataByLatLng.weather[0].description
                 console.log(`Temperature: ${temp} Description: ${desc}`)
                 console.log(weatherDataByLatLng)
             }
             else{
                console.log(`Error ${weatherDataByLatLngReq.status} ${weatherDataByLatLngReq.statusText}`)
             }
         }
    }
    else{
         console.log(`Error ${countriesDataReq.status} ${countriesDataReq.statusText}`)
    }
}
