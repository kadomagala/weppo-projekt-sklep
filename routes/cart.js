const express = require('express');
const models = require('../models');
const {
    Cart,
    Item
} = require('../lib/Cart');
const itemRepository = require('../repositories/itemRepository');
const orderRepository = require('../repositories/orderRepository');
const { Order } = require('../lib/Order');
const router = express.Router();

router.get('/cart', async(req, res) => {
    if (req.session.user) {
        if (req.session.user.cart) {
            var cart = new Cart(req.session.user.cart);
            var order = new Order(cart);
            var products = await order.getOrder();
            var total = order.getTotal();

            const data = {
                'results': req.session.user.cart,
                'products': products,
                'total': total
            };
            res.render('cart', data)
        } else {
            res.render('cart', { products: null })
        }
    } else {
        res.redirect('/login?returnUrl=/cart&ai=1');
        //ai = adding item (to cart)
    }
});

<<
<< << < HEAD
router.get('/add-to-cart/:id(\\d+)', async(req, res) => { ===
            === =


            router.get('/add-to-cart/:id(\\d+)', async(req, res) => { >>>
                >>> > 40324 a200e31df433f5e6ad52100059b1598d6f9
                if (req.session.user) {
                    if (req.session.user.cart) {
                        var item = new Item(req.params.id, 1);
                        var cart = new Cart(req.session.user.cart);
                        cart.addToCart(item);
                        req.session.user.cart = cart;
                    } else {
                        req.session.user.cart = new Cart(null);
                        var item = new Item(req.params.id, 1);
                        req.session.user.cart.addToCart(item);
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

            <<
            << << < HEAD
            router.get('/remove-from-cart/:id(\\d+)', async(req, res) => { ===
                        === =
                        router.get('/remove-from-cart/:id(\\d+)', async(req, res) => {


                            >>>
                            >>> > 40324 a200e31df433f5e6ad52100059b1598d6f9
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

                        <<
                        << << < HEAD
                        router.get('/cart-summary', async(req, res) => { ===
                                    === =

                                    router.get('/cart-summary', async(req, res) => { >>>
                                        >>> > 40324 a200e31df433f5e6ad52100059b1598d6f9
                                        if (req.session.user) {
                                            if (req.session.user.cart) {
                                                var cart = new Cart(req.session.user.cart);
                                                var order = new Order(cart);
                                                var products = await order.getOrder();
                                                var total = order.getTotal();
                                                var new_order = await orderRepository.makeNewOrder(req.session.user.email, order);
                                                var results = await orderRepository.getOrderById(new_order.id);
                                                console.log(results);
                                                const data = {
                                                    'results': results,
                                                    'isOK': (results) ? true : false
                                                };
                                                res.render('cart-summary', data)
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


                                    module.exports = router;