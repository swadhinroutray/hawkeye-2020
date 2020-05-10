import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { hawkLogo } from '../../assets/landing-assets';
import { ReactComponent as ShopIcon } from '../../assets/ShopIcon.svg';
import RulesLogo from '../../assets/RulesIcon.svg';
import { observer, inject } from 'mobx-react';
import { ReactComponent as RulesIcon } from '../../assets/RulesIcon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/LogoutIcon.svg';

export const Header = inject('LoginStore')(
	observer(({ setrules, LoginStore }) => {
		return (
			<HeaderWrapper>
				<img src={hawkLogo} alt="hawk logo" />

				<div className="right">
					{LoginStore.profile.allanswered === false && (
						<Link className="icon" to="/shop">
							<ShopIcon />
						</Link>
					)}

					<div
						className="icon"
						onClick={e => {
							setrules(true);
						}}
					>
						<RulesIcon />
					</div>
					<Link
						className="icon"
						onClick={() => {
							LoginStore.logout();
						}}
						to=""
					>
						<LogoutIcon />
					</Link>
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

const HeaderWrapper = styled.header`
	position: relative;
	margin-top: 10px;
	margin: 0 10px;
	display: flex;

	justify-content: space-between;
	img {
		width: 45px;
		height: 45px;
	}
	padding: 0;

	.icon {
		all: unset;
		display: inline-block;
		width: 45px;
		margin: 5px;
		transition-duration: 0.4s;
		:hover {
			cursor: pointer;
			transform: scale(1.05);
		}
	}
	@media ${device.mobileS}, ${device.mobileM} {
		.icon {
			width: 45px;
		}
		img {
			width: 45px;
			height: 45px;
		}
	}
	@media ${device.tablet} {
		padding: 20px 0;
		margin: 0;

		.icon {
			width: 8vh;
			margin: auto 15px;
		}
		img {
			width: 8vh;
			height: 8vh;
		}
	}
	@media ${device.laptop} {
		padding: 0;
		margin: 20px;
		margin-bottom: 0px;
	}
`;
