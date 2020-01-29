const express = require('express');
const models = require( '../models');
const {Cart, Item} = require('../lib/Cart');

const router = express.Router();

router.get('/add-to-cart/:id(\\d+)', async(req, res) => {


    if (req.session.user) {

        if (req.session.user.cart) {
            var item = new Item(req.params.id, 1);
            var cart = new Cart(req.session.user.cart);
            console.log('-------');
            console.log('cart: ' + cart);
            cart.addToCart(item);
            console.log('cart2: ' + cart);
            req.session.user.cart = cart;
            console.log(req.session.user.cart);

        } else {
            console.log("Jestem");
            req.session.user.cart = new Cart(null);
            var item = new Item(req.params.id, 1);
            req.session.user.cart.addToCart(item);
            console.log(req.session.user.cart);
        }

        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect('/');
        }
    } else {
        if (req.headers.referer) {
            res.redirect('/login?returnUrl=' + req.headers.referer);
        } else {
            res.redirect('/login');
        }
    }

    //console.log(req.params.id); // ADD TO CART
});

module.exports = router;