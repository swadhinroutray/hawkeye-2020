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

					{!LoginStore.loggedIn ? (
						<Link to="/login">
							<Icon src={logoutLogo} alt="shop-icon" />
						</Link>
					) : (
						<Icon
							src={logoutLogo}
							alt="shop-icon"
							onClick={() => LoginStore.logout()}
						/>
					)}
				</div>
			</HeaderWrapper>
		);
	}),
);
const Icon = styled.img`
	margin: auto;
	height: 5vh;
	align-self: flex-end;

	@media (min-width: 768px) {
		height: 7vh;
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
	}
	> div {
		grid-column: 3;
		display: flex;
		justify-content: space-evenly;
	}

	@media (min-width: 768px) {
		> h1 {
			margin-top: 3vh;
			font-size: 3em;
		}
		> div {
			> img {
				height: 8vh;
			}
		}
	}
`;

const HawkLogo = styled.img`
	float: left;
	height: 6vh;
	margin-left: 10%;
	grid-column: 1/2;
	align-items: center;

	align-self: flex-end;
	@media (min-width: 768px) {
		height: 9vh;
	}
`;
