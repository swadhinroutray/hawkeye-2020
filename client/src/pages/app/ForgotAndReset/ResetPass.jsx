import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { LoginFormWrapper } from '../LoginPage/LoginForm';
import { LoginPageWrapper } from '../LoginPage/LoginPage';
import { observer, inject } from 'mobx-react';
import { Link,Redirect } from 'react-router-dom';
import HAWK from '../../../assets/HAWK.svg'
import iecse from '../../../assets/iecse.svg'
export const ResetPass = inject('loginStore')(
	observer(({ loginStore, location }) => {
		const [primaryCheck,setPrimarCheck]=useState(false)
		useEffect(() => {
			if(!primaryCheck){
				setPrimarCheck(true)
			loginStore.getProfile()

		}
			loginStore.clearErrors();
		}, [loginStore,primaryCheck]);
		return (
			<LoginPageWrapper >
				<div id="headers">
					<img id="hawklogo" src={HAWK} alt="Hawk"/>
				<div className="hawkeye">HAWKEYE</div>
				<a href="https://iecsemanipal.com/"><img id="iecselogo" src={iecse} alt="iecse"/></a>
				</div>
				{loginStore.resetSuccess ? (
					<div id="loginStuff">
					<LoginFormWrapper >
					
						<ResetConfirmation>Your Password has been reset!</ResetConfirmation>
						<Link to="/login" style={{ textDecoration: 'none' }}>
							<LoginLink>Back To Login</LoginLink>
						</Link>
						
					</LoginFormWrapper>
					</div>
				) : (
					<div id="loginStuff">
					<LoginFormWrapper >
						<h1 className="login-head">Reset Password</h1>
						<form
							onSubmit={e => {
								let params = new URLSearchParams(location.search);
								let token = params.get('token');
								e.preventDefault();
								loginStore.resetPassword(token);
							}}
						>
							<div className="form">
								<input
									type="password"
									required
									name="resetPassword"
									placeholder="Password"
									onChange={e =>
										loginStore.setPassword('resetPassword', e.target.value)
									}
								/>
								<div>{loginStore.resetForm.resetPassword.error}</div>
								<input
									type="password"
									required
									name="confirmPassword"
									placeholder="Confirm Password"
									onChange={e =>
										loginStore.setPassword('confirmPassword', e.target.value)
									}
								/>
								<div>{loginStore.resetForm.confirmPassword.error}</div>
								<div>{loginStore.passwordError}</div>

								{loginStore.isResetLoading ? (
									<button className="btn-login">Loading..</button>
								) : (
									<button className="btn-login" type="submit">
										Submit
									</button>
								)}
								<Link to="/login" >
					<div>	Back To Login</div>	
						</Link>
							</div>
						</form>
					</LoginFormWrapper>
					</div>
				)}
				{loginStore.loggedIn ? <Redirect to="/" /> : null}
			</LoginPageWrapper>
		);
	}),
);

const ResetConfirmation = styled.div`
	text-align: center;
	margin-top: 20px;
	width:90%;
	overflow-wrap:break-word;
`;
export const LoginLink = styled.div`
	margin-top: 10px;
	border: 2px solid #3abdb7;
	padding: 8px 12px;
`;
