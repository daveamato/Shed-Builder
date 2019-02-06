import React from 'react';
import SizeSelector from './SizeSelector';
export default function ShedTypeCard(props) {
	return (
		<div className="shed-card">
			<h2>{props.shed.name}</h2>
			<img src={props.shed.image} className="shed-style-image" alt={props.shed.name} /> <br />
			<i className="style-description">{props.shed.description}</i> <br />
			<button onClick={props.setShedType} className="select-button">
				Select
			</button>
			{props.shedType === props.shed.type && props.shed.type !== 'VA' ? (
				<div>
					<label htmlFor="classic"> Classic Series (24" On Center Studs)</label>
					<input
						type="radio"
						name="series"
						id="classic"
						value="C"
						onChange={(e) => props.handleChange(e.target.value, 'series')}
					/>
					<br />
					<label htmlFor="premium"> Premium Series (16" On Center Studs)</label>
					<input
						type="radio"
						name="series"
						id="premium"
						value="P"
						onChange={(e) => props.handleChange(e.target.value, 'series')}
					/>
				</div>
			) : null}
			{(props.shedType === props.shed.type && props.series !== '') ||
			(props.shedType === props.shed.type && props.shedType) === 'VA' ? (
				<SizeSelector handleChange={props.handleChange.bind(this)} />
			) : null}
		</div>
	);
}
