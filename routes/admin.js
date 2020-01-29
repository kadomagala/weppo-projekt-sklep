const express = require('express');
const itemRepository = require('../repositories/itemRepository');
const usersRepository = require('../repositories/userRepository');
const session = require('express-session');

const router = express.Router();

router.get('/a-products', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login?returnUrl=/a-products');
    } else {
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
    }
})

router.get('/a-users', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login?returnUrl=/a-products');
    } else {
        const users = await usersRepository.getAllUsers();
        const results = {
            'results': users
        };
        res.render('a-users', results);
    }

})

router.get('/delete-user/:id(\\d+)', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login?returnUrl=/a-products');
    } else {
        let id = req.params.id;

        const users = await usersRepository.deleteUserById(id);

        res.redirect('/a-users');
    }

})
module.exports = router