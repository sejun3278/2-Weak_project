const express = require('express');
const app = express();

app.locals.pretty = true;
app.use(express.static('public'));
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('Hello, Jade!')
})

app.get('/jade', (req, res) => {
    res.render('index', {time:Date(), _title : 'Jade' })  
})

app.listen(3000, () => {
    console.log('http://localhost:' + 3000 + '/jade');
})