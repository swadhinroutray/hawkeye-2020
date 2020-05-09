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
			GameplayModel.clear();
		}, []);

		if (LoginStore.profile.allanswered) {
			return (
				<InfoWrapper>
					<Background src={DescriptionBg} />
					<Name className="info">Hawks Nest</Name>
					<Desc className="info">This is your final quest!</Desc>
					<Link to={'/hawksnest'}>
						<Start>Start</Start>
					</Link>
				</InfoWrapper>
			);
		} else {
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
						<div
							style={{ color: '#f2ad00', marginTop: '15px' }}
							className="info"
						>
							Region Multiplier Applied
						</div>
					) : null}
					{LoginStore.profile.level &&
					LoginStore.profile.level[LandingStore.currentRegion] > 0 &&
					LoginStore.profile.level[LandingStore.currentRegion] < 7 ? (
						<Link
							style={{ color: '#90ee90' }}
							to={`/game/${LandingStore.currentRegion}`}
						>
							<Start style={{ color: '#90ee90' }}>Start</Start>
						</Link>
					) : LoginStore.profile.level &&
					  LoginStore.profile.level[LandingStore.currentRegion] === 7 ? (
						<span>
							<Start>Conquered</Start>
						</span>
					) : (
						<span>
							<Start>
								<span className="locked">Locked</span>
							</Start>
						</span>
					)}
				</InfoWrapper>
			);
		}
	}),
);
const InfoWrapper = styled.div`
	width: 90%;
	margin: auto;
	align-self: center;
	position: relative;
	color: turquoise;
	font-size: 1em;
	font-family: 'nidus_sansregular';

	padding: 30px 20px;
	box-sizing: border-box;

	@media (min-width: 450px) {
		width: 70%;
	}
	@media (min-width: 768px) {
		width: 100%;
		padding: 15% 20px;
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
	color: white;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
`;
const Desc = styled.div`
	padding: 0 5px;
	margin: 20px 0;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
`;

const Background = styled.img`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 0;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
`;

const Start = styled.div`
	color: white;
	padding: 8px 5px;
	text-align: center;
	position: relative;
	width: 50%;
	margin: 20px auto 15px auto;
	background: url(${startButton}) no-repeat center center;
	background-size: 100% 100%;
	.locked {
		color: #ff6666;
	}
`;
