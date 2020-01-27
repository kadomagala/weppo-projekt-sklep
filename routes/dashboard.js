const express = require('express');
const models = require( '../models');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const items = await models.Item.findAll();
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