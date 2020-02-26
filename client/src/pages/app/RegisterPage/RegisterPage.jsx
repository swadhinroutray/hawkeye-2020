import React from 'react';
import styled from 'styled-components';
import store from '../../../models/app/RegisterModel';
import RegisterForm from './RegisterForm';
import { Provider } from 'mobx-react';

const RegisterPageWrapper = styled.div`
	height: 100vh;
	text-align: center;
	h1 {
		font-family: 'Nidus Sans';
		color: white;
		letter-spacing: 0.1em;
		font-weight: 400;
	}
`;

export const RegisterPage = () => (
	<RegisterPageWrapper>
		<h1>Hawkeye</h1>
		<Provider registerStore={store}>
			<RegisterForm />
		</Provider>
	</RegisterPageWrapper>
);
