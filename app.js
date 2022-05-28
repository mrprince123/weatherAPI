const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyparser.urlencoded({extended : true}));


app.use(express.static("public"));



app.get("/", function(req, res){
    // res.send("<h1>Hello Sniper</h1>");
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){

    console.log(req.body.unitName);
    console.log(req.body.cityName);

    const apikey = "3d4fb3ba282c73e7028719499699572c";
    const units = req.body.unitName;
    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + apikey + "&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);



        response.on("data", function(data){           
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(temp);
            console.log(description);


            res.write("<p>The description of weather is </p>"  + description);
            res.write("<p> The temprature is </p> " + temp)
            res.write("<img src=" + imageURL + ">");
            res.send();

        });
    });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});




