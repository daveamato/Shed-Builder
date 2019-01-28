import React, { Component } from 'react';

export default class CustomOptions extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.category.name === 'CPITCH') {
			return (
				<div>
					<h3>Select Custom Roof Pitch</h3>
					<label htmlFor="6/12">
						<img
							src="https://www.apexshedcompany.com/images/6-12%20pitch%20with%20cupola.png?crc=267566715"
							alt="6/12 roof pitch"
						/>
						6/12 Pitch
					</label>
					<input
						id="6/12"
						type="radio"
						name="pitch"
						value="6/12 "
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
					<label htmlFor="8/12">
						<img
							src="https://www.apexshedcompany.com/images/10x12%20tall%20ranch%20with%20carriage%20house%20door.jpg?crc=4004782076"
							alt="8/12 roof pitch"
						/>
						8/12 Pitch
					</label>
					<input
						id="8/12"
						type="radio"
						name="pitch"
						value="8/12 "
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
					<label htmlFor="10/12">
						<img
							src="https://www.apexshedcompany.com/images/stringham%20pool%20house%201.png?crc=4041033455"
							alt="10/12 roof pitch"
						/>
						10/12 Pitch
					</label>
					<input
						id="10/12"
						type="radio"
						name="pitch"
						value="10/12 "
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
