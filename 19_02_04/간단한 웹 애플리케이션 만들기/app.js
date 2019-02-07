const express = require('express');
const app = express();
const fs = require('fs')

const bodyParser = require('body-parser');                                                                     
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.locals.pretty = true;
app.set('view engine', 'jade')
app.set('views', './views')

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, data) => {
        if(err) {
            console.log(err)
            res.status(500).send('Internal Server Error!');
        }
        res.render('new', {files:data})
    })
})

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, data) => {
        if(err) {
            console.log(err)
            res.status(500).send('Internal Server Error!');
        }
        var id = req.params.id;
        if(id) {
            fs.readFile('data/' + id, 'utf-8', (err, file) => {
                if(err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error!');
            } 
                res.render('main', {files:data, title:id, des:file})
            })

        } else {
            res.render('main', {files:data, title:'Welcome!', des:'Hello world!'})
        }
    })
})

// app.get('/topic/:id', (req, res) => {
//     
//         fs.readdir('data', (err, data) => {
//             if(err) {
//                 console.log(err)
//                 res.status(500).send('Internal Server Error!');
//         } 
        
//     })
// })

app.post('/topic', (req, res) => {
    let title = req.body.title
    let cover = title.slice(1, title.length);
    title = title[0].toUpperCase() + cover;

    let des = req.body.des
    fs.writeFile('data/' + title, des, (err, data) => {
        if(err) {
            res.status(500).send('Internal Server Error!');
        }
        res.redirect('/topic/' + title)
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000/topic')
})