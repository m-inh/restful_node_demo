'use strict';

// external dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// internal dependencies
const api = require('./api');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));	
app.use(bodyParser.json());
app.use('/api', api);

app.listen(PORT, (err) => {
	if (err) throw err;
	
	return console.log('server is listening on', PORT);
});
