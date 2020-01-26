const express = require('express');
const path = require('path')
const models = require( './models');
const PORT = process.env.PORT || 5000;


const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', async(req, res) => {
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

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));