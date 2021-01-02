const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const Game = require('../models/game_model')
const passport = require('passport')
const multer = require("multer")

// configure multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage })


// middleware to check if admin is logged in

isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'admin') {
            return next();
        }
    }
    res.redirect('/home');
}

//  login admin view
router.get('/login', (req, res) => {
    res.render('admin/login', {
        error: req.flash('error'),
        title: 'LION Games | ADMIN LOGIN'
    })
})

// login post request
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
)

// sign up form
router.get('/signup', (req, res) => {
    res.render('admin/signup', {
        error: req.flash('error'),
        title: 'LION Games | ADMIN SIGNUP'
    })
})

// sign up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
)

// dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    let query = Game.find(null);
    let users = User.find(null);
    users.exec((err, users) => {
        query.exec((err, games) => {
            res.render('admin/dashboard', {
                success: req.flash('success'),
                games: games,
                users: users,
                title: 'LION Games | ADMIN DASHBOARD'
            })
        })
    })
})


// logout admin
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
})

module.exports = router