import React, { Component } from 'react';
import { inventory } from './InventoryService';
import { OptionCategories } from './OptionCategories';
import SpecificOptions from './SpecificOptions';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
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
			shedLength: 0,
			activeCategory: 'paint',
			showCart: false,
			overhang: 'none',
			roofPitch: '4/12 '
		};
	}
	componentWillMount() {
		const shed = inventory.filter((shed) => shed.name === this.props.match.params.shedCode);
		const items = this.state.items;
		shed[0].qty = 1;
		items.push(shed[0]);
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
	changeCategory(activeCategory) {
		if (activeCategory === this.state.activeCategory) {
			this.setState({ activeCategory: null });
		} else {
			this.setState({ activeCategory });
		}
	}
	addItem(item, qty) {
		item.qty = qty;
		const items = this.state.items;
		const categories = items.map((item) => item.name);
		if (categories.includes('OHANG') && item.name === 'OHANG') {
			this.getTotalPrice();
		} else {
			items.push(item);
			this.setState({ items }, this.getTotalPrice());
		}
	}
	getTotalPrice() {
		const totals = this.state.items.map((item) => item.qty * item.price);
		const totalPrice = totals.reduce((a, b) => a + b);
		this.setState({ totalPrice });
	}
	addSoffit(item, overhang, string) {
		item.qty = 1;
		item.total = item.price;
		const items = this.state.items;
		const cartCategories = items.map((item) => item.category);
		const filteredItems = items
			.filter((item) => item.name !== 'OHANG')
			.filter((item) => item.category !== 'soffit');
		if (item.none === true) {
			return this.setState({ items: filteredItems, overhang: string }, () => this.getTotalPrice());
		}
		if (cartCategories.includes('soffit')) {
			const index = cartCategories.indexOf('soffit');
			if (item.name === 'OHANG') {
				items.splice(index, 1);
				this.setState({ items, overhang: string }, this.getTotalPrice());
			} else {
				items.splice(index, 1);
				items.push(item);
				this.setState({ items, overhang: string }, this.getTotalPrice());
			}
		} else {
			items.push(item);
			this.setState({ items, overhang: string }, this.addItem(overhang, 1));
		}
	}
	toggleShowCart() {
		this.setState({ showCart: !this.state.showCart });
	}
	removeItem(item, index) {
		const items = this.state.items;
		items.splice(index, 1);

		if (item.name === 'PAINT') {
			this.setState({ items, paint: false }, this.getTotalPrice());
		} else if (item.name === 'OHANG') {
			const filteredItems = items.filter((item) => item.category !== 'soffit');
			this.setState({ items: filteredItems }, this.getTotalPrice);
		} else {
			this.setState({ items }, this.getTotalPrice());
		}
	}
	addCustomRoofPitch(item, string) {
		item.description = string + item.description;
		const squareFootage = this.state.shedLength * this.state.shedWidth;
		const items = this.state.items;
		const filteredItems = items.filter((item) => item.name !== 'CPITCH');
		const categories = items.map((item) => item.name);
		if (string === '6/12 ') {
			item.price = squareFootage * 2.5;
		} else if (string === '8/12 ') {
			item.price = squareFootage * 4;
		} else if (string === '10/12 ') {
			item.price = squareFootage * 5;
		} else if (string === '4/12 ') {
			return this.setState({ roofPitch: string, items: filteredItems }, () => this.getTotalPrice());
		}
		if (categories.includes('CPITCH')) {
			const index = categories.indexOf('CPITCH');
			items.splice(index, 1);
			this.setState({ items, roofPitch: string }, this.addItem(item, 1));
		} else {
			this.setState({ roofPitch: string }, this.addItem(item, 1));
		}
	}
	render() {
		return (
			<div>
				<div>
					Price: {'$' + this.state.totalPrice} <span onClick={() => this.toggleShowCart()}>🛒</span>
				</div>
				{this.state.showCart ? (
					<Modal
						isOpen={this.state.showCart}
						contentLabel="Import Modal"
						style={customStyles}
						ariaHideApp={false}
					>
						{this.state.items.map((item, index) => (
							<div key={index}>
								{item.qty} {item.description} ${item.qty * item.price}{' '}
								<button onClick={() => this.removeItem(item, index)}>Remove</button>
							</div>
						))}
						<button onClick={() => this.toggleShowCart()}>Close</button>
					</Modal>
				) : null}
				<h2 onClick={() => this.changeCategory('paint')}>Paint</h2>
				{this.state.activeCategory === 'paint' ? (
					<div>
						<label htmlFor="paint">Add 2 Tone Paint</label>
						<input
							checked={this.state.paint}
							onChange={() => this.togglePaintSelect()}
							type="checkbox"
							id="paint"
						/>
					</div>
				) : null}
				{OptionCategories.map((cat) => (
					<div key={cat.name}>
						<h2 onClick={() => this.changeCategory(cat.alias)}>{cat.name}</h2>
						{this.state.activeCategory === cat.alias ? (
							<SpecificOptions
								width={this.state.shedWidth}
								length={this.state.shedLength}
								addCustomRoofPitch={this.addCustomRoofPitch.bind(this)}
								addItem={this.addItem.bind(this)}
								category={cat}
								addSoffit={this.addSoffit.bind(this)}
								overhang={this.state.overhang}
								roofPitch={this.state.roofPitch}
							/>
						) : null}
					</div>
				))}
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
