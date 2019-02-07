import React, { Component } from 'react';
import axios from 'axios';
import APEXSHEDLOGO from '../../APEXSHEDLOGO.png';
import './estimate.css';
import ContactInfo from './ContactInfo';
import EstimateItems from './EstimateItems';

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
		return (
			<div>
				<div className="estimate-header">
					<img className="apex-logo" src={APEXSHEDLOGO} alt="Apex logo" />
					<ContactInfo />
				</div>
				<h2 id="estimate">ESTIMATE</h2>
				<div className="customer-info">
					<div className="address-container">
						<b>ADDRESS</b>
						<span>{this.state.estimate.name}</span>
						<span>{this.state.estimate.address}</span>
						<span>
							{this.state.estimate.city +
								', ' +
								this.state.estimate.state +
								' ' +
								this.state.estimate.zip}
						</span>
					</div>
					<div className="address-container">
						<b>SHIP TO</b>
						<span>{this.state.estimate.name}</span>
						<span>{this.state.estimate.address}</span>
						<span>
							{this.state.estimate.city +
								', ' +
								this.state.estimate.state +
								' ' +
								this.state.estimate.zip}
						</span>
					</div>
					<div className="address-container">
						<span>
							<b>ESTIMATE# </b> {this.state.estimate.estimate_id}
						</span>
						<br />
						<span>
							<b>DATE</b>02/05/19
						</span>
					</div>
				</div>
				<hr className="divider" />
				<div className="customer-info" id="phone">
					<div className="address-container">
						<b>PHONE #</b>
						<span>{this.state.estimate.phone}</span>
					</div>
					<div className="address-container">
						<b>SALES REP</b>
						<span>Online Estimate</span>
					</div>
				</div>
				{this.state.loading ? null : <EstimateItems items={this.state.estimate.items} />}
			</div>
		);
	}
}
