import React from 'react';
import { Switch } from 'react-router';
import  RegisterPage  from '../pages/app/RegisterPage/RegisterPage';
import LoginPage from '../pages/app/LoginPage/LoginPage';
import { Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from '../models/app/LoginModel'

const AppRouter = ({ match }) => {
	return (
		 <Provider loginStore={store}>
		<Switch>
			<Route path={'/register'} component={RegisterPage}></Route>
			<Route path={'/login'} component={LoginPage}></Route>
		</Switch>
		</Provider>
	);
};

export { AppRouter };
