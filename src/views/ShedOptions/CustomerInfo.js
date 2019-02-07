import React, { Component } from 'react';

export default function CustomerInfo(props) {
	return (
		<div className="customer-info-modal">
			<button className="cancel-button" onClick={() => props.hideForm()}>
				X
			</button>
			<input
				placeholder="Name"
				id="customer-name"
				type="text"
				name="name"
				value={props.name}
				onChange={(e) => props.handleChange(e)}
				className="customer-inputs"
			/>
			<input
				id="customer-address"
				name="address"
				placeholder="Street Address"
				value={props.address}
				onChange={(e) => props.handleChange(e)}
				className="customer-inputs"
			/>
			<input
				id="customer-city"
				placeholder="City"
				type="text"
				name="city"
				value={props.city}
				onChange={(e) => props.handleChange(e)}
				className="customer-inputs"
			/>
			<div>
				<input
					placeholder="state"
					id="customer-state"
					type="text"
					name="state"
					value={props.state}
					onChange={(e) => props.handleChange(e)}
					className="customer-inputs"
				/>
				<input
					placeholder="Zip"
					id="customer-zip"
					type="text"
					name="zip"
					value={props.zip}
					onChange={(e) => props.handleChange(e)}
					className="customer-inputs"
				/>
			</div>
			<div>
				<input
					placeholder="Phone"
					id="customer-phone"
					type="text"
					name="phone"
					value={props.phone}
					onChange={(e) => props.handleChange(e)}
					className="customer-inputs"
				/>
				<input
					placeholder="Email"
					type="text"
					id="customer-email"
					name="email"
					value={props.email}
					onChange={(e) => props.handleChange(e)}
					className="customer-inputs"
				/>
			</div>
			<button className="select-button" onClick={() => props.submitBid()}>
				Submit Bid
			</button>
		</div>
	);
}
