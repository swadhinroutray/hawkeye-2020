import React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { hologramImg, shopLogo } from '../../assets/landing-assets';
import HawksNest from '../../assets/HawkNest.svg';
import { Icon } from './Header';


export const Hologram = inject('LandingStore')(
	observer(({ LandingStore, LoginStore }) => {
		if (!LoginStore.profile.allanswered)
			return (
				<HologramWrapper>
					
					{LoginStore.profile.regionmultiplier === LandingStore.currentRegion &&
						LoginStore.profile.level[LandingStore.currentRegion] < 7&& (
							<Multiplier>
								<span>1.5</span>x
							</Multiplier>
						)}

					{LoginStore.profile.level &&
					LoginStore.profile.level[LandingStore.currentRegion] > 0 &&
					LoginStore.profile.level[LandingStore.currentRegion] <= 7 ? (
						<RegionImg
							src={LandingStore.regionInfo[LandingStore.currentRegion].img}
							alt="region"
						/>
					) : (
						<LockedImg
							src={LandingStore.regionInfo[LandingStore.currentRegion].img}
							alt="region"
						/>
					)}
					<HologramImg src={hologramImg} alt="hologram" />
				</HologramWrapper>
			);
		else
			return (
				<HologramWrapper>
					<RegionImg src={HawksNest} alt="hawks-nest" />
					<HologramImg src={hologramImg} alt="hologram" />
				</HologramWrapper>
			);
	}),
);

const Multiplier = styled.span`
	color: #f2ad00;
	position: absolute;
	right: 16%;
	top: 3%;
	font-size: 1.1rem;
	font-weight: 600;

	> span {
		color: #f2ad00;
		font-size: 1.4rem;
		font-weight: 600;
	}

	@media (min-width: 768px) {
		right: 15%;
	}
	@media (min-width: 1024px) {
		font-size: 1.3rem;
		> span {
			font-size: 1.6rem;
		}
	}
`;
const HologramWrapper = styled.div`
	position: relative;
	overflow: hidden;
	height: 26vh;
	text-align: center;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	@media (min-width: 768px) {
		height: 40vh;
	}
`;

const RegionImg = styled.img`
	height: 14vh;
	z-index: 10;
	position: relative;
	top: 1vh;
	@media (min-width: 768px) {
		height: 22vh;
		top: 3vh;
	}
	@media (min-width: 1024px) {
		height: 22vh;
		top: 4vh;
	}
`;

const LockedImg = styled(RegionImg)`
	filter: grayscale(100%);
`;
const HologramImg = styled.img`
	height: 14vh;
	display: block;
	transform: translateY(-25px);
	margin: auto;
	z-index: 2;

	@media (min-width: 768px) {
		height: 22vh;
	}
`;
