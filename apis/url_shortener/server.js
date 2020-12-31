require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const dns = require('dns')
const bodyParser = require('body-parser')

require('mongodb')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, 
{useNewUrlParser: true, useUnifiedTopology: true})

console.log(`mongoose connection state: ${mongoose.connection.readyState}`)

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

// Define mongoose schema and model
const urlSchema = new mongoose.Schema({
  original_url: {type: String, required: true}, 
  short_url: {type: Number, required: true}
})
const Url = mongoose.model('Url', urlSchema)

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
})

// POST method to create a new record
app.post('/api/shorturl/new', async (req, res) => {

  // Validate request url by hostname
  const dnsLookupPromise = (hostname) => {
    return new Promise((resolve, reject) => {
      dns.lookup(hostname, (err, address) => {
        if (err) reject(err)
        resolve(address)
      })
    })
  }

  const hostname = req.body.url.replace(/(http|https):\/\/?/, '').replace(/\/(.+)?/, '')
  
  try {
    const address = await dnsLookupPromise(hostname)
  } catch (e) {
    return res.json({
      error: 'invalid url'
    })
  }

  // Create a new document in database if the same url does not exist yet
  const matched = await Url.find({original_url: req.body.url})
  if (!matched.length) {
    let index = 0
    while (true) {
      index ++ 
      indexFound = await Url.find({short_url: index})
      if (!indexFound.length) break
    }

    const url = new Url({
      original_url: req.body.url,
      short_url: index
    })

    try {
      await url.save()
      console.log(url)
      res.status(201).send(url)
    } catch (e) {
      res.status(400).send(e)
    }
  } else {
    res.status(400).send({
      error: 'The same record already exists'
    })
  }

})

// GET method to redirect to the original url
app.get('/api/shorturl/:short_url', async (req, res) => {
  try {
    const matchUrl = await Url.findOne({short_url: req.params.short_url})
    res.redirect(matchUrl.original_url)
  } catch (e) {
    res.json({
      error: 'invalid url'
    })
  }
})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
