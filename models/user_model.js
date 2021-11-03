const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    userId: String,
    socialId: String,
    signupType: {
        type: String,
        enum: ["NORMAL", "facebook", "GMAIL"],
        default: "NORMAL"
    },
    type: {
        type: String,
        enum: ["USER", "ADMIN"],
        trim: true,
        default: "USER"
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    favorites: [{
        gameId: {
            type: String
        },
        gameTitle: {
            type: String
        },
        gameImg: {
            type: Buffer
        }
    }]
})

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePasswords = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

let User = mongoose.model('User', userSchema, 'users')

module.exports = User