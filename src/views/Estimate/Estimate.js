import React, { Component } from 'react';
import axios from 'axios';
import EstimateData from './EstimateData';
import './estimate.css';

export default class Estimate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			estimate: {},
			loading: true
		};
	}
	componentWillMount() {
		const estimateId = this.props.match.params.estimateId;
		axios
			.get('/api/get_single_estimate/' + estimateId)
			.then((response) => this.setState({ estimate: response.data[0], loading: false }))
			.catch((err) => console.log(err));
	}
	render() {
		return this.state.loading ? (
			<div>
				<h1>Loading...</h1>
			</div>
		) : (
			<div>
				<EstimateData estimate={this.state.estimate} />
			</div>
		);
	}
}
