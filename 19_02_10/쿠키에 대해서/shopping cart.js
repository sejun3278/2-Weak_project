const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 

app.use(cookieParser('321^$%!4124!@#%#@$%1'))

var products = {
    1 : {title : 'The history of web 1'},
    2 : {title : 'The newx web'}
}

app.get('/home', (req, res) => {
    let as = '';
    for(let key in products) {
        as += `<h3> 
                    <a href="/cart/${key}"> ${products[key].title} </a> 
               </h3>`
    }
    res.send(`<h1> Products </h1> ${as} <br> <h2> <a href="/cart"> Cart </a> </h2>`)
})

app.get('/cart/:id', (req, res) => {
    var id = req.params.id;
    if(req.signedCookies.cart) {
        var cart = req.signedCookies.cart;

    } else {
        var cart = {};
    }

    if(!cart[id]) {
        cart[id] = 0;
    }

    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart, {signed : true});

    res.redirect('/cart')
})

app.get('/cart', (req, res) => {
    let cart = req.signedCookies.cart;
    if(!cart) {
        res.rend('Emprt!');

    } else {
        var as = '';
        for(var key in products) {
            as += `<h2> ${products[key].title} (${cart[key]}) </h2>`
        }
    }

    res.send(`<h1> Cart </h1> ${as} <br> <a href="/home"> Products List </a>`)
})

app.listen(3003, () => {
    console.log('http://localhost:3003/home')
})