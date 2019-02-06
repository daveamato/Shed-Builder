import React from 'react';

export default function EstimateItems(props) {
	const items = props.items.map((item) => JSON.parse(item));
	const totals = items.map((item) => item.price * item.qty);
	return (
		<div className="table-container">
			<table className="items-table" border="0">
				<tbody>
					<tr className="table-header">
						<th>DATE</th>
						<th>ITEM CODE</th>
						<th width="50%">DESCRIPTION</th>
						<th>QTY</th>
						<th>RATE</th>
						<th>AMOUNT</th>
					</tr>
					{items.map((item) => (
						<tr key={item.name}>
							<td>02/02/19</td>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{item.qty}</td>
							<td>{Number(item.price).toFixed(2)}</td>
							<td>{(item.qty * item.price).toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<hr className="end-of-items" />
			<div className="total">
				<span>TOTAL</span>
				<b className="total-price">${totals.reduce((a, b) => a + b).toFixed(2)}</b>
			</div>
		</div>
	);
}
