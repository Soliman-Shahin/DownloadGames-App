const mongoose = require('mongoose')
let db = mongoose.connect('mongodb+srv://soliman:Soliman94@cluster0.kafiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log('connected to database successfully...')
    }
})
