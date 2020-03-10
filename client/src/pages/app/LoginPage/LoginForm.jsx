import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

export const LoginForm = inject('loginStore')(
	observer(({ loginStore }) => {
		useEffect(() => {
			loginStore.clearErrors();
		}, []);
		return (
			<LoginFormWrapper>
				<h1 className="hawkeye">Hawkeye</h1>
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
					<Link className="link-register" to="/app/register">
						Create an account
					</Link>
				</div>
				{loginStore.loggedIn ? <Redirect to="/app/game" /> : null}
			</LoginFormWrapper>
		);
	})
);
const FieldWrapper=styled.div`
`;
const Field = inject('loginStore')(
	observer(
		({
			loginStore,
			type = 'text',
			name,
			required = false,
			...restProps
		}) => (
			<FieldWrapper required={required}>
				<input
					type={type}
					name={name}
					value={loginStore.formData[name].value}
					{...restProps}
					onChange={e => loginStore.setField(name, e.target.value)}
				/>
				<span>{loginStore.formData[name].error}</span>
			</FieldWrapper>
		)
	)
);

const LoginFormWrapper = styled.div`
	
`;


