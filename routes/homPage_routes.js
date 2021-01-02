const express = require('express');
const router = express.Router();
const Game = require('../models/game_model');


// home page route
router.get('/:pageNo?', (req, res) => {
    let pageNo = 1
    if (req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo == 0) {
        pageNo = 1
    }
    let q = {
            skip: 18 * (pageNo - 1),
            limit: 18
        }
        //find total documents
    let totalDocs = 0
    Game.countDocuments({}, (err, total) => {}).then((response) => {
        totalDocs = parseInt(response)
        Game.find({}, {}, q, (err, games) => {
            // res.json(games)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < games.length; i += chunkSize) {
                chunk.push(games.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('game/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                games: games,
                title: 'LION GAMES | Home Page'
            })
        })
    })
})

module.exports = router;