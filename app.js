var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var { weather } = require('./routes');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', weather);

module.exports = app;
