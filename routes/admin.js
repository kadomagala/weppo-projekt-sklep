const express = require('express');
const itemRepository = require('../repositories/itemRepository');
const usersRepository = require('../repositories/userRepository');
const orderRepository = require('../repositories/orderRepository');
const session = require('express-session');

const router = express.Router();

router.get('/a-products', async(req, res) => {
        if (req.session.user && req.session.user.role == 'admin') {
            try {
                const result = await itemRepository.getAllProducts();
                const results = {
                    'results': (result) ? result : null,
                    'q': req.query
                };
                res.render('a-products', results);
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }
        } else {
            res.redirect('/login?returnUrl=/a-products');
        }
    })
    // TODO nie działa usuwanie, baza się pluje
router.get('/a-users', async(req, res) => {
    if (req.session.user && req.session.user.role == 'admin') {
        const users = await usersRepository.getAllUsers();
        const results = {
            'results': users
        };
        res.render('a-users', results);
    } else {
        res.redirect('/login?returnUrl=/a-products');
    }

})

router.get('/delete-user/:id(\\d+)', async(req, res) => {
    if (req.session.user && req.session.user.role == 'admin') {
        let id = req.params.id;
        const users = await usersRepository.deleteUserById(id);
        res.redirect('/a-users');
    } else {
        res.redirect('/login?returnUrl=/a-products');
    }
})

router.get('/a-orders', async(req, res) => {
    if (req.session.user && req.session.user.role == 'admin') {
        try {
            const result = await orderRepository.getAllOrders();
            const data = {
                'results': (result) ? result : null,
            };
            res.render('a-orders', data);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    } else {
        res.redirect('/login?returnUrl=/a-orders');
    }
})

module.exports = router