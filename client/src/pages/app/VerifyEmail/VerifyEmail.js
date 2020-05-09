import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Field, LoginFormWrapper } from '../LoginPage/LoginForm';
import { Redirect, Link } from 'react-router-dom';
import HAWK from '../../../assets/HAWK.svg';
import iecse from '../../../assets/iecse.svg';
import ReactLoading from 'react-loading';
export const VerifyEmail = inject('loginStore')(
	observer(({ loginStore, location }) => {
		useEffect(() => {
			let params = new URLSearchParams(location.search);
			let token = params.get('token');
			console.log(token);
			loginStore.verifyEmail(token);
		}, []);

		return (
			<VerifyWrapper>
				{loginStore.verifySuccess ? <Redirect to="/login" /> : null}
				<div>
					<ReactLoading type={'spin'} color={'#3abdb7'} className="loading" />
					<div>{loginStore.verifyMessage}</div>
				</div>
			</VerifyWrapper>
		);
	}),
);

const VerifyWrapper = styled.div`
	padding: 30px;
	> div {
		.loading {
			margin: 30px auto;
		}
		text-align: center;
		margin: 20% auto;
		width: fit-content;
	}
`;
