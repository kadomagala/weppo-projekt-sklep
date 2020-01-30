const express = require('express');
const itemRepository = require('../repositories/itemRepository');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const items = await itemRepository.getAllProducts();

        const results = {
            'results': (items) ? items : null
        };
        console.log(results);
        res.render('index', results);

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;