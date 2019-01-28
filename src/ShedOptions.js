import React, { Component } from 'react';
import { inventory } from './InventoryService';

export default class ShedOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			basePrice: 0,
			totalPrice: 0,
			items: [],
			paintPrice: 0,
			paint: false,
			shedWidth: 0,
			shedLength: 0
		};
	}
	componentWillMount() {
		const shed = inventory.filter((shed) => shed.name === this.props.match.params.shedCode);
		const items = this.state.items;
		items.push(this.props.match.params.shedCode);
		const codeArray = this.props.match.params.shedCode.split('');
		const joinedWidth = codeArray[0] + codeArray[1];
		const joinedLength = codeArray[2] + codeArray[3];
		const shedWidth = Number(joinedWidth);
		const shedLength = Number(joinedLength);
		this.setState({
			basePrice: +shed[0].price,
			totalPrice: this.state.totalPrice + +shed[0].price,
			items,
			shedWidth,
			shedLength
		});
	}

	render() {
		return (
			<div>
				<div>Price: {'$' + this.state.totalPrice}</div>
				<label htmlFor="paint">Add 2 Tone Paint</label>
				<input onChange={() => this.togglePaintSelect()} type="checkbox" id="paint" />
			</div>
		);
	}
	PaintShed() {
		let totalPrice = this.state.totalPrice;
		totalPrice += this.state.basePrice * 0.12;
		const items = this.state.items;
		items.push('PAINT');
		this.setState({
			items,
			totalPrice,
			paintPrice: this.state.basePrice * 12
		});
	}
	togglePaintSelect() {
		if (this.state.paint) {
			const items = this.state.items;
			const index = items.indexOf('PAINT');
			Array.prototype.remove = function() {
				var what,
					a = arguments,
					L = a.length,
					ax;
				while (L && this.length) {
					what = a[--L];
					while ((ax = this.indexOf(what)) !== -1) {
						this.splice(ax, 1);
					}
				}
				return this;
			};
			this.setState({
				paint: false,
				paintPrice: 0,
				totalPrice: this.state.totalPrice - this.state.basePrice * 0.12,
				items: items.remove('PAINT')
			});
		} else {
			this.setState({ paint: true }, this.PaintShed());
		}
	}
}
