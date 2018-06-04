const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


const apiKey = 'aae5a3ca948e7ba4725788991e970243';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('index',{
        weather: null,
        error: null
    });
});

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function(err, response, body){
        if(err){
            res.render('index',{
                weather: null,
                error: 'Error, please try again'
            });
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{
                    weather: null,
                    error: 'Error, please try again'
                });
            }
            else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{
                    weather: weatherText,
                    error: null
                });
            }
        }
    });
});

let port = process.env.port || 3000;
app.listen(port);