const http = require('http');

const port = 8080;
const hostname = '127.0.0.1';

const server = http.createServer( (req, res) => {
    res.writeHead(200, {'text-content' : 'utf-8'});
    res.end('Hello Server!')
})
server.listen(port, hostname, () => {
    console.log('http://' + hostname + ':' + port + ' 로 서버가 열렸습니다!')
})