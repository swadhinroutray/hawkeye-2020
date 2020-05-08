import React from 'react';
import styled from 'styled-components';
import { map } from '../../assets/landing-assets/index';

export const Map = () => {
	return <MapImg src={map} alt="" />;
};

const MapImg = styled.img`
	height: 25vw;
	align-self: center;
	width: 100%;
	order: -1;
	grid-column: 1/2;
	display: none;

	@media (min-width: 1112px) {
		display: block;
	}
`;
