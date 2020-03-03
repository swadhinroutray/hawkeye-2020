import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';

 const LoginPage = () => {
	return (
		<LoginPageWrapper>
			<LoginForm />
		</LoginPageWrapper>
	);
};

const LoginPageWrapper = styled.div`
height: 100vh;
text-align: center;
h1 {
	font-family: 'Nidus Sans';
	color: white;
	letter-spacing: 0.1em;
	font-weight: 400;
}
`;
export default LoginPage