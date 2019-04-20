const mongoose = require('mongoose'),
    passportLocalMongooseEmail = require('passport-local-mongoose-email'),
    Schema = mongoose.Schema, 
    bcrypt = require('bcryptjs');


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

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.plugin(passportLocalMongooseEmail);
module.exports = mongoose.model('User', UserSchema);