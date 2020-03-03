import React from 'react';
import { Switch } from 'react-router';
import { Unimplemented } from '../components/Unimplemented';
import { Route } from 'react-router-dom';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { LandingPage } from '../pages/LandingPage';
const AppRouter = ({ match }) => {
	return (
		// <Provider>
		<Switch>
			<Route path={'/register'} component={Unimplemented}></Route>
			<Route path={'/forgotpassword'} component={ForgotPasswordPage}></Route>
			<Route path={'/home'} component={LandingPage}></Route>
		</Switch>
		// </Provider>
	);
};

export { AppRouter };
