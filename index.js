const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(express.static('./uploads'));
app.use(expressLayouts);
app.use(cookieParser());

app.use(
    session({
        name: 'csvApplication',
        secret: 'blahsomething',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://adarshsingh933:iDF9W3SNmDzpDk4a@cluster0.a38g0f6.mongodb.net/CSV_Upload_App',
            autoRemove: 'disabled',
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in running server on port",port);
        return;
    }
    console.log("Server is running on port",port);
})
