const express = require('express')
const path = require('path')
const fs = require('fs');
const session = require('express-session')
    //import { Item, Cart } from "./lib/Cart.js";
    //import { Item } from './lib/Cart.js';
    //import Cart from "./lib/Cart.js";
const myCart = require('./lib/Cart');
const PORT = process.env.PORT || 5000;
var secret;
const { Pool } = require('pg');
let pool;





try {
    secret = JSON.parse(fs.readFileSync('secret.json'));
    pool = new Pool({
        host: secret.db.host,
        database: secret.db.database,
        user: secret.db.user,
        password: secret.db.password,
        ssl: true
    });
} catch (err) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
}

express()
    .use(express.urlencoded({
        extended: true
    }))
    .use(session({
        secret: secret.session.secret,
        resave: true,
        saveUninitialized: true
    }))
    .use(express.static(__dirname + '/public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', async(req, res) => {
        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM items');
            const results = {
                'results': (result) ? result.rows : null
            };
            res.render('index', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/search', async(req, res) => {
        try {


            const client = await pool.connect()
            let pattern = "%" + req.query.q + "%";
            const result = await client.query("SELECT * FROM items WHERE LOWER(name) like LOWER($1) OR LOWER(description) like LOWER($1) ", [pattern]);
            const results = {
                'results': (result) ? result.rows : null
            };
            res.render('index', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/product/:id(\\d+)', async(req, res) => {
        try {
            const client = await pool.connect()

            const result = await client.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
            const results = {
                'results': (result) ? result.rows : null
            };
            if (result.rows.length > 0) {
                res.render('index', results);
            } else {
                res.render('404');
            }

            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/login', async(req, res) => {
        var data = {
            message: ""
        };
        if (req.query.returnUrl) {
            data.returnUrl = req.query.returnUrl;
        } else {
            data.returnUrl = '/';
        }
        res.render('login.ejs', data);
    })
    .post('/login', async(req, res) => {
        let email = req.body.email;
        let pwd = req.body.password;
        var data = {
            message: "",
            returnUrl: req.body.returnurl
        };
        const client = await pool.connect()
        const result = await client.query('SELECT password FROM users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            var pwdhash = result.rows[0].password;
            if (pwdhash == null || pwdhash == undefined) console.error("Błąd odczytu hasła z bazy danych");
            var bcrypt = require('bcryptjs');
            /* asynchronoczność nie działa bo nie umiem
            bcrypt.compare(pwd, pwdhash, function(err, res), {
                if(err){
                    console.error(err);
                }
                if(res === true){
                    data.message = "Zalogowano"; // nie działa bo jesteśmy w lambda
                    console.log("zalogowano s");
                    return function(){
                        data.message = "zalogowano";
                    }
                }
                else {
                    data.message = "Błędne hasło";
                    console.log("Błędne hasło");                    
                }
            });
            */
            if (bcrypt.compareSync(pwd, pwdhash)) {
                data.message = "Zalogowano";
                req.session.user = {
                    email: email
                };
                if (req.body.returnurl != "/") {
                    console.log("dupa1");
                    console.log(req.body.returnurl);
                    res.redirect(req.body.returnurl);
                } else
                    res.render('login.ejs', data)
                    //console.log(req.session)
            } else {
                data.message = "Błędne hasło";
                res.render('login.ejs', data)
            }
        } else {
            data.message = "Błędny e-mail";
            res.render('login.ejs', data)
        }

    })
    .post('/register', async(req, res) => {
        let email = req.body.email;
        let pwd = req.body.password;
        let pwd2 = req.body.password2;
        var data = {
            message: ""
        };
        // DODAC ESCPAE 
        if (pwd != pwd2) {
            data.message = "Hasła się różnią";

        } else {
            var bcrypt = require('bcryptjs');

            /* async
            var pwdhash;
            bcrypt.genSalt(1, function(err, salt) {
                bcrypt.hash(pwd, salt, function(err, hash) {
                    pwdhash = hash;
                });
            });
            */

            var salt = bcrypt.genSaltSync(1);
            var pwdhash = bcrypt.hashSync(pwd, salt);


            try {
                const client = await pool.connect()
                const result = await client.query(`INSERT INTO users (email,password,role) VALUES ($1, $2 ,$3)`, [email, pwdhash, 'user']);
                data.message = "Zarejestrowano użytkownika";
                client.release();
            }
            //to i tak nie działa ale sobie jest
            catch (err) {
                console.error(err);
                res.send("Error " + err);
                data.message = "Błąd rejestracji";
            }
        }

        res.render('login.ejs', data)
    })
    .get('/a-products', async(req, res) => {
        /*
        Niezbyt ładny ale raczej efektywny sposób edycji produktów:
        Przekazuje sobie dane produktu do formularza poprzez url z już wyświetlanych informacji.
        Potencjalne problemy:
            za długi url
            / i ' " " w url

        */
        if (!req.session.user) {
            res.redirect('/login?returnUrl=/a-products');
        } else {
            try {
                const client = await pool.connect()
                const result = await client.query('SELECT * FROM items');
                const results = {
                    'results': (result) ? result.rows : null,
                    'q': req.query
                };
                res.render('a-products', results);
                client.release();
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }
        }
    }).post('/edit-product', async(req, res) => {
        let id = req.body.id
        let name = req.body.name;
        let price = req.body.price;
        let desc = req.body.description;
        let img = req.body.image;

        try {
            const client = await pool.connect()
            const result = await client.query(`UPDATE items SET name = $1, price = $2, description = $3,image = $4 WHERE id = $5`, [name, price, desc, img, id]);
            client.release();
        }
        //to i tak nie działa ale sobie jest
        catch (err) {
            console.error(err);
            res.send("Error " + err);
        }

        res.redirect('/a-products')
    })
    .post('/add-product', async(req, res) => {
        let name = req.body.name;
        let price = req.body.price;
        let desc = req.body.description;
        let img = req.body.image;

        try {
            const client = await pool.connect()
            const result = await client.query(`INSERT INTO items (name,price,description,image) VALUES ($1, $2 ,$3, $4)`, [name, price, desc, img]);
            client.release();
        }
        //to i tak nie działa ale sobie jest
        catch (err) {
            console.error(err);
            res.send("Error " + err);
        }

        res.redirect('/a-products')
    })
    .get('/add-to-cart/:id(\\d+)', async(req, res) => {


        if (req.session.user) {

            if (req.session.user.cart) {
                var item = new myCart.Item(req.params.id, 1);
                var cart = new myCart.Cart(req.session.user.cart);
                console.log('-------');
                console.log('cart: ' + cart);
                cart.addToCart(item);
                console.log('cart2: ' + cart);
                req.session.user.cart = cart;
                console.log(req.session.user.cart);

            } else {
                console.log("Jestem");
                req.session.user.cart = new myCart.Cart(null);
                var item = new Item(req.params.id, 1);
                req.session.user.cart.addToCart(item);
                console.log(req.session.user.cart);
            }

            if (req.headers.referer) {
                res.redirect(req.headers.referer);
            } else {
                res.redirect('/');
            }
        } else {
            if (req.headers.referer) {
                res.redirect('/login?returnUrl=' + req.headers.referer);
            } else {
                res.redirect('/login');
            }
        }

        //console.log(req.params.id); // ADD TO CART
    })
    .get('/logout', async(req, res) => {

        if (req.session.user) {
            delete req.session.user;
            if (req.headers.referer)
                res.redirect(req.headers.referer);
            else
                res.redirect('/');
        } else {
            if (req.headers.referer)
                res.redirect(req.headers.referer);
            else
                res.redirect('/');
        }
    })
    .use((req, res, next) => {
        res.render('404.ejs', {
            url: req.url
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))