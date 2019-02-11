const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session') (session)

app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
    secret : '5432534123$#@!$@!#%',  // 쿠키와 마찬가지로 아무 값이나 줘도 된다.
    resave : false,  // 세션 아이디를 접속할 때마다 새롭게 발급할 것인가?
    saveUninitialized : true,
    store : new MySQLStore({
        host: 'localhost',
        port: 3307,
        user: 'root',
        password: '111111',
        database: 'o2'
    })
}))

app.get('/auth/login', (req, res) => {
    var as = `
        <h2> Login </h2>
            <form action="/auth/login" method ="post">
                <input type ="text" name ="username" placeholder = "username"> <br>
                <input type ="password" name = "password" placeholder = "password">
                <input type ="submit" value = "login">
            </form>
    `;
    res.send(as)
})

app.post('/auth/login', (req, res) => {
    var user = {
        username : 'sejun',
        password : '111',
        display_name : 'Sejun'
    };

    var user_name = req.body.username;
    var pass_word = req.body.password;

    if(user_name === user.username && pass_word === user.password) {
            req.session.displayName = user.display_name;
            res.redirect('/welcome');

    } else {
        res.send('who are you? <a href="/auth/login"> Relogin </a>')
    }
})

app.get('/welcome', (req, res) => {
    if(req.session.displayName) {
        res.send(`
            <h1> Welcome! ${req.session.displayName} </h1>
            <a href ="/auth/logout"> Logout </a>
            `)

    } else {
        res.send(`
            <h1> Welcome! </h1>
            <a href="/auth/login"> Login </a>
        `)
    }
})

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName
    res.redirect('/welcome');
})

app.listen(3004, () => {
    console.log('http://localhost:3004/auth/login');
})