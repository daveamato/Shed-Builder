import React from 'react';
import ContactInfo from './ContactInfo';
import EstimateItems from './EstimateItems';
import APEXSHEDLOGO from '../../APEXSHEDLOGO.png';

export default function EstimateData(props) {
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
					<span>{props.estimate.name}</span>
					<span>{props.estimate.address}</span>
					<span>{props.estimate.city + ', ' + props.estimate.state + ' ' + props.estimate.zip}</span>
				</div>
				<div className="address-container">
					<b>SHIP TO</b>
					<span>{props.estimate.name}</span>
					<span>{props.estimate.address}</span>
					<span>{props.estimate.city + ', ' + props.estimate.state + ' ' + props.estimate.zip}</span>
				</div>
				<div className="address-container">
					<span>
						<b>ESTIMATE# </b> {props.estimate.estimate_id}
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
					<span>{props.estimate.phone}</span>
				</div>
				<div className="address-container">
					<b>SALES REP</b>
					<span>Online Estimate</span>
				</div>
			</div>
			<EstimateItems items={props.estimate.items} />
		</div>
	);
}
