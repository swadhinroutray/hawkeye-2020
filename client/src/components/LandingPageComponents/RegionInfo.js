import React,{useState} from 'react';
import styled from 'styled-components';
import DescriptionBg from '../../assets/landing-assets/DescriptView.svg';
import { startButton } from '../../assets/landing-assets/index.js';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { LandingPage } from '../../pages/app/LandingPage';
export const RegionInfo = inject('LandingStore')(
	observer(({ LandingStore }) => {
		const [regionClicked,setRegionClicked]=useState(false)
		return (
			<InfoWrapper className="info">
				<Background src={DescriptionBg} />
				<div>
					REGION: {LandingStore.regionInfo[LandingStore.currentRegion].name}
				</div>
				<div>
					LOCATION:{' '}
					{LandingStore.regionInfo[LandingStore.currentRegion].location}
				</div>
				<div>
					YEAR: {LandingStore.regionInfo[LandingStore.currentRegion].year}AD
				</div>
				<div>
					DATE: {LandingStore.regionInfo[LandingStore.currentRegion].date}
				</div>
				<div>
					TIME: {LandingStore.regionInfo[LandingStore.currentRegion].time}
				</div>
				<Start onClick={() => {alert(`/game/${(LandingStore.currentRegion+1)}`)
					setRegionClicked(true)}}>
					{/* <img src={startButton} alt="" /> */}
					Start
				</Start>
				{regionClicked&&<Redirect to={`/game/${(LandingStore.currentRegion+1)}`} />}
			</InfoWrapper>
		);
	}),
);
const InfoWrapper = styled.div`
	text-transform: uppercase;
	width: 90%;
	margin: auto;
	text-align: left;
	position: relative;
	color: turquoise;
	font-size: 0.8em;
	padding: 15px 12%;
	box-sizing: border-box;

	@media (min-width: 768px) {
		width: 100%;
		padding: 15% 7%;
		font-size: 1em;
		margin-top: 40%;
	}
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
	padding: 5px;
	text-align: center;
	position: relative;
	width: 50%;
	margin: 8px auto 15px auto;
	border: 1px solid turquoise;

	> img {
		z-index: 20;
		position: absolute;
		top: 0;
		left: 0;
		width: 10vh;
		height: 100%;
	}
`;
