import React from 'react';

export default function SizeSelector(props) {
	return (
		<div>
			<label htmlFor="size"> Select Size:</label>
			<select name="size" id="size" onChange={(e) => props.handleChange(e.target.value, 'size')}>
				<option value="" />
				<option value="0606">6'X6'</option>
				<option value="0608">6'X8'</option>
				<option value="0610">6'X10'</option>
				<option value="0612">6'X12'</option>
				<option value="0808">8'X8'</option>
				<option value="0810">8'X10'</option>
				<option value="0812">8'X12'</option>
				<option value="0814">8'X14'</option>
				<option value="0816">8'X16'</option>
				<option value="1010">10'X10'</option>
				<option value="1012">10'X12'</option>
				<option value="1014">10'X14'</option>
				<option value="1016">10'X16'</option>
				<option value="1020">10'X20'</option>
				<option value="1212">12'X12'</option>
				<option value="1214">12'X12'</option>
				<option value="1216">12'X16'</option>
				<option value="1218">12'X18'</option>
				<option value="1224">12'X24'</option>
				<option value="1228">12'X28'</option>
				<option value="1232">12'X32'</option>
			</select>
		</div>
	);
}
