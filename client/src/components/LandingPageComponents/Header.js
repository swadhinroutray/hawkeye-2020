import React from 'react';
import styled from 'styled-components';
import { hawkLogo, shopLogo, logoutLogo } from '../../assets/landing-assets';

export const Header = () => {
	return (
		<HeaderWrapper>
			<HawkLogo src={hawkLogo} alt="hawk-logo" />
			<h1>HAWKEYE</h1>
			<div>
				<img src={shopLogo} alt="shop-icon" />
				<img src={logoutLogo} alt="shop-icon" />
			</div>
		</HeaderWrapper>
	);
};

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
		> img {
			margin: auto;
			height: 5vh;
			align-self: flex-end;

			:first-of-type {
				margin-right: 7px;
			}
		}
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
