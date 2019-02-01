const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const QuickBooks = require('node-quickbooks');
const axios = require('axios');

function getCompanyInfo(req, res) {
	axios
		.get(
			'https://sandbox-quickbooks.api.intuit.com/v3/company/123146298046794/companyinfo/123146298046794/?minorversion=12',
			{
				accept: 'application/json',
				authorization: 'Basic ' + process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
				'content-type': 'application/json'
			}
		)
		.then((response) => res.send(response))
		.catch((err) => console.log(err));
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/api/test', getCompanyInfo);

app.listen(3002, () => console.log('listening on port 3002'));
