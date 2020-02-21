const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt1 = 'yummy';
const jwt = require('jsonwebtoken');

let User = require('../../models/user');

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    const {username,email,password,type} = req.body;
    const rating=5;
    if(!username || !email || !password || !type) {
        return res.status(400).json({res:'Missing fieds'});
    }
    User.findOne({username})
        .then(user =>{
            if(user) return res.status(400).json({msg:'Username unavailable'});
            const newuser = new User ({
                username,
                email,
                type,
                rating,
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newuser.password = hash;
                    newuser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                jwt1,                    
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            type: user.type
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
}); 
// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/login').post(function(req, res) {
    let Username = req.body.username;
    let Password = req.body.password;
    User.findOne({ username: Username })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User Does not exist' });

            bcrypt.compare(Password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        jwt1,
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    type: user.type
                                }
                            });
                        }
                    )
                })
        })
});    

userRoutes.post('/token',  (req, res) => {
    const decoded = jwt.verify(req.body.token, jwt1);
    // return res.json({"user":decoded.id});
  User.findById(decoded.id)
    .select('-password')
    .then(user => res.json(user));
});

userRoutes.route('/delete/:id').post(function(req, res) {
    User.findById(req.params.id)
        .then(user=> user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

userRoutes.route('/rating').post(function(req, res) {
    let x=0;
    console.log(req.body.rating);
    User.findOne({"username":req.body.username},function(err,user) {
        if(true)
        {
            console.log('u'+user.rating);
            if(user.rating)
            {
                    x=parseInt(user.rating);
            }
            console.log('r'+req.body.rating);
            x=(x+parseInt(req.body.rating))/2;
            console.log(x);
            User.update({username: req.body.username}, {"$set":{"rating":x}},(err, writeResult) => {console.log(writeResult)});
            res.status(200).send('OK');
            

        }
        else
            res.status(400).send('Error');
    }
    );

});

module.exports = userRoutes;
