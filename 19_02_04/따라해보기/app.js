const alert = require('alert-node')
const express = require('express');
const fs = require('fs');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : true}));

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views')

function err() {
    if(err) {
        console.log(err)
        res.send('오류가 발생했습니다.')
    }
}

var emprt = null;
var login = null;
app.get('/main', (req, res) => {
    login = false;
    res.render('main')
})

app.get('/signup', (req, res) => {
    login = false;
    res.render('signup')
})

app.post('/signup', (req, res) => {
let user_id = req.body.id;
login = false;

if(user_id.length === 0) {
    return res.render('error', {error:'아이디를 입력해주세요.', back:'/signup'})
}

let user_pass = req.body.password
if(user_pass.length === 0) {
    return res.render('error', {error:'비밀번호를 입력해주세요.', back:'/signup'})
}

let user_check = req.body.c_password
if(user_check.length === 0 || user_pass !== user_check) {
    return res.render('error', {error:'비밀번호 확인이 올바르지 않습니다.', back:'/signup'})
}

fs.readdir('users', (err, files) => {
    if(err) {
        console.log(err)
        res.send('오류가 발생했습니다.')
    }

    if(files.includes(user_id) === false) {
        fs.writeFile('users/' + user_id, user_pass, (err, data) => {
            if(err) {
                console.log(err)
                res.send('오류가 발생했습니다.')
            }
            alert('회원가입이 완료되었습니다!')
            res.redirect('/main')
        })

        } else {
            res.render('error', {error:'이미 사용되고 있는 아이디입니다.', back:'/signup'})
        }
    })
})

app.post('/home', (req, res) => {
login = false;

let user_id = req.body.id;
    if(user_id.length === 0) {
        return res.render('error', {error:'아이디를 입력해주세요.', back:'/main'})
    }

let user_pass = req.body.password
    if(user_pass.length === 0) {
        return res.render('error', {error:'비밀번호를 입력해주세요.', back:'/main'})
    }

    fs.readdir('users', (err, files) => {
        if(err) {
            console.log(err);
            res.send('오류가 발생했습니다.')
        }
        if(files.includes(user_id) === true) {
            fs.readFile('users/' + user_id, 'utf-8', (err, data) => {
                if(err) {
                    console.log(err);
                    res.send('오류가 발생했습니다.')
                }

                if(user_pass === data) {
                    emprt = null;

                    fs.readdir('data', (err, datas) => {
                        if(err) {
                            console.log(err);
                            res.send('오류가 발생했습니다.')
                        }
                        if(datas.length === 0) {
                            emprt = true;
                        }
                        login = user_id;
                        alert(login + ' 님 환영합니다!')
                        res.render('home', {id:user_id, notice:emprt})
                    })

                } else {
                    return res.render('error', {error:'비밀번호가 일치하지 않습니다.', back:'/main'})
                }
            })

        } else {
            return res.render('error', {error:'아이디가 일치하지 않습니다.', back:'/main'})
        }
    })
})

app.get('/home', (req, res) => {
    if(login === false) {
        return res.render('error', {error:'정상적인 접근이 아닙니다.', back:'/main'})

    } else {
        res.render('home', {id:login})
    }
})

app.post('/write', (req, res) => {
    if(login === false) {
        return res.render('error', {error:'정상적인 접근이 아닙니다.', back:'/main'})

    } else {
    fs.readdir('data', (err, folder) => {
        if(err) {
            console.log(err)
            res.send('오류가 발생했습니다.')
        }

        if(folder.includes(login) === false) {
            fs.mkdir('data/' + login, { recursive: true }, (err) => {
                if(err) {
                    console.log(err)
                    res.send('오류가 발생했습니다.')
                        }
                })
            }
            fs.writeFile('data/' + login + '/' + req.body.title, req.body.des, (err, data) => {
                if(err) {
                    console.log(err)
                    res.send('오류가 발생했습니다.')
                }
                res.render('home', {id:login})
            })
        })
    }
})

app.listen(8080, () => {
    console.log('http://localhost:8080/main')
})
