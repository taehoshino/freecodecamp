var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
console.log(`mongoose connection state: ${mongoose.connection.readyState}`)

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Define mongoose schema and model
const imageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  size: {type: Number, required: true},
  image: {type: Buffer, required: true}
})
const Image = mongoose.model('Image', imageSchema)

// Multer for image upload
const upload = multer({
  limits:{
    fileSize: 1000000
  },
  fileFilter (req, file, cb) {
    if (!file.mimetype.match('image')) {
      return cb (new Error(`Please upload an image. Your file type is ${file.mimetype}`))
    }
    cb (null, true)
  }
})

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  try {
    const { originalname, mimetype, size, buffer } = req.file
    
    const imageObj = {
      name: originalname,
      type: mimetype,
      size
    }

    const image = new Image({
      ...imageObj,
      image: buffer
    })

    await image.save()
    console.log(image)
    
    res.status(200).json(imageObj)

  } catch (e) {
    res.status(400).send(e)
  }  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
