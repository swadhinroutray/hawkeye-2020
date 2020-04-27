import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Unimplemented from '../pages/admin/Unimplemented'
const AdminRouter = ({ match }) => {
	return (
		<div>
			<Switch>
				<Route path={'/'} component={Unimplemented}></Route>
				
			</Switch>
            </div>
	);
};
export default AdminRouter