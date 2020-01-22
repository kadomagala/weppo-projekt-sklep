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
    console.log("error");
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
    .get('/product/:id(\\d+)', async (req, res) => {
        try {
            const client = await pool.connect()

            const result = await client.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
            const results = {
                'results': (result) ? result.rows : null
            };
            if (result) {
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
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))