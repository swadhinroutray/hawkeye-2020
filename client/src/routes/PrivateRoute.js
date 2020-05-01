import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginStore from '../models/app/LoginModel';

export const PrivateRoute = observer(({ component: Component }) => {
	return (
		<Route
			render={props =>
				LoginStore.profileSetError && !LoginStore.loggedIn ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		></Route>
	);
});
