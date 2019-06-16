const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    keys = require('../config/config'),
    jwt = require('jsonwebtoken'); 


router.post('/register', (req, res) => {
    const errors = []
    const { username, email, password, password2 } = req.body
    console.log(req.body)
    // check register criteria
    if (password !== password2) {
        errors.push({
            text: 'passwords do not match.',
        })
    }
    if (password < 6) {
        errors.push({
            text: 'Password must be at least 6 characters.',
        })
    }
    if (email.length < 1) {
        errors.push({
            text: 'Please enter an email',
        })
    }
    // check for errors, if none proceed
    if (errors.length > 0) {
        res.send({errors}).sendStatus(400)
    } else {
        let newUser = new User(req.body)
        User.findOne({
                email: newUser.email
            })
            .then((user) => {
                if (user) {
                    res.json({
                        msg: 'email has already been registered'
                    }).sendStatus(400)
                } else {
                    // handle email case
                    let email = newUser.email;
                    newUser.email = email.toLowerCase();
                    // encrypt password
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            // save user
                            if (err) throw err
                            newUser.password = hash;
                            newUser.save()
                                .then((user) => {
                                    res.status(200).send("Success! Thank you for signing up")
                                })
                                .catch((err) => {
                                    res.status(400).send("Sorry! We were unable to log your account into our database")
                                })
                        })
                    })
                }
            })
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if (!user) {
                res.status(404).json({msg: 'user is not found'})
            }
            bcrypt.compare(password, user.password)
                .then(isValid => {
                    if (isValid) {
                        const payload = {id : user._id}
                        jwt.sign(payload, keys.secretOrPrivateKey, {expiresIn: 3600}, (err, token) => {
                            if (err) throw err
                            res.json({token: 'Bearer ' + token, payload})
                        })
                    }
                    else {
                        res.status(400).json({msg: 'password is incorrect'})
                    }
                })
        })
})

module.exports = router;