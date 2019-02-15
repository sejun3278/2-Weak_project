const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 

app.use(cookieParser('4123%$#!54235!$#@^$%'))

app.get('/count', (req, res) => {
    if(req.signedCookies.count) {
        var count = parseInt(req.signedCookies.count);

    } else {
        var count = 0;
    }

    count = count + 1; 
    res.cookie('count', count, {signed : true});
    res.send('count : '+ count)
})
app.listen(3003, () => {
    console.log('http://localhost:3003/count')
})