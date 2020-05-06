import React from 'react';
import store from '../../../models/app/RegisterModel';
import RegisterForm from './RegisterForm';
import { Provider } from 'mobx-react';
import { LoginPageWrapper } from '../LoginPage/LoginPage';
import HAWK from '../../../assets/HAWK.svg';
import iecse from '../../../assets/iecse.svg';
import Face from '../../../assets/Face.svg';
import Finger from '../../../assets/Finger.svg';

export const RegisterPage = () => (
	<LoginPageWrapper>
		<div id="headers" className="RegisterHeaders">
			<img id="hawklogo" src={HAWK} alt="Hawk" />
			<div className="hawkeye">HAWKEYE</div>
			<a href="https://iecsemanipal.com/">
				<img id="iecselogo" src={iecse} alt="iecse" />
			</a>
		</div>
		<div id="loginStuff">
			<img id="finger" src={Finger} alt="Finger" />
			<Provider registerStore={store}>
				<RegisterForm />
			</Provider>

			<img id="face" src={Face} alt="Face" />
		</div>
	</LoginPageWrapper>
);
