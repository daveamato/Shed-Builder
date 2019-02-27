import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dashboard.css';

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
			<div className="dashboard">
				<div className="dashboard-header">
					<h2>Customer Invoices</h2>
					<button onClick={() => this.logOut()} className="select-button">
						Logout
					</button>
				</div>
				<table>
					<thead>
						<tr>
							<td>
								<b>Estimate #</b>
							</td>
							<td>
								<b>Customer Name</b>
							</td>
							<td>
								<b>Status</b>
							</td>
						</tr>
					</thead>
					<tbody>
						{this.state.estimates.map((estimate) => (
							<tr key={estimate.estimate_id}>
								<td>
									<Link to={`/estimate/${estimate.estimate_id}`}>{estimate.estimate_id + 1000}</Link>
								</td>
								<td>
									<Link to={`/estimate/${estimate.estimate_id}`}>{estimate.name}</Link>
								</td>
								<td>{estimate.status ? 'New' : 'Opened'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
