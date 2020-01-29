const express = require('express');
const path = require('path')
const routes = require('./routes');
const fs = require('fs');
const session = require('express-session');


const PORT = process.env.PORT || 5000;

var secret = JSON.parse(fs.readFileSync('secret.json'));
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: (secret) ? secret.session.secret : process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}));

app.use('/', routes.dashboard);
app.use('/search', routes.search);
app.use('/', routes.items);
app.use('/', routes.auth);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));