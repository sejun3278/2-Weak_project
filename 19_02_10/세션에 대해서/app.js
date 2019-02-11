const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser'); 

app.use(session({
    secret : '5432534123$#@!$@!#%',  // 쿠키와 마찬가지로 아무 값이나 줘도 된다.
    resave : false,  // 세션 아이디를 접속할 때마다 새롭게 발급할 것인가?
    saveUninitialized : true 
}))

app.use(cookieParser('43124$##!@$!@#$1324!@#$'));

app.get('/count', (req, res) => {
    if(req.signedCookies.count) {
        req.signedCookies.count++;

    } else {
        req.signedCookies.count = 1;
    }

    if(req.session.count) {
        req.session.count++;

    } else {
        req.session.count = 1;
    }

    var count = parseInt(req.signedCookies.count);
    res.cookie('count', count, {signed : true})
    var as = `
        <h2> session : ${req.session.count} </h2>
        <h2> cookie : ${count} </h2>
    `
    res.send(as)
})

app.get('/temp', (req, res) => {
    res.send('result ' + req.session.count)
})

app.listen(3003, () => {
    console.log('http://localhost:3003/count')
})