import React, { Component } from 'react';
import axios from 'axios';

export default class Estimate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			estimate: {}
		};
	}
	componentWillMount() {
		const estimateId = this.props.match.params.estimateId;
		axios
			.get('/api/get_single_estimate/' + estimateId)
			.then((response) => this.setState({ estimate: response.data[0] }))
			.catch((err) => console.log(err));
	}
	render() {
		return <div>{this.state.estimate.name}</div>;
	}
}
