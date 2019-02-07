const express = require('express');
const app = express();

const fs = require('fs')

const port = 3000;
const hostname = '127.0.0.1'

// url을 치고 (직접 주소를 입력해서) 들어오는 건 get이다!
app.get('/', (req, res) => {
    fs.readFile('./2. express로 간단한 웹 만들기', {encoding:'utf-8'}, (err, data) => {
        if(err) {
            console.log(err);
            return
        }
        res.send(data)
    })
    // res.send('Hello, home page!')
})

app.get('/room', (req, res) => {
    res.send('<h1 style="color:red; text-align:center">Here is my room, get out!</h1>')
})

app.listen(port, hostname, () => {
    console.log('서버가 성공적으로 연결됐습니다!')
});
console.log(app)