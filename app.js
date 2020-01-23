const express = require('express')
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 5000

const {
    Pool
} = require('pg');
let pool;
try {
    let secret = JSON.parse(fs.readFileSync('secret.json'));
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

//console.log(secret)



express()
    .use(express.static(__dirname + '/public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', async (req, res) => {
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
    .get('/search', async (req, res) => {
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
    .get('/product/:id(\\d+)', async (req, res) => {
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
    .use((req, res, next) => {
        res.render('404.ejs', {
            url: req.url
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))