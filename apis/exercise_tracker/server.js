require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
console.log(`mongoose connection state: ${mongoose.connection.readyState}`)

const User = require('./models/user')
const Exercise = require('./models/exercise')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', async (req, res) => {
  const { username } = req.body
  const user = new User({
    username
  })
  try {
    await user.save()
    console.log(user)
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/api/exercise/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.post('/api/exercise/add', async (req, res) => {
  const { userId, description, duration, date } = req.body
  

  if (!date) {
    const dateTemp = new Date()
    dateTemp.setTime(Date.now())
    req.body.date = dateTemp.toDateString()
  } else {
    const dateTemp = new Date(date)
    req.body.date = dateTemp.toDateString()
  }

  try {
    const exercise = new Exercise({
      ...req.body
    })
    await exercise.save()
    const user = await User.findOne({_id: userId})
    await user.populate({
      path: 'exercises'
    }).execPopulate()

    res.status(201).json({
      _id: mongoose.Types.ObjectId(userId),
      username: user.username,
      date: req.body.date,
      duration: parseInt(duration),
      description 
    })
  } catch (e) {
    res.status(400).send(e)
  }
})

// GET /api/exercise/log?userId=sdsdsdvs
// GET /api/exercise/log?from=yyyy-mm-dd
// GET /api/exercise/log?to=yyyy-mm-dd
// GET /api/exercise/log?limit=10

app.get('/api/exercise/log', async (req, res) => {
  const { userId, limit } = req.query
  const startDate = req.query.from
  const endDate = req.query.to
  console.log(startDate, endDate)

  const sort = {date: -1}
  const options = { sort }
  const dateRange = {}

  if (limit) {
    options['limit'] = parseInt(limit)
  }

  if (startDate && !endDate) {
    dateRange.date = {$gte : new Date(startDate)}
  } else if (!startDate && endDate) {
    dateRange.date = {$lte : new Date(endDate)}
  } else if (startDate && endDate) {
    dateRange.date = {$gte : new Date(startDate), $lte : new Date(endDate)}
  }
  
  try {
    const user = await User.findOne({_id: userId})
    
    await user.populate({
    path: 'exercises',
    match: dateRange,
    options
    }).execPopulate()

    console.log(user.exercises)

    res.json({
      username: user.username,
      log: user.exercises,
      count: user.exercises.length
    })

  } catch (e) {
    res.send(e)
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
