import React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { hologramImg } from '../../assets/landing-assets';

export const Hologram = inject('LandingStore')(
	observer(({ LandingStore, LoginStore }) => {
		return (
			<HologramWrapper>
				{LoginStore.profile.level &&
				LoginStore.profile.level[LandingStore.currentRegion] > 0 &&
				LoginStore.profile.level[LandingStore.currentRegion] < 8 ? (
					<RegionImg
						// src={LandingStore.regionImages[LandingStore.currentRegion]}
						src={LandingStore.regionInfo[LandingStore.currentRegion].img}
						alt="region"
					/>
				) : (
					<LockedImg
						// src={LandingStore.regionImages[LandingStore.currentRegion]}
						src={LandingStore.regionInfo[LandingStore.currentRegion].img}
						alt="region"
					/>
				)}
				<HologramImg src={hologramImg} alt="hologram" />
			</HologramWrapper>
		);
	}),
);
const HologramWrapper = styled.div`
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
