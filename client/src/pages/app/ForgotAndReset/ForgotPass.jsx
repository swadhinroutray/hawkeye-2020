import React, { useEffect } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Field, LoginFormWrapper } from '../LoginPage/LoginForm';
import { LoginPageWrapper } from '../LoginPage/LoginPage';

export const ForgotPass = inject('loginStore')(
	observer(({ loginStore }) => {
		useEffect(() => {
			loginStore.clearErrors();
		}, []);
		return (
			<LoginPageWrapper>
				<h1 className="hawkeye">Hawkeye</h1>

				{loginStore.forgotEmailSent ? (
					<LoginFormWrapper>
						<Email>A recovery link has been sent to your email.</Email>
					</LoginFormWrapper>
				) : (
					<LoginFormWrapper>
						<h1 className="login-head">Forgot Password</h1>
						{loginStore.isForgotLoading ? (
							'Loading...'
						) : (
							<form
								onSubmit={e => {
									e.preventDefault();
									loginStore.forgotPassword();
								}}
							>
								<Field required name="email" placeholder="Email" />
								<button className="btn-login" type="submit">
									Submit
								</button>
							</form>
						)}
					</LoginFormWrapper>
				)}
			</LoginPageWrapper>
		);
	}),
);

const Email = styled.div`
	text-align: center;
	margin-top: 20px;
`;
