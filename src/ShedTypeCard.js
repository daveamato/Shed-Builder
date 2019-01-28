import React from 'react';
import SizeSelector from './SizeSelector';
export default function ShedTypeCard(props) {
	return (
		<div>
			<h2>{props.shed.name}</h2>
			<img src={props.shed.image} alt={props.shed.name} />
			<p>{props.shed.description}</p>
			<button onClick={props.setShedType}>Select</button>
			{props.shedType === props.shed.type ? (
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
			{props.shedType === props.shed.type && props.series !== '' ? (
				<SizeSelector handleChange={props.handleChange.bind(this)} />
			) : null}
		</div>
	);
}
