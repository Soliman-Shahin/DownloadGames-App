const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user_model')
const FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: '402831207546-gu4mrsnp26mpkq2neecv47vodueoah9d.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ socialId: profile.id }, function(err, user) {
            if (user) {
                done(null, user);
            } else {
                //create user
                let newUser = new User()
                newUser.socialId = profile.id
                newUser.signupType = profile.provider
                newUser.email = profile._json.email
                newUser.username = profile.displayName
                newUser.favorites = []
                newUser.password = newUser.hashPassword(profile.password)
                newUser.avatar = "profile.png"
                    // to grt facebook img use newUser.avatar = profile.photos ? profile.photos[0].value : 'profile.png'
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user)
                    } else {
                        console.log(err)
                    }
                })
            }
        });
    }
));


// sign up with facebook
passport.use(new FacebookStrategy({
        clientID: '325939069339850',
        clientSecret: '6008c48ba080e67d6ab46ec6245869f6',
        callbackURL: "/users/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ socialId: profile.id }, function(err, user) {
            if (user) {
                done(null, user);
            } else {
                //create user
                let newUser = new User()
                newUser.socialId = profile.id
                newUser.signupType = profile.provider
                newUser.email = profile._json.email
                newUser.username = profile.displayName
                newUser.favorites = []
                newUser.password = newUser.hashPassword(profile.password)
                newUser.avatar = "profile.png"
                    // to grt facebook img use newUser.avatar = profile.photos ? profile.photos[0].value : 'profile.png'
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user)
                    } else {
                        console.log(err)
                    }
                })
            }
        });
    }
));

// saving user object in the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// register user
passport.use('local.signup', new localStrategy({
    typeField: 'type',
    emailField: 'email',
    usernameFiled: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'))
    } else {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, false, req.flash('error', 'Email already used'))
            }

            if (!user) {
                //create user
                let newUser = new User()
                newUser.type = req.body.type
                newUser.email = req.body.email
                newUser.username = req.body.username
                newUser.favorites = []
                newUser.password = newUser.hashPassword(req.body.password),
                    newUser.avatar = "profile.png"
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user, req.flash('success', 'User Added'))
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    }
}))

//login strategy
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {

    //find user
    User.findOne({ email: username }, (err, user) => {

        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))
        }
        if (!user) {
            return done(null, false, req.flash('error', 'user was not found'))
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null, user, req.flash('success', ' welcome back'))

            } else {
                return done(null, false, req.flash('error', ' password is wrong'))

            }
        }
    })
}))