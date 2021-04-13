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
      let d = new Date(+reqDate);
      result = {unix: d.getTime(), utc: d.toString()};
    } else {
      // try parse YYYY-MM-DD
      let m = reqDate.match(/(\d{4})-(\d{2})-(\d{2})/);
      if(!m) {
        result = {error : "Invalid Date"};
      } else {
        let d = Date.parse(reqDate); // ms
        if(d == 'Invalid Date') {
          result = {error : "Invalid Date"};
        } else {
          d = new Date(d);
          result = {unix: d.getTime(), utc: d.toString()};
        }
      }
    }
  } else {
    // :date не указан - вернуть текущее время
    result = {unix: Date.now(), utc: Date().toString()};
  }
  res.send(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

