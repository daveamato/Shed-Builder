module.exports = {
	newBid: (req, res) => {
		const dbInstance = req.app.get('db');
		const { name, email, phone, address, items } = req.body;

		dbInstance.customers.insert({ name, email, phone, address }).then((customer) => {
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
	}
};
