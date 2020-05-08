import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ShopHud from '../../../assets/ShopHud.svg';
import ButtonBox from '../../../assets/ButtonBox.svg';

export const LoginForm = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimarCheck] = useState(false);
		useEffect(() => {
			if (!primaryCheck) {
				setPrimarCheck(true);
				loginStore.getProfile();
				loginStore.clearErrors();
			}

			loginStore.clearErrors();
		}, [loginStore, primaryCheck]);
		document.addEventListener('keyup', event => {
			if (event.keyCode === 13) {
				loginStore.login();
			}
		});
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
				<div className="error">{loginStore.formData[name].error}</div>
			</div>
		),
	),
);

export const LoginFormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40vw;

	padding: 4vh 1vw;
	font-size: 1rem;
	background: url(${ShopHud}) center center;
	background-size: 100% 100%;
	input {
		background: none;
		border: none;
		border-bottom: 1px solid #ccc;
		border-radius: 5px;
		margin-top: 0.3rem;
		margin-bottom: 1rem;
		width: 30vw;
		font-size: 1rem;
		padding: 0.5rem;
		background-color: Transparent;
		border-right: 5px solid #7fd1e0;
		border-left: 5px solid #7fd1e0;
		border-top: 1px solid #7fd1e0;
		border-bottom: 1px solid #7fd1e0;
		:hover {
			border-bottom: 1px solid #3abdb7;
		}
		:focus {
			border-bottom: 1px solid #3abdb7;
		}
	}
	
	
	select {
		width: 32vw;
		border-radius: 5px;
		margin-top: 0.3rem;
		margin-bottom: 1rem;
		:-moz-focusring{
			color: transparent;
    		text-shadow: 0 0 0 #7fd1e0;
		}
		background-color: transparent;
		border-right: 5px solid #7fd1e0;
		border-left: 5px solid #7fd1e0;
		border-top: 1px solid #7fd1e0;
		border-bottom: 1px solid #7fd1e0;
		padding: 0.5rem;
		font-size: 1rem;
		-webkit-appearance: none;
		-moz-appearance: none;
		box-sizing: border-box;
	}

	button {
		:focus {
  outline: none;
  box-shadow: none;
}
		border: none;
		-webkit-user-select: none;
		color: #fff;
		-ms-user-select: none;
		user-select: none;
		background: url(${ButtonBox}) center center;
		background-size: 100% 100%;
		font-size: 1rem;
		padding: 0.8rem 1.4rem;
		:hover {
			cursor: pointer;
		}
	}
	.link-register,
	.link-forgot {
		margin-top: 1rem;
	}
	.error{
		color: #EF1C00;
	}
	@media (max-width: 1048px) {
		width: 90vw;
		margin: 0 5vw;
		padding: 0 0;
		padding-bottom: 3vh;
		input {
			width: 70vw;
		}
		select{
			width:72vw;
		}
	}
`;
