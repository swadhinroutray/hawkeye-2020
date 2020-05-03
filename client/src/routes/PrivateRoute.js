import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import loginStore from '../models/app/LoginModel';

export const PrivateRoute = inject('loginStore')(
	observer(({ component: Component, ...rest }) => {
		return (
			<Route
			render={props =>
				loginStore.profileSetError && !loginStore.loggedIn ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		></Route>
		);
	}),
);
