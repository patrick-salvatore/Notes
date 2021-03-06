const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messagesSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
        }
    }
});


module.exports = mongoose.model('message', messagesSchema)
