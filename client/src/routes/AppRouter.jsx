import React from 'react';
import { Switch } from 'react-router';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { Route } from 'react-router-dom';

const AppRouter = ({ match }) => {
	return (
		// <Provider>
		<Switch>
			<Route path={'/register'} component={RegisterPage}></Route>
		</Switch>
		// </Provider>
	);
};

export { AppRouter };
