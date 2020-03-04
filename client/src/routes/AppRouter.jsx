import React from 'react';
import { Switch } from 'react-router';
import  {RegisterPage}  from '../pages/app/RegisterPage/RegisterPage';
import LoginPage from '../pages/app/LoginPage/LoginPage';
import Game from '../pages/app/Game/Game'
import { Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import store from '../models/app/LoginModel'

const AppRouter = ({ match }) => {
	return (
		 <Provider loginStore={store}>
		<Switch>
			<Route path={'/register'} component={RegisterPage}></Route>
			<Route path={'/login'} component={LoginPage}></Route>
			<Route path={'/game/:id'} component={Game}></Route>
		</Switch>
		</Provider>
	);
};

export { AppRouter };
