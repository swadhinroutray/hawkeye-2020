import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';

 const LoginPage = () => {
	return (
		<LoginPageWrapper>
			<h1 className="hawkeye">Hawkeye</h1>
			<LoginForm />
		</LoginPageWrapper>
	);
};

export const LoginPageWrapper = styled.div`
height: 100vh;
text-align: center;
.hawkeye{
	font-family: 'Nidus Sans';
	font-size:3.2rem;
	font-weight: 400;
	letter-spacing:0.1em;
	color: white
}
.login-head {
	font-family: 'Nidus Sans';
	color: white;
	font-size:2rem;
	letter-spacing:0.1em;
	font-weight: 400;
}
`;
export default LoginPage