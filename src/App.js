import React, { Component } from 'react';
import './App.css';
import ShedTypeCard from './ShedTypeCard';
import { ShedTypes } from './shedTypesService';
import { inventory } from './InventoryService';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shedType: '',
			series: '',
			size: '',
			shedCode: '',
			basePrice: 0
		};
	}
	setShedType(name) {
		this.setState({ shedType: name });
	}
	handleChange(string, name) {
		if (name === 'size') {
			const style = this.state.shedType === 'VA' ? 'VA' : this.state.shedType + this.state.series;
			return this.setState({ size: string, shedCode: string + style }, () => this.getBasePrice());
		}
		this.setState({ [name]: string });
	}
	getBasePrice() {
		const shed = inventory.filter((shed) => shed.name === this.state.shedCode);
		this.setState({ basePrice: +shed[0].price });
	}
	render() {
		return (
			<div className="App">
				{ShedTypes.map((shed) => (
					<ShedTypeCard
						key={shed.name}
						shed={shed}
						shedType={this.state.shedType}
						series={this.state.series}
						setShedType={() => this.setShedType(shed.type)}
						handleChange={this.handleChange.bind(this)}
					/>
				))}
			</div>
		);
	}
}

export default App;
