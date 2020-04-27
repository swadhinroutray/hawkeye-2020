import React, { useEffect,useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

export const LoginForm = inject('loginStore')(
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
			<LoginFormWrapper>
				<h1 className="login-head">LOGIN</h1>
				<div className="form">
					<Field required name="email" placeholder="Email" />
					<Field
						required
						type="password"
						name="password"
						placeholder="Password"
					/>
					<button className="btn-login" onClick={() => loginStore.login()}>
						Login
					</button>
				</div>
				<Link className="link-register" to="/register">
					Create an account
				</Link>
				<Link className="link-forgot" to="/forgot">
					Forgot Password
				</Link>
				{loginStore.loggedIn ? <Redirect to="/regions" /> : null}
			</LoginFormWrapper>
		);
	}),
);

export const Field = inject('loginStore')(
	observer(
		({ loginStore, type = 'text', name, required = false, ...restProps }) => (
			<div required={required}>
				<input
					type={type}
					name={name}
					value={loginStore.formData[name].value}
					{...restProps}
					onChange={e => loginStore.setField(name, e.target.value)}
				/>
				<span>{loginStore.formData[name].error}</span>
			</div>
		),
	),
);

export const LoginFormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60vw;
	margin: 5% 19vw;
	border: 3px solid #3abdb7;
	padding: 2vh 1vw;
	font-size: 1.3rem;

	input {
		background: none;
		border: none;
		border-bottom: 1px solid #ccc;
		border-radius: 5px;
		margin-top: 0.3rem;
		margin-bottom: 1rem;
		width: 50vw;
		font-size: 1.3rem;
		:hover {
			border-bottom: 1px solid #3abdb7;
		}
		:focus {
			border-bottom: 1px solid #3abdb7;
		}
	}

	button {
		border: none;
		border: 3px solid #3abdb7;
		background: none;
		font-size: 1.3rem;
		padding: 0.2rem 0.8rem;
	}
	.link-register,
	.link-forgot {
		margin-top: 1rem;
	}
	@media only screen and (max-device-width: 1048px) {
		width: 90vw;
		margin: 5% 5vw;
		padding: 0 0;
		padding-bottom: 3vh;
		input {
			width: 80vw;
		}
	}
`;
