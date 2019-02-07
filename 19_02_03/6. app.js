const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'jade')
app.set('views', './views')

app.get('/', (req, res) => {
    res.send('Hello, Post!')
})

app.get('/topic/:id', (req, res) => {
    let topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ]

    let as = `
        <a href="/topic/0"> <h2> Javascript </h2> </a>
        <a href="/topic/1"> <h2> Nodejs </h2> </a>
        <a href="/topic/2"> <h2> Express </h2> </a> <br> <hr>
        <p> ${topics[req.params.id]} </p>
    `
    res.send(as)
})

app.get('/form', (req, res) => {
    res.render('form', {_title:"form"})
})

app.get('/form_save', (req, res) => {
    let as = `
        ${req.query.title + ' : ' + req.query.description}
        <a href='/form'> <h2> Back </h2> </a>
    `
    res.send(as)
})

let users = [];
app.post('/form_save', (req, res) => {
    let user = [req.body.title, req.body.description]
    users.push(user)

    console.log(users)
    res.send(users)
})

app.listen(3000, () => {
    console.log('http://localhost:3000/form')
})