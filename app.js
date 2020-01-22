const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const {
    Pool
} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});


express()
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => {
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
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))