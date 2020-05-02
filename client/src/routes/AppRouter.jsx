import React from 'react';
import { Switch, Redirect } from 'react-router';
import { RegisterPage } from '../pages/app/RegisterPage/RegisterPage';
import LoginPage from '../pages/app/LoginPage/LoginPage';
import Game from '../pages/app/Game/Game';
import { Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { LandingPage } from '../pages/app/LandingPage';
import store from '../models/app/LoginModel';
import ShopStore from '../models/app/ShopModel';
import { ShopPage } from '../pages/app/ShopPage/ShopPage';
import { ForgotPass } from '../pages/app/ForgotAndReset/ForgotPass';
import { ResetPass } from '../pages/app/ForgotAndReset/ResetPass';
import AddQuestion from '../pages/app/Admin/AddQuestion';
import AddHints from '../pages/app/Admin/AddHints';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import Leaderboard from '../pages/app/Admin/Leaderboard';

const AppRouter = ({ match }) => {
	return (
		<Provider loginStore={store} shopStore={ShopStore}>
			<Switch>
				<Route path={'/register'} component={RegisterPage}></Route>
				<Route path={'/login'} component={LoginPage}></Route>
				<Route path={'/forgot'} component={ForgotPass}></Route>
				<Route path={'/reset'} component={ResetPass}></Route>
				<PrivateRoute path={'/game/:id'} component={Game}></PrivateRoute>
				<PrivateRoute path={'/shop'} component={ShopPage}></PrivateRoute>
				<PrivateRoute path={'/regions'} component={LandingPage}></PrivateRoute>
				<AdminRoute path={'/admin/addquestion'} component={AddQuestion}></AdminRoute>
				<AdmintRoute path={'/admin/addhints'} component={AddHints}></AdmintRoute>
				<AdminRoute path={'/admin/leaderboard'} component={Leaderboard}></AdminRoute>
				<Route exact path={'/'} component={LoginPage}></Route>
			</Switch>
		</Provider>
	);
};

export { AppRouter };
