const mongoose = require('mongoose');
const schema = mongoose.Schema;

let gameSchema = new schema({
    gameImg: {
        type: Buffer
    },
    gameTitle: {
        type: String,
        required: true
    },
    gameDetails: {
        type: String,
        required: true
    },
    systemReq: {
        type: String,
        required: true
    },
    gameSize: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        required: true
    },
    downloadLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema, 'Games');