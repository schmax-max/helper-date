const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {errorHandler} = require('./errorHandler')
const {router} = require('./router')

console.log('print in server')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use(router);

module.exports = {app}

