const express = require('express'),
    router = express.Router(),
    checkUser = require('../middleware/verifyUser'),
    User = require('../models/user'),
    messages = require('../models/messages');

// GET ALL MESSAGES FROM DB
router.get('/', (req, res) => {
    messages.find((err, messages) => {
        if (err) {
            res.sendStatus(404)
        } else {
            res.json({messages})
        }
    })
})

// POST MESSAGES TO DB
router.post('/add', checkUser, (req, res) => {
    User.findById(req.user.id) 
        .then((user) => {
           const newMsg = new messages({
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

// DELETE SPECIFIC MESSAGE FROM DB
router.delete('/delete/:id', (req, res) => {
    messages.deleteOne({_id: req.params.id}, function(err, post) {
        if (err) res.json(err)
        else res.json({msg: req.params.id})
    })
})


module.exports = router;