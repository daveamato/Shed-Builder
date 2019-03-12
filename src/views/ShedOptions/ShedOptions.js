import React, { Component } from 'react';
import { inventory } from '../../InventoryService';
import { OptionCategories } from './OptionCategories';
import SpecificOptions from './SpecificOptions';
import Modal from 'react-modal';
import NavBar from '../NavBar/Navbar';
import CustomerInfo from './CustomerInfo';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ShedOptions.css';

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
			shedName: '',
			paint: false,
			shedWidth: 0,
			shedLength: 0,
			activeCategory: 'paint',
			showCart: false,
			overhang: 'none',
			roofPitch: '4/12 ',
			CustomerInfo: false,
			name: '',
			address: '',
			phone: '',
			email: '',
			state: '',
			city: '',
			zip: ''
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
		const shedName = shed[0].description;
		this.setState({
			basePrice: +shed[0].price,
			totalPrice: this.state.totalPrice + +shed[0].price,
			items,
			shedWidth,
			shedLength,
			shedName
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
		this.setState({ showCart: !this.state.showCart, activeCategory: 'none' });
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
			item.price = squareFootage * 3.5;
		} else if (string === '10/12 ') {
			item.price = squareFootage * 4.5;
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
			<div className="shed-options">
				<NavBar />
				<div className="options-header">
					<Link to="/">
						<button className="select-button">
							<i className="arrow" />Back
						</button>
					</Link>
					<b>{this.state.shedName}</b>
					<div className="total-container">
						<p className="price">
							<span id="total-price">{'$' + this.state.totalPrice.toFixed(2)}</span>
						</p>
						<button id="details" onClick={() => this.toggleShowCart()} className="select-button">
							Details
						</button>
					</div>
				</div>
				<h2
					className={this.state.activeCategory === 'paint' ? 'active-category' : 'inactive-category'}
					onClick={() => this.changeCategory('paint')}
				>
					Paint
				</h2>
				{this.state.activeCategory === 'paint' ? (
					<div className="scale-in-top custom-option-box" id="paint">
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
					<div key={cat.name} className="options-container">
						<h2
							className={
								this.state.activeCategory === cat.alias ? 'active-category' : 'inactive-category'
							}
							onClick={() => this.changeCategory(cat.alias)}
						>
							{cat.name}
						</h2>
						{this.state.activeCategory === cat.alias ? (
							<div className={cat.alias !== 'custom options' ? 'options-box' : 'custom-option-box'}>
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
							</div>
						) : null}
					</div>
				))}
				<Modal
					isOpen={this.state.showCart}
					contentLabel="Import Modal"
					style={customStyles}
					ariaHideApp={false}
				>
					<div className="cart-modal">
						<table>
							<tbody>
								<tr>
									<th>QTY</th>
									<th>Item</th>
									<th>Price</th>
								</tr>

								{this.state.items.map((item, index) => (
									<tr key={index}>
										<td>{item.qty}</td>
										<td>{item.description}</td>
										<td>${(item.qty * item.price).toFixed(2)}</td>
										<td>
											<i className="remove-item" onClick={() => this.removeItem(item, index)}>
												Remove
											</i>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="modal-total">
							total: <b>{'$' + this.state.totalPrice.toFixed(2)}</b>
						</div>
						<button className="select-button" onClick={() => this.toggleShowCart()}>
							Close
						</button>
					</div>
				</Modal>
				<Modal
					isOpen={this.state.CustomerInfo}
					contentLabel="Import Modal"
					style={customStyles}
					ariaHideApp={false}
				>
					<CustomerInfo
						handleChange={this.handleCustomerInfoChange.bind(this)}
						name={this.state.name}
						address={this.state.address}
						city={this.state.city}
						state={this.state.state}
						zip={this.state.zip}
						phone={this.state.phone}
						email={this.state.email}
						hideForm={this.toggleShowCustomerInfo.bind(this)}
						submitBid={this.submitBid.bind(this)}
					/>
				</Modal>
				<button className="select-button" onClick={() => this.toggleShowCustomerInfo()}>
					Get Bid
				</button>
			</div>
		);
	}
	PaintShed() {
		const items = this.state.items;
		if (this.state.paint) {
		} else {
			const findPaint = inventory.filter((item) => item.name === 'PAINT');
			const paint = findPaint[0];
			paint.price = this.state.basePrice * 0.12;
			paint.qty = 1;
			items.push(paint);
			this.setState({ items }, this.getTotalPrice());
		}
	}
	togglePaintSelect() {
		if (this.state.paint) {
			const items = this.state.items.filter((item) => item.name !== 'PAINT');

			return this.setState(
				{
					paint: false,
					items
				},
				() => this.getTotalPrice()
			);
		} else {
			this.setState({ paint: true }, this.PaintShed());
		}
	}
	handleCustomerInfoChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}
	toggleShowCustomerInfo() {
		this.setState({ CustomerInfo: !this.state.CustomerInfo, activeCategory: 'none' });
	}
	submitBid() {
		const { name, email, phone, address, city, state, zip, items } = this.state;
		const bid = { name, email, phone, address, city, state, zip, items };
		axios.post('/api/new-bid', bid).then(() => this.props.history.push('/'));
	}
}
