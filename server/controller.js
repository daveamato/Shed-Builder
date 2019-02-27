module.exports = {
	newBid: (req, res) => {
		const dbInstance = req.app.get('db');
		const { name, email, phone, address, city, state, zip, items } = req.body;

		dbInstance.customers.insert({ name, email, phone, address, city, state, zip }).then((customer) => {
			const customerId = customer.customer_id;
			dbInstance.add_estimate([ customerId, items ]).then(() => res.sendStatus(200)).catch((err) => {
				res.status(500).send({ errorMessage: 'Something went wrong!' });
				console.log(err);
			});
		});
	},
	login: (req, res) => {
		const dbInstance = req.app.get('db');
		const { username, password } = req.body;

		dbInstance
			.login_user([ username, password ])
			.then((user) => {
				if (user.length !== 0) {
					req.session.userId = user[0].id;
					res.sendStatus(200);
				} else {
					res.sendStatus(401);
				}
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Something went wrong!' });
				console.log(err);
			});
	},
	authCheck: (req, res) => {
		if (req.session.userId) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	},
	getEstimates: (req, res) => {
		const dbInstance = req.app.get('db');

		dbInstance.get_estimates().then((data) => res.send(data)).catch((err) => {
			res.status(500).send({ errorMessage: 'Something went wrong!' });
			console.log(err);
		});
	},
	getOneEstimate: (req, res) => {
		const dbInstance = req.app.get('db');
		const { estimateId } = req.params;

		dbInstance
			.get_single_estimate([ estimateId ])
			.then((estimate) => {
				res.send(estimate);
				console.log(estimate);
				if (estimate[0].status === true && req.session.userId) {
					dbInstance.update_status([ estimateId ]).then(() => res.status(200)).catch((err) => {
						res.status(500).send({ errorMessage: 'Something went wrong!' });
						console.log(err);
					});
				}
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Something went wrong!' });
				console.log(err);
			});
	}
};
