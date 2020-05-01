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
					<Link
						to="/shop"
						style={{ textDecoration: 'none', margin: 0, padding: 0 }}
					>
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
		height: 6vh;
	}
	@media (min-width: 768px) {
		height: 8vh;
	}
`;
const HeaderWrapper = styled.header`
	position: relative;
	display: grid;
	grid-template-columns: 25% 50% 25%;
	align-items: center;
	width: 100%;
	padding-top: 5px;
	> h1 {
		margin: 0;
		grid-column: 2/3;
		font-size: 1.7em;

		@media (min-width: 321px) {
			font-size: 2em;
		}
		@media (min-width: 768px) {
			margin-top: 3vh;
			font-size: 3em;
		}
	}

	> div {
		grid-column: 3/4;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
`;

const HawkLogo = styled.img`
	float: left;
	height: 5vh;
	margin-left: 10%;
	grid-column: 1/2;
	align-items: center;

	align-self: flex-end;
	@media (min-width: 321px) {
		height: 6vh;
	}
	@media (min-width: 768px) {
		height: 9vh;
	}
`;
