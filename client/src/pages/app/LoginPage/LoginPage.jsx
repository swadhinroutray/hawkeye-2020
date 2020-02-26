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
	min-height: 100vh;	
`;
export default LoginPage