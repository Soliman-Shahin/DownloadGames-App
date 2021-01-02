const express = require('express');
const app = express();
const db = require('./config/detabase');
const game = require('./routes/game_routes');
const home = require('./routes/homPage_routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

// bring ejs template
app.set('view engine', 'ejs')

// bring body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring static
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))

// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))

app.use(flash());

// bring passport
app.use(passport.initialize())
app.use(passport.session())

//store user object
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
});

app.get('/', (req, res) => {
    res.redirect('/home')
})

// bring user routes
const users = require('./routes/user-routes')
app.use('/users', users)

// bring categories pages routes
const categories = require('./routes/categories_routes')
app.use('/games', categories);

// bring admin routes
const admin = require('./routes/admin_routes')
app.use('/admin', admin);

app.use('/home', home);
app.use('/game', game);


let port = 4000;
app.listen(port, () => {
    console.log('Server is Running on Port ' + port);
});