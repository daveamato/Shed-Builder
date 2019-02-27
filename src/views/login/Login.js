import React, { Component } from 'react';
import axios from 'axios';
import ApexShedLogoTransparent from '../../ApexShedLogoTransparent.png';
import './login.css';

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
	login(event) {
		event.preventDefault();
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
			<div className="login-page">
				<form className="login-box">
					<img src={ApexShedLogoTransparent} alt="Apex logo" />
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
					<button type="submit" className="select-button" onClick={(e) => this.login(e)}>
						Login
					</button>
				</form>
			</div>
		);
	}
}
