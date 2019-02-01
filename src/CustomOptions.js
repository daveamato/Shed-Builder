import React, { Component } from 'react';
import { inventory } from './InventoryService';

const inventoryFiltered = inventory.filter((item) => item.category === 'soffit');

export default class CustomOptions extends Component {
	render() {
		const { width, length } = this.props;
		if (this.props.category.name === 'CPITCH') {
			return (
				<div>
					<h3>Select Custom Roof Pitch</h3>
					<label htmlFor="4/12">Standard Roof Pitch</label>
					<input
						type="radio"
						id="4/12"
						name="pitch"
						value="4/12 "
						checked={this.props.roofPitch === '4/12 '}
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
					<label htmlFor="6/12">
						<img
							className="soffit-image"
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
						checked={this.props.roofPitch === '6/12 '}
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
					<label htmlFor="8/12">
						<img
							className="soffit-image"
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
						checked={this.props.roofPitch === '8/12 '}
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
					<label htmlFor="10/12">
						<img
							className="soffit-image"
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
						checked={this.props.roofPitch === '10/12 '}
						onChange={(e) => this.props.addCustomRoofPitch(this.props.category, e.target.value)}
					/>
				</div>
			);
		} else {
			let overhang = this.props.category;
			overhang.price = ((width + 2) * 2 + (length + 2) * 2) * 4.5;
			const soffit = inventoryFiltered
				.map((item) => {
					switch (item.name) {
						case 'SSOFFIT':
							item.price = ((width + 2) * 2 + (length + 2) * 2) * 5;
							return item;

						case 'ASOFFIT':
							item.price = ((width + 2) * 2 + (length + 2) * 2) * 8;
							return item;
						default:
							return item;
					}
				})
				.sort((a, b) => a.name - b.name);
			let aluminum = soffit[0];
			let smart = soffit[1];
			return (
				<div>
					<h3>12" Overhang</h3>
					<label htmlFor="no-overhang">No Overhang</label>
					<input
						id="no-overhang"
						type="radio"
						name="overhang"
						value="none"
						checked={this.props.overhang === 'none'}
						onChange={(e) => this.props.addSoffit({ none: true }, overhang, e.target.value)}
					/>
					<label htmlFor="no-soffit">
						12" overhang with no soffit ${((width + 2) * 2 + (length + 2) * 2) * 4.5}
					</label>
					<input
						id="no-soffit"
						type="radio"
						name="overhang"
						value="no-soffit"
						checked={this.props.overhang === 'no-soffit'}
						onChange={(e) => this.props.addSoffit(overhang, overhang, e.target.value)}
					/>
					<label htmlFor="smart-soffit">
						12" overhang with Smart-Soffit ${((width + 2) * 2 + (length + 2) * 2) * 9.5}
					</label>
					<input
						id="smart-soffit"
						type="radio"
						name="overhang"
						value="smart-soffit"
						checked={this.props.overhang === 'smart-soffit'}
						onChange={(e) => this.props.addSoffit(smart, overhang, e.target.value)}
					/>
					<label htmlFor="alum-soffit">
						12" overhang with aluminum soffit ${((width + 2) * 2 + (length + 2) * 2) * 12.5}
					</label>
					<input
						id="alum-soffit"
						type="radio"
						name="overhang"
						value="alum-soffit"
						checked={this.props.overhang === 'smart-soffit'}
						onChange={(e) => this.props.addSoffit(aluminum, overhang, e.target.value)}
					/>
				</div>
			);
		}
	}
}
