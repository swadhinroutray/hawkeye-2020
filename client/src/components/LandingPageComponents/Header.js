import React from 'react';
import styled from 'styled-components';
import hawkLogo from '../../assets/landing-assets/RulesIcon.svg';
import shopLogo from '../../assets/landing-assets/ShopIcon.svg';
import logoutLogo from '../../assets/landing-assets/LogoutIcon.svg';

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
	width: 100%;
	padding-top: 5px;
	> h1 {
		margin: 0;
		grid-column: 2/3;
	}
	> div {
		grid-column: 3;
		align-items: stretch;

		> img {
			align-items: end;
			margin: auto;
			height: 5vh;
			:first-of-type {
				margin-right: 7px;
			}
		}
	}
`;
const HawkLogo = styled.img`
	float: left;
	height: 5vh;
	margin-left: 10%;
	grid-column: 1/2;
	align-items: center;
`;
