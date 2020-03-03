import React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const RegisterFormWrapper = styled.div`
	color: #fff;
	border: 3px solid #31bfb8;
	position: absolute;
	width: 90%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 0;
	font-family: 'Nidus Sans';

	.header {
		margin: 0.5em auto 0em;
		font-weight: 300;
		letter-spacing: 0.2em;
	}
	.subhead {
		margin: 0 auto 1em;
		font-weight: 100;
	}

	.input-field {
		::after {
			${({ required }) =>
				required &&
				css`
					content: '*';
				`}
			position: absolute;
			top: 1.1em;
			right: 1em;
			color: #fa507b;
		}

		input {
			all: unset;
			box-sizing: border-box;
			padding: 0.5em 0.6em;
			width: 90%;
			font-family: 'Share Tech';
			text-align: left;
			border-bottom: 1px solid #ccc;
			border-radius: 5px;
			margin: auto;
			color: rgb(196, 253, 250);
			font-weight: 100;
			font-size: 13px;
			:focus {
				border-bottom: 2.5px solid #31bfb8;
				color: #31bfb8;
				background: none;
			}
			::placeholder {
				color: rgba(196, 253, 250, 0.49);
			}
		}
	}
	span {
		margin-top: 2px;
		font-size: 0.8em;
		min-height: 1.1em;
		user-select: none;
		color: #fa507b;
	}
	button {
		all: unset;
		width: 20%;
		text-align: center;
		border: 2px solid #31bfb8;
		border-radius: 5px;
		padding: 0.5em 1em;
		margin-top: 1em;
		color: #31bfb8;

		:hover {
			cursor: pointer;
			background-color: #31bfb8;
			color: #fff;
		}
	}
	.link-register {
		text-decoration: none;
		color: rgba(67, 193, 187, 0.4);
		display: block;
		font-size: 12px;
		margin: 0.3em;
		padding: 0;
	}
`;
const RegisterForm = inject('registerStore')(
	observer(({ registerStore }) => (
		<RegisterFormWrapper>
			<h1 className="header">REGISTER</h1>
			<h6 className="subhead">Create a new account</h6>

			<div className="input-field">
				<input
					type="text"
					placeholder="Name"
					required={true}
					onChange={e => registerStore.setField('name', e.target.value)}
					// value={registerStore['name'].value}
				/>
				<span>{registerStore['name'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="text"
					placeholder="Username"
					required={true}
					onChange={e => registerStore.setField('username', e.target.value)}
					// value={registerStore['username'].value}
				/>
				<span>{registerStore['username'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="email"
					placeholder="Email Id"
					required={true}
					onChange={e => registerStore.setField('email', e.target.value)}
					// value={registerStore['email'].value}
				/>
				<span>{registerStore['email'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="password"
					placeholder="Password"
					required={true}
					onChange={e => registerStore.setField('password', e.target.value)}
					// value={registerStore['password'].value}
				/>
				<span>{registerStore['password'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="password"
					placeholder="Confirm Password"
					required={true}
					onChange={e => registerStore.setField('confirmPass', e.target.value)}
					// value={registerStore['confirmPass'].value}
				/>
				<span>{registerStore['confirmPass'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="text"
					placeholder="Mobile No."
					required={true}
					onChange={e => registerStore.setField('mobile', e.target.value)}
				/>
				<span>{registerStore['mobile'].error}</span>
			</div>
			<div className="input-field">
				<input
					type="text"
					placeholder="College"
					onChange={e => registerStore.setField('college', e.target.value)}
					// value={registerStore['college'].error}
				/>
				<span>{registerStore['college'].error}</span>
			</div>
			<button onClick={() => registerStore.register()}>SUBMIT</button>
			<span className="message">{registerStore['message'].value}</span>
			<Link className="link-register" to="/app/login">
				Back to login
			</Link>
		</RegisterFormWrapper>
	)),
);

export default RegisterForm;
