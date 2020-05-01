import React, { useEffect ,useState} from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Field, LoginFormWrapper } from '../LoginPage/LoginForm';
import { LoginPageWrapper } from '../LoginPage/LoginPage';
import { Redirect } from 'react-router-dom';
import HAWK from '../../../assets/HAWK.svg'
import iecse from '../../../assets/iecse.svg'
export const ForgotPass = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck,setPrimarCheck]=useState(false)
		useEffect(() => {
			if(!primaryCheck){
				setPrimarCheck(true)
			loginStore.getProfile()

		}
			loginStore.clearErrors();
		}, [loginStore]);
		return (
			<LoginPageWrapper>
				<div id="headers">
					<img id="hawklogo" src={HAWK} alt="Hawk"/>
				<div className="hawkeye">Hawkeye</div>
				<a href="https://iecsemanipal.com/"><img id="iecselogo" src={iecse} alt="iecse"/></a>
				</div>

				{loginStore.forgotEmailSent ? (
					<LoginFormWrapper>
						<Email>A recovery link has been sent to your email.</Email>
					</LoginFormWrapper>
				) : (<div id="loginStuff">
					<LoginFormWrapper >
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
					</div>
				)}
			</LoginPageWrapper>
		);
	}),
);

const Email = styled.div`
	text-align: center;
	margin-top: 20px;
`;
