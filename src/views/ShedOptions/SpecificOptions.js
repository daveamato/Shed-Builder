import React, { Component } from 'react';
import { inventory } from '../../InventoryService';
import CustomOptions from './CustomOptions';

export default class SpecificOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		const filteredCategories = inventory.filter((item) => item.category === this.props.category.alias);
		filteredCategories.map((item) => this.setState({ [item.name]: 1 }));
	}
	handleChange(event) {
		this.setState({ [event.target.name]: Number(event.target.value) });
	}
	render() {
		const filteredCategories = inventory.filter((item) => item.category === this.props.category.alias);
		return (
			<div className="scale-in-top options-list">
				{this.props.category.alias === 'custom options' ? (
					<div>
						{filteredCategories.map((item, index) => (
							<CustomOptions
								width={this.props.width}
								length={this.props.length}
								key={index}
								addCustomRoofPitch={this.props.addCustomRoofPitch.bind(this)}
								category={item}
								addItem={this.props.addItem}
								addSoffit={this.props.addSoffit}
								roofPitch={this.props.roofPitch}
								overhang={this.props.overhang}
							/>
						))}
					</div>
				) : (
					filteredCategories.map((item) => (
						<div key={item.name}>
							{item.description} <b>${item.price}</b>{' '}
							<button
								className="select-button"
								onClick={() => this.props.addItem(item, this.state[item.name])}
							>
								add
							</button>
							<label htmlFor="qty">Qty</label>
							<input
								id="qty"
								style={{ width: '20px' }}
								type="text"
								value={this.state[item.name]}
								name={item.name}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
					))
				)}
			</div>
		);
	}
}
