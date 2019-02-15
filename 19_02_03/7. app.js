const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'jade')
app.set('views', './project');

app.get('/', (req, res) => {
    res.render('home', {_title:"Hello!"})
})

let user_arr = [];
app.post('/', (req, res) => { 
    res.render('signup_complete')
    
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.listen(8080, () => {
    console.log('home : http://localhost:8080/' )
    console.log('signup : http://localhost:8080/signup')
})