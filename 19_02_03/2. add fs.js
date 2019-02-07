const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    fs.readFile('./hello', {encoding:'utf-8'}, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(data);
    })
})

app.get('/bye', (req, res) => {
    fs.readFile('./goodbye', {encoding:'utf-8'}, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(data)
    })
})

app.listen(3001, () => {
    console.log('3001 포트로 서버에 연결되었습니다.')
})