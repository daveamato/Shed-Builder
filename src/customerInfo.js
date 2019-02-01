import React, { Component } from 'react';

export default function CustomerInfo(props) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<label htmlFor="customer- name"> Name: </label>
			<input
				id="customer-name"
				type="text"
				name="name"
				value={props.name}
				onChange={(e) => props.handleChange(e)}
			/>
			<label htmlFor="customer-address">Address: </label>
			<textarea
				id="customer-address"
				name="address"
				cols="30"
				rows="6"
				value={props.address}
				onChange={(e) => props.handleChange(e)}
			/>
			<label htmlFor="customer-phone">Phone: </label>
			<input
				id="customer-phone"
				type="text"
				name="phone"
				value={props.phone}
				onChange={(e) => props.handleChange(e)}
			/>
			<label htmlFor="customer-email">Email: </label>
			<input
				type="text"
				id="customer-email"
				name="email"
				value={props.email}
				onChange={(e) => props.handleChange(e)}
			/>
			<button onClick={() => props.hideForm()}>Cancel</button>
			<button>Submit Bid</button>
		</div>
	);
}
