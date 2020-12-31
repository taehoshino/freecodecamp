// server.js
// where your node app starts

// init project
const express = require('express')
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/timestamp/:date?', (req, res) => {
  let unixTime
  let utcTime
  let date

  if (req.params.date) {
    date = new Date(req.params.date)
    console.log(date)
    if (!date.valueOf()) {
     date.setTime(req.params.date)
     if (!date.valueOf()){
       return res.send({error: 'Invalid Date'})
     }
    }

  } else {
    date = new Date()
    date.setTime(Date.now().toString())

  }

  unixTime = date.valueOf()
  utcTime = date.toUTCString()

  res.send({
    unix: unixTime,
    utc: utcTime
  })
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
