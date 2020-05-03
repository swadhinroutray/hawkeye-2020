import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginStore from '../models/app/LoginModel';

export const AdminRoute = observer(({ component: Component }) => {
	return (
		<Route
			render={props =>
				LoginStore.profileSetError && !LoginStore.loggedIn && !LoginStore.profile.access==1 ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		></Route>
	);
});
