const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")      
})

app.post("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.place.replaceAll(" ", "+") + "&appid=0806d34c8dfcd028a68592ab149fa9e4&units=metric"
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const timezone = weatherData.timezone
            const placeSearch = weatherData.name
            const icon =  "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
            const feelsLike = weatherData.main.feels_like
            const pressure = weatherData.main.pressure
            const humidity = weatherData.main.humidity
            const windSpeed = weatherData.wind.speed
            const today = new Date()
            const options = {weekday: "long", day: "numeric", month: "long", year: "numeric"}
            const day = today.toLocaleDateString("en-US", options)
            

            res.render("result", {tempVar: temp, timezoneVar: timezone, placeSearchVar: placeSearch, 
                iconVar: icon, feelsLikeVar: feelsLike, pressureVar: pressure, humidityVar: humidity, 
                windSpeedVar: windSpeed, dayVar: day})
            
        })
    })
})

app.listen(
    process.env.PORT || 3000,
)