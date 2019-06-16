const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    userRoutes = require('./routes/user'), 
    messagesRoutes = require('./routes/messages'),
    cors = require('cors'),
    port = 3001;


app.use(cors());
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/myJournal', {
    useNewUrlParser: true
}).then(
    console.log("DB CONNECTED")
).catch(err => console.log(err))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);
app.use('/API/users', userRoutes);
app.use('/API/messages', messagesRoutes);


app.listen(port, () => {
    console.log(`app is running at ${port}`)
})
