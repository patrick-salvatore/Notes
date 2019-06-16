const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


module.exports = mongoose.model('User', UserSchema);