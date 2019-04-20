const express = require('express'),
    router = express.Router(),
    checkUser = require('../middleware/verifyUser'),
    User = require('../models/user'),
    messageEntry = require('../models/messageEntry');


router.get('/messages', (req, res) => {
    messageEntry.find((err, message) => {
        if (err) {
            console.log(err)
        } else {
            res.json(message)
        }
    })
})

router.post('/add', checkUser, (req, res) => {
    User.findById(req.user.id) 
        .then((user) => {
           const newMsg = new messageEntry({
               body: req.body.message, 
               author: {
                   id: req.user.id,
                   name: user.name
               }
            })
            newMsg.save();
            res.json({newMsg})  
        })
})

router.delete('/delete/:id', (req, res) => {
    messageEntry.findbyIdAndRemove({_id: req.params.id}, function(err, post) {
        if (err) res.json(err)
        else res.json({msg: req.params.id})
    })
})


module.exports = router;