const express = require('express');
const orderRoutes = express.Router();
const jwt1 = 'yummy';
const jwt = require('jsonwebtoken');

//Item model
const Item = require('../../models/item');
const Order = require('../../models/order');
const User = require('../../models/user');

function getn(token) 
{
    const decoded = jwt.verify(token, jwt1);
    return decoded.id;
}

orderRoutes.route('/').post(function(req, res) {
    Order.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

// Adding a new item
orderRoutes.route('/add').post(function(req, res) {
    let order = new Order;
    order.vendor = req.body.vendor;
    order.itemid = req.body.itemid;
    order.name = req.body.name;
    order.quantity = req.body.quantity;
    order.st = "Waiting";
    User.findById(getn(req.body.token),function(err,user) {
        order.customer=user.username;
        // console.log(item)
        if(user.type=="Customer")
            order.save()
                .then(item => {
                    res.status(200).json({'order': 'order placed successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        else
            res.status(400).send('Error');
    }
    );
});

// Getting a item by id
orderRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Order.findById(id, function(err, item) {
        res.json(item);
    });
});

orderRoutes.route('/delete/:id').post(function(req, res) {
    Order.findById(req.params.id)
        .then(item=> item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = orderRoutes;
