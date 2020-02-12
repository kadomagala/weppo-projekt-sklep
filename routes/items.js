const express = require('express');
const itemRepository = require('../repositories/itemRepository')

const router = express.Router();
var multer = require('multer');
var upload = multer();

router.post('/getroductfromrange', upload.single(), async(req, res) => {
    var from = req.body.from;
    var to = req.body.to;
    var all = false; // all products loaded

    const items = await itemRepository.getProductsFromRange(from, to);
    if (Number(to) - Number(from) > items.length) all = true // TODO jeśli równo rekoród to nie zniknie przycisk

    const results = {
        'results': items,
        'all': all
    };
    var buf = Buffer.from(JSON.stringify(results));
    res.end(buf);
});
router.get('/products', async(req, res) => {
    try {
        const items = await itemRepository.getProductsFromRange(1, 6);
        const results = {
            'results': (items) ? items : null
        };
        res.render('products', results);

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
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
    if (!req.session.user) {
        res.redirect('/login?returnUrl=/a-products');
    } else {
        let id = req.body.id
        let name = req.body.name;
        let price = req.body.price;
        let desc = req.body.description;
        let img = req.body.image;

        const result = await itemRepository.updateProduct(id, name, price, desc, img);


        res.redirect('/a-products');
    }
})
router.post('/add-product', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login?returnUrl=/a-products');
    } else {
        let name = req.body.name;
        let price = req.body.price;
        let desc = req.body.description;
        let img = req.body.image;

        const result = await itemRepository.insertProduct(name, price, desc, img);

        res.redirect('/a-products');
    }
});

module.exports = router;