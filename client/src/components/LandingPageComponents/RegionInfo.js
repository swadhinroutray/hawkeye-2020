import React, { useEffect } from 'react';
import styled from 'styled-components';
import DescriptionBg from '../../assets/landing-assets/DescriptView.svg';
import { startButton } from '../../assets/landing-assets';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import GameplayModel from '../../models/app/GameplayModel';
export const RegionInfo = inject('LandingStore')(
	observer(({ LandingStore, LoginStore }) => {
		useEffect(() => {
			GameplayModel.locked = false;
		}, []);
		return (
			<InfoWrapper>
				<Background src={DescriptionBg} />
				<Name className="info">
					{LandingStore.regionInfo[LandingStore.currentRegion].name}
				</Name>
				<Desc className="info">
					{LandingStore.regionInfo[LandingStore.currentRegion].description}
				</Desc>

				{(LoginStore.profile.regionmultiplier &&
					LoginStore.profile.regionmultiplier) ===
				LandingStore.currentRegion ? (
					<div className="info">Region Multiplier Applied</div>
				) : null}

				{LoginStore.profile.level &&
				LoginStore.profile.level[LandingStore.currentRegion] > 0 &&
				LoginStore.profile.level[LandingStore.currentRegion] < 11 ? (
					<Link to={`/game/${LandingStore.currentRegion}`}>
						<Start>Start</Start>
					</Link>
				) : LoginStore.profile.level &&
				  LoginStore.profile.level[LandingStore.currentRegion] === 11 ? (
					<span>
						<Start>Conquered</Start>
					</span>
				) : (
					<span>
						<Start>Locked</Start>
					</span>
				)}
			</InfoWrapper>
		);
	}),
);
const InfoWrapper = styled.div`
	/* text-transform: uppercase; */
	width: 90%;
	margin: auto;
	align-self: center;
	position: relative;
	color: turquoise;
	font-size: 1em;
	font-family: 'Nidus Sans';

	padding: 15px 2vw;
	box-sizing: border-box;

	@media (min-width: 450px) {
		width: 70%;
	}
	@media (min-width: 768px) {
		width: 100%;
		padding: 15% 7%;
		font-size: 1em;
	}
	@media (min-width: 1024px) {
		width: 80%;
	}
	> .info {
		margin-bottom: 3px;
	}
`;

const Name = styled.div`
	font-weight: 700;
	font-size: 1.5em;
`;
const Desc = styled.div`
	padding: 0 5px;
	/* margin: 10px 0 10px 0; */
`;

const Background = styled.img`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 0;
`;

const Start = styled.div`
	color: turquoise;
	padding: 8px 5px;
	text-align: center;
	position: relative;
	width: 50%;
	margin: 8px auto 15px auto;
	background: url(${startButton}) no-repeat center center;
	background-size: 100% 100%;
`;
