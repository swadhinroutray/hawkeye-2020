import React from 'react';
import styled from 'styled-components';

export const ForgotPasswordPage = () => {
	return (
		<Wrapper>
			<h1>Forgot Password</h1>
			<form>
				<div>Enter your email address</div>
				<input type="email" placeholder="Enter your email" />
				<button type="submit" name="recover">
					Recover
				</button>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	color: white;
	padding: 5%;
	text-align: center;
`;
