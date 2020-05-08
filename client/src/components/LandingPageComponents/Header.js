import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { hawkLogo, logoutLogo, shopLogo } from '../../assets/landing-assets';
import RulesLogo from '../../assets/RulesIcon.svg';
import { observer, inject } from 'mobx-react';

export const Header = inject('LoginStore')(
	observer(({ setrules, LoginStore }) => {
		return (
			<HeaderWrapper>
				<HawkLogo src={hawkLogo} alt="hawk-logo" />
				
				<div>
				<Link  to="/shop">
					<Icon
						src={shopLogo}
						alt="shop-icon"
					/>
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
export const Icon = styled.img`
	height: 8vh;
	margin:0.3rem 0.3rem;
	
	cursor: pointer;
	
	@media (min-width: 768px) {
		margin:0 1rem;
	
	}
	transition: all 0.2s ease-in;
	:hover {
		transform: scale(1.05);
	}
`;
const HeaderWrapper = styled.header`
	position: relative;
	font-family: 'nidus_sansregular';
	display:flex;
	justify-content:space-between;
	

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
