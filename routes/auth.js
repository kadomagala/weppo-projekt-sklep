const express = require('express');
const usersRepository = require('../repositories/userRepository');
const session = require('express-session');

const router = express.Router();

router.get('/login', async(req, res) => {
    var data = {
        message: "",
        returnUrl: req.query.returnUrl ? (req.query.returnUrl) : '/',
        ai: req.query.ai ? req.query.ai : null
    };

    if(! await usersRepository.getUserByEmail('z1')){
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(1);
        var pwdhash = bcrypt.hashSync('z1', salt);
        await usersRepository.createUser('z1', pwdhash, 'admin');
    }

    res.render('login.ejs', data);
});

router.post('/login', async(req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;
    var data = {
        message: "",
        returnUrl: req.body.returnUrl,
        ai: req.query.ai ? req.query.ai : null
    };

    const result = await usersRepository.getUserByEmail(email);

    if (result) {
        var pwdhash = result.password;
        if (pwdhash == null || pwdhash == undefined) 
            console.error("Błąd odczytu hasła z bazy danych");

        var bcrypt = require('bcryptjs');
        if (bcrypt.compareSync(pwd, pwdhash)) {
            data.message = "Zalogowano";
            req.session.user = {
                email: email,
                role: result.role ? result.role : null
            };
            if (req.body.returnurl != "/") {
                res.redirect(req.body.returnurl);
            } else {
                res.redirect('/');
            }
        } else {
            data.message = "Błędne hasło";
            res.render('login.ejs', data)
        }
    } else {
        data.message = "Błędny e-mail";
        res.render('login.ejs', data)
    }
});

router.post('/register', async(req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;
    let pwd2 = req.body.password2;
    var data = {
        message: "",
        returnUrl: "/",
        ai: req.query.ai ? req.query.ai : null
    };

    if (pwd != pwd2) {
        data.message = "Hasła się różnią";

    } else {
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(1);
        var pwdhash = bcrypt.hashSync(pwd, salt);
        try {
            var user = await usersRepository.getUserByEmail(email);
            if (user) {
                data.message = "E-mail już użyty";
            } else {
                const result = await usersRepository.createUser(email, pwdhash, 'user');
                data.message = "Zarejestrowano użytkownika";
            }
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
            data.message = "Błąd rejestracji";
        }
    }
    res.render('login.ejs', data)
});

router.get('/logout', async(req, res) => {

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
});

module.exports = router;