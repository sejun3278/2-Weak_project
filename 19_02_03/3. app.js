const express = require('express');
const app = express();
const fs = require('fs')

app.use(express.static('public'));
app.get('/', (req, res) => {
    fs.readFile('3. express로 정적파일 서비스하기', {encoding:'utf-8'}, (err, data) => {
        res.send(data)
    })
})

app.get('/dog', (req, res) => {
    res.send('<br> <img src ="/댕댕2.gif"> </img>')
})

app.get('/test', (req, res) => {
    fs.readFile('./public/test.html', (err, data) => {
        res.send(data)
    })
})

app.get('/test1', (req, res) => {
    let str = '';
    for(let i = 1; i <= 10; i++) {
        str = str + '<li> coding ' + i + '</li>'
    }
    let time = Date();

    var result = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
        </head>
    
        <body>
            <ul>
            ${str}
            </ul>
            ${time}
        </body>
    </html>
    `
    res.send(result)
})

app.get('/test2', (req, res) => {
    res.send('Hello, Express??')
})

app.listen(3000, () => {
    console.log('3000으로 연결합니다.')
})