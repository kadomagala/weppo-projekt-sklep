const express = require('express');
const path = require('path')
const models = require( './models');
const PORT = process.env.PORT || 5000;
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes.dashboard);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));