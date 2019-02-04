const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const QuickBooks = require('node-quickbooks');
const axios = require('axios');
const massive = require('massive');
const controller = require('./server/controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true
	})
);

massive(process.env.CONNECTION_STRING)
	.then((db) => {
		console.log('db Connected');
		app.set('db', db);
	})
	.catch((err) => console.log(err));

app.post('/api/new-bid', controller.newBid);
app.post('/api/login', controller.login);
app.get('/api/authCheck', controller.authCheck);
app.get('/api/getEstimates', controller.getEstimates);
app.get('/api/get_single_estimate/:estimateId', controller.getOneEstimate);
app.post('/api/auth/logout', (req, res, next) => req.session.destroy(() => res.sendStatus(200)));
app.listen(3002, () => console.log('listening on port 3002'));
