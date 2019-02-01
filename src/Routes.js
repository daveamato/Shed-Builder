import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SizeSelector from './views/StyleSelect/StyleSelect';
import ShedOptions from './views/ShedOptions/ShedOptions';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route path="/options/:shedCode" component={ShedOptions} />
				<Route path="/" component={SizeSelector} />
			</Switch>
		</div>
	);
}
