// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function(req, res) {
  let reqDate = req.params.date;
  let result = {};
  if(reqDate) {
    if(!isNaN(+reqDate)) {
      // time in ms
      result = new Date(+reqDate);
    } else {
      let ms = Date.parse(reqDate);
      result = isNaN(ms) ? null : new Date(ms);
    }
  } else {
    // :date не указан - вернуть текущее время
    result = new Date();
  }
  res.send(result ? {unix: result.getTime(), utc: result.toUTCString().split('+')[0]} : {error : "Invalid Date"});
});

// for https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice

app.get("/api/whoami", function(req, res) {
  let ipaddress = req.socket.remoteAddress,
      software = req.headers['user-agent'],
      language = req.headers['accept-language'] || 'ru-RU';
  if(ipaddress === "::1") {
    ipaddress='127.0.0.1';
  }
  language = language.split(';')[0];  
  res.json({ipaddress, language, software});
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// let x = 'aaa';
// console.log(x.split(';')[0]);