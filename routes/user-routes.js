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

// middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/home')
}

//  login user view
router.get('/login', (req, res) => {
    res.render('user/login', {
        error: req.flash('error')
    })
})

// login post request
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/home',
        failureFlash: true
    })
)

// sign up form
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    })
})

// sign up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/home',
        failureFlash: true
    })
)

// profile
router.get('/profile', isAuthenticated, (req, res) => {
    let query = Game.find(null);
    let favorites = User.findOne({ id: req.user.id });
    favorites.exec((err, favorites) => {
        query.exec((err, games) => {
            res.render('user/profile', {
                success: req.flash('success'),
                games: games,
                favorites: favorites,
                title: 'LION Games | Profile Page'
            })
        })
    })
})

//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {

    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne({ _id: req.user._id }, newFields, (err) => {
        if (!err) {
            res.redirect('/users/profile')
        }
    })
})

// add game to favorites
router.post('/addGameToFav', (req, res) => {
    User.findOne({ _id: req.user._id, "favorites.gameId": req.body.gameId }, (err, used) => {
        if (used) {
            return res.status(200).json({ error: true, msg: 'This Game already in Favorites' });
        }
        if (!used) {
            User.updateOne({ _id: req.user._id }, {
                    $push: {
                        favorites: {
                            gameId: req.body.gameId,
                            gameTitle: req.body.gameTitle,
                        }
                    }
                },
                (err) => {
                    if (!err) {
                        res.status(200).json({ success: true, msg: 'Game was Added To Favorites' });
                        console.log('Game was Added To Favorites')
                    } else {
                        console.log(err)
                    }
                })
        }
    })
});

// delete from favorites
router.post('/:id/:favId/deleteFav', (req, res) => {
    User.updateOne({ _id: req.params.id }, { $pull: { favorites: { _id: req.params.favId } } }, { multi: false },
        (err) => {
            if (!err) {
                console.log('Favorite Game was Deleted')
                req.flash('success', 'Favorite Game Deleted')
                res.redirect('/users/profile')
            } else {
                console.log(err)
            };
        })
});

// delete user
router.post('/:id/deleteUser', (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log('User was Deleted')
            req.flash('info', 'User Deleted successfully')
            res.redirect('/home')
        } else {
            console.log(err)
        }
    })
})

// logout user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
})

module.exports = router