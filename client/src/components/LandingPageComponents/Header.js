import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { hawkLogo, logoutLogo,} from '../../assets/landing-assets';
import { ReactComponent as ShopIcon } from '../../assets/ShopIcon.svg';
import RulesLogo from '../../assets/RulesIcon.svg';
import { observer, inject } from 'mobx-react';

export const Header = inject('LoginStore')(
	observer(({ setrules, LoginStore }) => {
		return (
			<HeaderWrapper>
				
				<Icon  src={hawkLogo} alt="hawk-logo" />
				
				
				<div>
				
				<Link style={{margin:"10px"}} className="icon" to="/shop">
					<ShopIcon/>
					</Link>
				
					<Icon
						src={RulesLogo}
						onClick={() => setrules(true)}
						alt="rules-icon"
					/>
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
const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};
const device = {
	mobileS: `(min-width: ${size.mobileS})`,
	mobileM: `(min-width: ${size.mobileM})`,
	mobileL: `(min-width: ${size.mobileL})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};
export const Icon = styled.img`
	
			all: unset;
			display: inline-block;
			width: 45px;
			margin: 10px;
			transition-duration: 0.4s;
			:hover {
				cursor: pointer;
				transform: scale(1.05);
			}
			@media ${device.mobileS} and (max-width: ${size.mobileM}) {

				width: 35px;
			}
			@media ${device.tablet} {
				width: 8vh;
				margin: auto 15px;
			}
		
`;
const HeaderWrapper = styled.header`
	position: relative;
	font-family: 'nidus_sansregular';
	display:flex;
	justify-content:space-between;
	.icon{
		all: unset;
			display: inline-block;
			width: 45px;
			margin: 5px;
			transition-duration: 0.4s;
			:hover {
				cursor: pointer;
				transform: scale(1.05);
			}
			@media ${device.mobileS} and (max-width: ${size.mobileM}) {

				width: 35px;
			}
			@media ${device.tablet} {
				width: 8vh;
				margin: auto 15px !important;
			}
	}

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
			margin-top: 0vh;
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
	
	height: 8vh;
	
	margin-left:2%;
	align-items: center;

	align-self: center;
	@media (min-width: 768px) {
		height: 8vh;
		
	}
`;
