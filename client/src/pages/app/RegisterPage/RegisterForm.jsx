import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import loginStore from '../../../models/app/LoginModel'
import { LoginFormWrapper } from '../LoginPage/LoginForm'

const RegisterForm = inject('registerStore')(
	observer(({ registerStore }) => {

		const [primaryCheck, setPrimarCheck] = useState(false)
		useEffect(() => {
			if (!primaryCheck) {
				setPrimarCheck(true)
				loginStore.getProfile()

			}
			loginStore.clearErrors();
		}, [loginStore,primaryCheck]);
		return (

			<LoginFormWrapper class="register">
				<h1 className="login-head">REGISTER</h1>


				<div className="input-field">
					<input
						type="text"
						placeholder="Name"
						required={true}
						onChange={e => registerStore.setField('name', e.target.value)}
					// value={registerStore['name'].value}
					/>
					<div>{registerStore['name'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="text"
						placeholder="Username"
						required={true}
						onChange={e => registerStore.setField('username', e.target.value)}
					// value={registerStore['username'].value}
					/>
					<div>{registerStore['username'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="email"
						placeholder="Email Id"
						required={true}
						onChange={e => registerStore.setField('email', e.target.value)}
					// value={registerStore['email'].value}
					/>
					<div>{registerStore['email'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="password"
						placeholder="Password"
						required={true}
						onChange={e => registerStore.setField('password', e.target.value)}
					// value={registerStore['password'].value}
					/>
					<div>{registerStore['password'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="password"
						placeholder="Confirm Password"
						required={true}
						onChange={e => registerStore.setField('confirmPass', e.target.value)}
					// value={registerStore['confirmPass'].value}
					/>
					<div>{registerStore['confirmPass'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="text"
						placeholder="Mobile No."
						required={true}
						onChange={e => registerStore.setField('mobile', e.target.value)}
					/>
					<div>{registerStore['mobile'].error}</div>
				</div>
				<div className="input-field">
					<input
						type="text"
						placeholder="College"
						onChange={e => registerStore.setField('college', e.target.value)}
					// value={registerStore['college'].error}
					/>
					<div>{registerStore['college'].error}</div>
				</div>
				<button onClick={() => registerStore.register()}>Submit</button>
				<div className="message">{registerStore['message'].value}</div>
				<Link className="link-register" to="/login">
					Back to login
			</Link>
				{loginStore.loggedIn ? <Redirect to="/" /> : null}
				{registerStore.successful ? <Redirect to="/login" /> : null}

			</LoginFormWrapper>
		)
	}),
);

export default RegisterForm;
