const express = require('express');
const itemsRepository = require('../repositories/itemRepository');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const items = await itemsRepository.getAllProducts();
        
        const results = {
            'results' : (items) ? items : null
        };
        res.render('index', results);

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;