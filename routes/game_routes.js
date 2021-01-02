const express = require('express');
const router = express.Router();
const Game = require('../models/game_model');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/home')
}

// upload game page route
router.get('/uploadGame', isAuthenticated, (req, res) => {
    let query = Game.find(null);
    query.exec((err, games) => {
        res.render('game/upload_game', {
            games: games,
            title: 'LION GAMES | UPLOAD GAME'
        })
    })
})

// update game page route
router.get('/:id/updateGame', (req, res) => {
    let query = Game.find(null);
    query.exec((err, games) => {
        Game.findOne({ _id: req.params.id }, (err, game) => {
            if (!err) {
                res.render('game/edit_game', {
                    game: game,
                    games: games,
                    title: 'LION GAMES | UPDATE GAME'
                })
            } else {
                console.log(err)
            }
        })
    })
})

// show single game page rout
router.get('/:id', (req, res) => {
    let query = Game.find(null);
    query.exec((err, games) => {
        Game.findOne({ _id: req.params.id }, (err, game) => {
            if (!err) {
                res.render('game/game_page', {
                    game: game,
                    games: games,
                    title: 'LION GAMES | Game Page'
                })
            } else {
                console.log(err)
            }
        })
    })
})

// game routes
// create game
router.post('/uploadGame', isAuthenticated, (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/games/' + req.body.gameTitle + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let game = new Game({
            gameImg: req.files.imageFile.data,
            gameTitle: req.body.gameTitle,
            gameDetails: req.body.gameDetails,
            systemReq: req.body.systemReq,
            gameSize: req.body.gameSize,
            updated: req.body.updated,
            downloadLink: req.body.downloadLink,
            category: req.body.category,
            user_id: req.user.id,
        });
        game.save((err) => {
            if (!err) {
                console.log('Game was Uploaded')
                req.flash('info', 'Game Uploaded successfully')
                res.redirect('/home')
            } else {
                console.log(err)
            }
        })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
});

// update game
router.post('/:id/update', (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/games/' + req.body.gameTitle + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let newfeilds = {
            gameImg: req.files.imageFile.data,
            gameTitle: req.body.gameTitle,
            gameDetails: req.body.gameDetails,
            systemReq: req.body.systemReq,
            gameSize: req.body.gameSize,
            updated: req.body.updated,
            downloadLink: req.body.downloadLink,
            category: req.body.category
        }
        Game.updateOne({ _id: req.params.id }, newfeilds,
            (err) => {
                if (!err) {
                    console.log('Game was Updated')
                    req.flash('info', 'Game Updated successfully')
                    res.redirect('/admin/dashboard')
                } else {
                    console.log(err)
                }
            })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
});

// delete game
router.post('/:id/deleteGame', (req, res) => {
    Game.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Game was Deleted')
                req.flash('info', 'Game Deleted successfully')
                res.redirect(req.get('referer'));
            } else {
                console.log(err)
            }
        })
});

module.exports = router;