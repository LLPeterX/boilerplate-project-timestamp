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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let dt = "Fri Dec 25 2015 03:00:00 GMT+0300 (GMT+03:00)";
console.log(dt.split('+')[0]);


//need: { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// got: { unix: 1451001600000, utc: "Fri Dec 25 2015 03:00:00 GMT"}

//let d = new Date(1451001600000);
//console.log(d.toUTCString());
let x = '05 October 2011';
let d = Date.parse(x);
console.log(d);

console.log(Date.parse('24-11-11'));