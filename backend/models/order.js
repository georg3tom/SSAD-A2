const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    vendor: {
        type: String
    },
    customer: {
        type: String,
        require: true
    },
    itemid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    st: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', Order);
