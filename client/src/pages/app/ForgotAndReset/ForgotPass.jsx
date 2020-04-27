import React, { useEffect ,useState} from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Field, LoginFormWrapper } from '../LoginPage/LoginForm';
import { LoginPageWrapper } from '../LoginPage/LoginPage';
import { Redirect } from 'react-router-dom';
export const ForgotPass = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck,setPrimarCheck]=useState(false)
		useEffect(() => {
			if(!primaryCheck){
				setPrimarCheck(false)
			loginStore.getProfile()

		}
			loginStore.clearErrors();
		}, [loginStore]);
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
						{loginStore.loggedIn ? <Redirect to="/" /> : null}
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
