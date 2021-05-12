const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function() {
  console.log("Server started on port " + port);
});

app.get("/",function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {

  const cityName = req.body.cityName;
  const stateName = req.body.stateName;
  const apiKey = "e8a483d347114833f2bdcb5f747f82c8";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+cityName+","+stateName+",us&units="+unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const currentTemperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const city = weatherData.name;
      const weatherIconCode = weatherData.weather[0].icon;
      const iconImageURL = "http://openweathermap.org/img/wn/"+ weatherIconCode +"@2x.png";

      res.write("<h1>It is currently " + currentTemperature + " degrees Fahrenheit in " + city+", "+stateName+"</h1>");
      res.write("<h3>With current conditions described as " + weatherDescription + "</h3>");
      res.write("<img src="+ iconImageURL +">")
      res.send();
    })
  })

})
