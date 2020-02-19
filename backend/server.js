const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const jwt = 'yummy'

const app = express();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints


app.use('/user', require('./routes/api/users'));
app.use('/item', require('./routes/api/items'));
app.use('/order', require('./routes/api/orders'));

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
