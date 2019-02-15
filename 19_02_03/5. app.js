const express = require('express');
const app = express();

app.locals.pretty = true;
app.use(express.static('public'));
app.set('view engine', 'jade')
app.set('views', './views')

app.get('/', (req, res) => {
    res.send('!')
})

app.get('/jade', (req, res) => {
    res.render('index', {time : Date(), _title : 'Jade'})
})

app.get('/topic', (req, res) => {
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ]

    var as = `
        <a href="/topic?id=0"> <h2> JavaScript </h2> </a>
        <a href="/topic?id=1"> <h2> Nodejs </h2> </a>
        <a href="/topic?id=2"> <h2> Express </h2> </a> <br> <hr>
        <p> ${topics[req.query.id]} </p>
    `
    res.send(as)
})

app.get('/s-topic/:id/:name', (req, res) => {
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ]

    var as = `
        <a href="/s-topic/0/JS"> <h2> JavaScript </h2> </a>
        <a href="/s-topic/1/NODE"> <h2> Nodejs </h2> </a>
        <a href="/s-topic/2/EXP"> <h2> Express </h2> </a> <br> <hr>
        <p> ${topics[req.params.id]} </p>
    `
    res.send(as)
})

app.listen(3000, () => {
    console.log('http://localhost:' + 3000);
})