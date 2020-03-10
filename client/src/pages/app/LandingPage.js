import React from 'react';
import styled from 'styled-components';
import { observer, Provider, useLocalStore } from 'mobx-react';
import store from '../../models/app/LandingPageModel';
import {
	RegionInfo,
	Header,
	Hologram,
} from '../../components/LandingPageComponents';
import {
	leftBar,
	rightBar,
	backgroundMesh,
	waves,
} from '../../assets/landing-assets/index';

export const LandingPage = observer(() => {
	return (
		<Provider LandingStore={store}>
			<Page>
				<Header />
				<RegionWrapper>
					<LeftBar src={leftBar} />
					<RightBar src={rightBar} />
					<h5>WELCOME DENNIS</h5>
					<h4>SELECT YOUR REGION</h4>
					<Hologram />

					<Slider
						type="range"
						name="region-selector"
						min="0"
						max="70"
						onChange={e => store.changeRegion(Math.floor(e.target.value / 10))}
					/>
					<Year>{store.regionInfo[store.currentRegion].year} AD</Year>
					<RegionInfo />
					<Waves src={waves} alt="waves" />
				</RegionWrapper>
				<Events>TODAY'S LIST OF EVENTS</Events>
			</Page>
		</Provider>
	);
});

const Page = styled.div`
	font-family: 'Nidus Sans';
	letter-spacing: 0.1em;
	height: 100vh;
	background-image: url(${backgroundMesh});
	background-size: cover;
	text-align: center;
	font-family: Raleway, sans-serif;
	color: white;
	padding: 0;
	box-sizing: border-box;
	h5 {
		font-weight: 400;
		margin: 8px 0;
	}
	h4 {
		font-weight: 600;
		font-size: 1.1em;
		margin-top: 5px;
	}
`;
const RegionWrapper = styled.div`
	margin-top: 10px;
	padding: 5px 20px;
	position: relative;
`;

const Slider = styled.input`
	-webkit-appearance: none;
	appearance: none;
	width: 60%;
	height: 8px;
	background: turquoise;
	outline: none;
	border-radius: 5px;
	-webkit-transition: 0.2s;
	transition: opacity 0.2s;
	margin-bottom: 3vh;

	::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 26px;
		height: 12px;
		background: #00ced1;
		border-radius: 5px;
		cursor: pointer;
	}

	::-moz-range-thumb {
		width: 25px;
		height: 25px;
		background: #4caf50;
		cursor: pointer;
	}
`;
const Year = styled.div`
	border: 1px solid turquoise;
	width: 30%;
	padding: 5px 10px;
	color: turquoise;
	font-size: 1.2em;
	margin: 0 auto 2vh auto;
`;

const LeftBar = styled.img`
	height: 100%;
	position: absolute;
	top: 0;
	left: 4px;
`;
const RightBar = styled.img`
	height: 100%;
	position: absolute;
	top: 0;
	right: 4px;
`;

const Events = styled.footer`
	position: absolute;
	width: 100%;
	bottom: 0;
	background-image: linear-gradient(
		to right,
		rgb(64, 200, 208, 1),
		rgb(64, 200, 208, 0.4)
	);
	font-size: 0.9em;
	box-sizing: border-box;
	padding: 1px;
	color: white;
`;

const Waves = styled.img`
	height: 10vh;
	margin: 10px auto;
	width: 100%;
`;
