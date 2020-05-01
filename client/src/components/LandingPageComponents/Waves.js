import React from 'react';
import styled from 'styled-components';
import { waves, map } from '../../assets/landing-assets/index';

export const Waves = () => {
	return (
		<Wrapper>
			<Map src={map} alt="" />
			<WaveImg src={waves} alt="waves" />
		</Wrapper>
	);
};
const Wrapper = styled.div`
	width: 100%;
	@media (min-width: 768px) {
		margin-top: 8vh;
		order: -1;
	}
`;
const Map = styled.img`
	height: 35vw;
	width: 90%;
	margin: auto;

	@media (max-width: 767px) {
		display: none;
	}
`;
const WaveImg = styled.img`
	display: block;
	height: 10vh;
	margin: 10px auto;
	width: 80%;

	@media (min-width: 768px) {
		width: 28vh;
		margin: auto;
	}
`;
