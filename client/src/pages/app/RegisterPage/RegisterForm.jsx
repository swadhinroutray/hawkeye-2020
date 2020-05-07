import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import loginStore from '../../../models/app/LoginModel';
import { LoginFormWrapper } from '../LoginPage/LoginForm';
import ReactRecaptcha from 'react-google-recaptcha';
const RegisterForm = inject('registerStore')(
	observer(({ registerStore }) => {
		const recaptchaRef = React.createRef();
		return (
			<LoginFormWrapper className="register">
				<h1 className="login-head">REGISTER</h1>

				<div className="input-field">
					<input
						type="text"
						placeholder="Name"
						required={true}
						onChange={e => registerStore.setField('name', e.target.value)}
						// value={registerStore['name'].value}
					/>
					<div className="error">{registerStore['name'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="text"
						placeholder="Username"
						required={true}
						onChange={e => registerStore.setField('username', e.target.value)}
						// value={registerStore['username'].value}
					/>
					<div className="error">{registerStore['username'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="email"
						placeholder="Email Id"
						required={true}
						onChange={e =>
							registerStore.setField('email', e.target.value.trim())
						}
						// value={registerStore['email'].value}
					/>
					<div className="error">{registerStore['email'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="password"
						placeholder="Password"
						required={true}
						onChange={e => registerStore.setField('password', e.target.value)}
						// value={registerStore['password'].value}
					/>
					<div className="error">{registerStore['password'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="password"
						placeholder="Confirm Password"
						required={true}
						onChange={e =>
							registerStore.setField('confirmPass', e.target.value)
						}
						// value={registerStore['confirmPass'].value}
					/>
					<div className="error">{registerStore['confirmPass'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="text"
						placeholder="Mobile No."
						required={true}
						onChange={e => registerStore.setField('mobile', e.target.value)}
					/>
					<div className="error">{registerStore['mobile'].error}</div>
				</div>
				<div className="input-field">
					<select
						name="college"
						defaultValue="Select College"
						onChange={e => registerStore.setField('college', e.target.value)}
					>
						<option value="Select College" disabled>
							Select College
						</option>
						<option value="MIT">MIT</option>
						<option value="Other Colleges">Other Colleges</option>
					</select>
					<div className="error">{registerStore['college'].error}</div>
				</div>
				<ReactRecaptcha
					ref={recaptchaRef}
					sitekey={'6Lf0ufMUAAAAAARbazyMdgyepVH2eNxh6u-XZ_k0'}
					onChange={value => {
						registerStore.setToken(value);
					}}
				/>
				<button onClick={() => registerStore.register()}>Submit</button>
				<div
					style={{ overflowWrap: 'break-word', width: '90%' }}
					className="message"
				>
					{registerStore['message'].value}
				</div>
				<Link className="link-register" to="/login">
					Back to login
				</Link>
				{loginStore.loggedIn ? <Redirect to="/" /> : null}
				{registerStore.successful ? <Redirect to="/login" /> : null}
			</LoginFormWrapper>
		);
	}),
);

export default RegisterForm;
