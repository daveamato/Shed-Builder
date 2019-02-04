import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			estimates: []
		};
	}
	componentWillMount() {
		axios
			.get('/api/authCheck')
			.then(() => axios.get('/api/getEstimates').then(({ data }) => this.setState({ estimates: data })))
			.catch(() => this.props.history.push('/login'));
	}
	logOut() {
		axios.post('/api/auth/logout').then(() => this.props.history.push('/login'));
	}
	render() {
		return (
			<div>
				<h2>welcome to the dashboard!</h2>
				<button onClick={() => this.logOut()}>Logout</button>
				{this.state.estimates.map((estimate) => (
					<Link to={`/estimate/${estimate.estimate_id}`} key={estimate.estimate_id}>
						<div>
							<span>{estimate.estimate_id}</span>
							<span>{estimate.name}</span>
						</div>
					</Link>
				))}
			</div>
		);
	}
}
