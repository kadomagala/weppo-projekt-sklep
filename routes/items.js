const express = require('express');
const itemRepository = require('../repositories/itemRepository')


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
});
router.get('/product/:id(\\d+)', async(req, res) => {
    try {
        let id = req.params.id;
        const result = await itemRepository.getProductByID(id);
        const results = {
            'results': (result) ? result : null
        };
        if (result) {
            res.render('index', results);
        } else {
            res.render('404');
        }

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
router.post('/edit-product', async(req, res) => {
    let id = req.body.id
    let name = req.body.name;
    let price = req.body.price;
    let desc = req.body.description;
    let img = req.body.image;

    try {
        const result = await itemRepository.updateProduct(id, name, price, desc, img);
    }
    //to i tak nie działa ale sobie jest
    catch (err) {
        console.error(err);
        res.send("Error " + err);
    }

    res.redirect('/a-products');
})
router.post('/add-product', async(req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let desc = req.body.description;
    let img = req.body.image;

    try {
        const result = await itemRepository.insertProduct(name, price, desc, img);
    }
    //to i tak nie działa ale sobie jest
    catch (err) {
        console.error(err);
        res.send("Error " + err);
    }

    res.redirect('/a-products');
});

module.exports = router;