import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { hawkLogo, shopLogo, logoutLogo } from '../../assets/landing-assets';
import { observer, inject } from 'mobx-react';

export const Header = inject('LoginStore')(
	observer(({ LoginStore }) => {
		return (
			<HeaderWrapper>
				<HawkLogo src={hawkLogo} alt="hawk-logo" />
				<h1>HAWKEYE</h1>
				<div>
					<Link to="/shop">
						<Icon src={shopLogo} alt="shop-icon" />
					</Link>
					<Icon
						src={logoutLogo}
						alt="logout-icon"
						onClick={() => LoginStore.logout()}
					/>
				</div>
			</HeaderWrapper>
		);
	}),
);
const Icon = styled.img`
	height: 4vh;
	cursor: pointer;
	@media (min-width: 321px) {
		height: 5vh;
	}
	@media (min-width: 768px) {
		height: 8vh;
	}
`;
const HeaderWrapper = styled.header`
	position: relative;
	font-family: 'nidus_sansregular';
	display: grid;
	grid-template-columns: 25% 50% 25%;
	align-items: center;
	width: 100%;
	padding-top: 5px;
	letter-spacing: 0.15em;

	> h1 {
		font-size: 32px;
		margin: 0;
		color: #fff;
		grid-column: 2/3;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	> div {
		grid-column: 3;
		display: flex;
		justify-content: space-evenly;
	}
	@media (min-width: 425px) {
		> h1 {
			font-size: 36px;
		}
	}
	@media (min-width: 768px) {
		> h1 {
			margin-top: 3vh;
			font-size: 56px;
		}
		> div {
			> img {
				height: 8vh;
			}
		}
	}
	@media (min-width: 1520px) {
		> h1 {
			font-size: 72px;
		}
	}
`;

const HawkLogo = styled.img`
	float: left;
	height: 5vh;
	margin-left: 10%;
	grid-column: 1/2;
	align-items: center;

	align-self: flex-end;
	@media (min-width: 768px) {
		height: 8vh;
	}
`;
