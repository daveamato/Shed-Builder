import React, { Component } from 'react';
import axios from 'axios';

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
			.then(() => console.log('all good here'))
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
			</div>
		);
	}
}
