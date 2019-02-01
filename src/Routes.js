import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SizeSelector from './views/StyleSelect/StyleSelect';
import ShedOptions from './views/ShedOptions/ShedOptions';
import Login from './views/login/Login';
import dashbord from './views/dashboard/dashboard';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route path="/options/:shedCode" component={ShedOptions} />
				<Route path="/login" component={Login} />
				<Route path="/dashboard" component={dashbord} />
				<Route path="/" component={SizeSelector} />
			</Switch>
		</div>
	);
}
