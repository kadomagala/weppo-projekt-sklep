const express = require('express');
const path = require('path')
const routes = require('./routes');
const config = require('./config');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: config.session_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(async (req, res, next) => {
    if(req.session.user){
        console.log("User logged");
    } else {
        console.log("User not logged");
    }
    next();
});

app.use('/', routes.dashboard);
app.use('/search', routes.search);
app.use('/', routes.items);
app.use('/', routes.auth);
app.use('/', routes.cart);

app.use((req, res, next) => {
    res.render('404.ejs', {
        url: req.url
    });
});

app.listen(config.PORT, () => console.log(`Listening on ${ config.PORT }`));