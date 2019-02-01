import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}
	login() {
		const user = {
			username: this.state.username,
			password: this.state.password
		};
		axios
			.post('/api/login', user)
			.then(() => this.props.history.push('/dashboard'))
			.catch(() => alert('Invalid Username or Password'));
	}
	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Username"
					name="username"
					value={this.state.username}
					onChange={(e) => this.handleChange(e)}
				/>
				<input
					placeholder="Password"
					type="password"
					name="password"
					value={this.state.password}
					onChange={(e) => this.handleChange(e)}
				/>
				<button onClick={() => this.login()}>Login</button>
			</div>
		);
	}
}
