const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer')
const _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
const upload = multer({ storage: _storage })

app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('1')
})

app.listen(3000, () => {
    console.log('http://localhost:3000/')
})