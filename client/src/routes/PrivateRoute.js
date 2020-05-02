import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import loginStore from '../models/app/LoginModel';

export const PrivateRoute = inject('loginStore')(
	observer(({ component: Component, ...rest }) => {
		return (
			<Route
				{...rest}
				render={props =>
					loginStore.loggedIn ? (
						<Component {...props} />
					) : (
						<Redirect to="/login" />
					)
				}
			></Route>
		);
	}),
);
