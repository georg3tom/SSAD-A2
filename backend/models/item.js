const mongoose = require('mongoose');

let Item = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    st: {
        type: String
    },
    review: {
        type: String
    },
    rating: {
        type: String
    },
    username: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', Item);
