import React from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { hologramImg } from '../../assets/landing-assets';

export const Hologram = inject('LandingStore')(
	observer(({ LandingStore }) => {
		return (
			<HologramWrapper>
				<RegionImg
					src={LandingStore.regionInfo[LandingStore.currentRegion].img}
					alt="region"
				/>
				<HologramImg src={hologramImg} alt="hologram" />
			</HologramWrapper>
		);
	}),
);
const HologramWrapper = styled.div`
	overflow: hidden;
	height: 28vh;

	@media (min-width: 768px) {
		height: 40vh;
	}
`;
const RegionImg = styled.img`
	height: 14vh;
	z-index: 5;
	position: relative;
	margin: 2vh auto 0 auto;
	@media (min-width: 768px) {
		height: 22vh;
	}
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
