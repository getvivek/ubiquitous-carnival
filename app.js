const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const apiKey = "c41c2ffadaf6aaa58b64723d4f5b0d56";
  const city = req.body.cityName
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
    console.log(response);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<h1>The temprature in " + city + " is " + temp + " degree celcius</h1>" )
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  });
});

app.listen(3000, function(){
  console.log("Server running at 3000");
});
