'use strict';

const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

app = require('./routes')(app);

app.use(errorhandler());

app.listen(3000);