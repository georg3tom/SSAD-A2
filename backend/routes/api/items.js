const express = require('express');
const itemRoutes = express.Router();
const jwt1 = 'yummy';
const jwt = require('jsonwebtoken');

//Item model
const Item = require('../../models/item');
let User = require('../../models/user');

function getn(token) 
{
    const decoded = jwt.verify(token, jwt1);
    return decoded.id;
}

itemRoutes.route('/').post(function(req, res) {
    User.findById(getn(req.body.token),function(err,user) {
        if(user.type=="Vendor")
            Item.find({username:user.username},function(err, items) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(items);
                }
            });
        else
            Item.find(function(err, items) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(items);
                }
            });
    }
    );
});

// Adding a new item
itemRoutes.route('/add').post(function(req, res) {
    let item = new Item;
    item.price = req.body.price;
    item.quantity = req.body.quantity;
    item.name = req.body.name;
    console.log(item)
    User.findById(getn(req.body.token),function(err,user) {
        item.username=user.username;
    console.log(item)
        if(user.type=="Vendor")
            item.save()
                .then(item => {
                    res.status(200).json({'item': 'Item added successfully'});
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
itemRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

itemRoutes.route('/delete/:id').post(function(req, res) {
    Item.findById(req.params.id)
    .then(item=> item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = itemRoutes;
