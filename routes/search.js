const express = require('express');
const itemsRepository = require('../repositories/itemRepository');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const result = await itemsRepository.searchProducts(req.query.q);

        const results = {
            'results': (result) ? result : null
        };
        res.render('index', results);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

module.exports = router;