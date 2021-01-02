const express = require('express');
const router = express.Router();
const Game = require('../models/game_model');


// action games page route
router.get('/action/:pageNo?', (req, res) => {
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
        let query = Game.find(null);
        //query.find({field1:value1,general.field2:val2});
        //query.limit(3) //no of returned records
        //query.sort(field1:-1)
        //query.where('name.firstName').equals('value')
        //query.where('age').gt(17).lt(66) from to
        query.where('category').in(['Action'])
            //query.select('category');
        query.exec(q, (err, games) => {
            // res.json(games)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < games.length; i += chunkSize) {
                chunk.push(games.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('categories/action', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                games: games,
                title: 'LION GAMES | Action Games Page'
            })
        })
    })
})

// sport games page route
router.get('/sports/:pageNo?', (req, res) => {
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
        let query = Game.find(null);
        //query.find({field1:value1,general.field2:val2});
        //query.limit(3) //no of returned records
        //query.sort(field1:-1)
        //query.where('name.firstName').equals('value')
        //query.where('age').gt(17).lt(66) from to
        query.where('category').in(['Sports'])
            //query.select('category');
        query.exec(q, (err, games) => {
            // res.json(games)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < games.length; i += chunkSize) {
                chunk.push(games.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('categories/sports', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                games: games,
                title: 'LION GAMES | Sports Games Page'
            })
        })
    })
})

// fighting games page route
router.get('/fighting/:pageNo?', (req, res) => {
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
        let query = Game.find(null);
        //query.find({field1:value1,general.field2:val2});
        //query.limit(3) //no of returned records
        //query.sort(field1:-1)
        //query.where('name.firstName').equals('value')
        //query.where('age').gt(17).lt(66) from to
        query.where('category').in(['Fighting'])
            //query.select('category');
        query.exec(q, (err, games) => {
            // res.json(games)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < games.length; i += chunkSize) {
                chunk.push(games.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('categories/fighting', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                games: games,
                title: 'LION GAMES | Fighting Games Page'
            })
        })
    })
})

// racing games page route
router.get('/racing/:pageNo?', (req, res) => {
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
        let query = Game.find(null);
        //query.find({field1:value1,general.field2:val2});
        //query.limit(3) //no of returned records
        //query.sort(field1:-1)
        //query.where('name.firstName').equals('value')
        //query.where('age').gt(17).lt(66) from to
        query.where('category').in(['Racing'])
            //query.select('category');
        query.exec(q, (err, games) => {
            // res.json(games)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < games.length; i += chunkSize) {
                chunk.push(games.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('categories/racing', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                games: games,
                title: 'LION GAMES | Racing Games Page'
            })
        })
    })
})

module.exports = router;