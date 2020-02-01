const express = require('express');
const models = require('../models');
const { Cart, Item } = require('../lib/Cart');
const itemRepository = require('../repositories/itemRepository');
const {Order} = require('../lib/Order');

const router = express.Router();

router.get('/cart', async(req, res) => {

    if (req.session.user) {
        if (req.session.user.cart) {

            //console.log("--------------------------");
            //console.log(req.session.user.cart);


            var cart = new Cart(req.session.user.cart);
            console.log("cart: " + cart.items);
            var order = new Order(cart);
            var products = await order.getOrder();
            var total = order.getTotal();
            //var products = await itemRepository.getProductsByID(cart.productsids());
            
            //console.log('products \n' + products);
            //console.log('products.items \n' + products.items);
            const data = {
                'results': req.session.user.cart,
                'products': products,
                'total' : total
            };
            res.render('cart', data)
        } else {
            if (req.headers.referer) {
                res.redirect(req.headers.referer);
            } else {
                res.redirect('/');
            }
        }
    } else {
        res.redirect('/login?returnUrl=/cart');
    }
});



router.get('/add-to-cart/:id(\\d+)', async(req, res) => {
    if (req.session.user) {
        if (req.session.user.cart) {
            var item = new Item(req.params.id, 1);
            var cart = new Cart(req.session.user.cart);
            cart.addToCart(item);
            req.session.user.cart = cart;
            //console.log(req.session.user.cart);
        } else {
            req.session.user.cart = new Cart(null);
            var item = new Item(req.params.id, 1);
            req.session.user.cart.addToCart(item);
            //console.log(req.session.user.cart);
        }
        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect('/');
        }
    } else {
        if (req.headers.referer) {
            res.redirect('/login?returnUrl=' + req.headers.referer + '&ai=1');
        } else {
            res.redirect('/login?ai=1');
        }
    }
});

router.get('/remove-from-cart/:id(\\d+)', async(req, res) => {


    if (req.session.user) {

        if (req.session.user.cart) {
            var item = new Item(req.params.id, 1);
            var cart = new Cart(req.session.user.cart);
            cart.removeFromCart(item);
            req.session.user.cart = cart;
        } else {
            console.error("Removing item from without cart");
        }
        if (req.headers.referer) {
            res.redirect(req.headers.referer);
        } else {
            res.redirect('/cart');
        }
    } else {
        if (req.headers.referer) {
            res.redirect('/login?returnUrl=' + req.headers.referer);
        } else {
            res.redirect('/login?ai=1');
        }
    }
});
module.exports = router;