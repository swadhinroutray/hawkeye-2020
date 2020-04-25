import React from 'react';
import { Switch } from 'react-router';
import { RegisterPage } from '../pages/app/RegisterPage/RegisterPage';
import LoginPage from '../pages/app/LoginPage/LoginPage';
import Game from '../pages/app/Game/Game';
import { Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { LandingPage } from '../pages/app/LandingPage';
import store from '../models/app/LoginModel';
import ShopStore from '../models/app/ShopModel';
import { ShopPage } from '../pages/app/ShopPage/ShopPage';

const AppRouter = ({ match }) => {
	return (
		<Provider loginStore={store} shopStore={ShopStore}>
			<Switch>
				<Route path={'/register'} component={RegisterPage}></Route>
				<Route path={'/login'} component={LoginPage}></Route>
				<Route path={'/home'} component={LandingPage}></Route>
				<Route path={'/game/:id'} component={Game}></Route>

				<Route path={'/shop'} component={ShopPage}></Route>
				<Route path={'/'} component={LandingPage}></Route>
			</Switch>
		</Provider>
	);
};

export { AppRouter };
