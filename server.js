const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inputTreeTable', { useNewUrlParser: true }, (err) => {
    if (!err) { 
        console.log('DB connection is successful.') 
    }
    else { 
        console.log('Error in DB connection : ' + err) 
    }
});
var inputTable = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    latitude: {
        type: Number,
        required: 'This field is required.'
    },
    longitude: {
        type: Number,
        required: 'This field is required.'
    },
    height: {
        type: Number,
        required: 'This field is required.'
    }
});
mongoose.model('InputTree', inputTable);
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/body/' }));
app.set('view engine', 'hbs');
app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});
const inputCtrl = require('./inputCtrl');
app.use('/tree', inputCtrl);