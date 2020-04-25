import React from 'react';
import styled from 'styled-components';
import { observer, Provider } from 'mobx-react';
import store from '../../models/app/LandingPageModel';
import {
	RegionInfo,
	Header,
	Hologram,
	Waves,
} from '../../components/LandingPageComponents';
import { leftBar, rightBar, backgroundMesh } from '../../assets/landing-assets';

export const LandingPage = observer(() => {
	
	return (
		<Provider LandingStore={store}>
			<Page>
				<Header />
				<Wrapper>
					<RegionSelector>
						<LeftBar src={leftBar} />
						<RightBar src={rightBar} />
						<h5>WELCOME WAYNE</h5>
						<h4>SELECT YOUR REGION</h4>
						<Hologram />
						<Slider
							type="range"
							name="region-selector"
							min="0"
							max="59"
							onChange={e =>
								store.changeRegion(Math.floor(e.target.value / 10))
							}
						/>
						<Year>{store.regionInfo[store.currentRegion].year} AD</Year>
					</RegionSelector>

					<RegionInfo />
					<Waves />
				</Wrapper>
				<Events>TODAY'S LIST OF EVENTS</Events>
			</Page>
		</Provider>
	);
});

const Page = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	box-sizing: border-box;
	text-align: center;
	letter-spacing: 0.1em;
	color: white;
	font-family: 'Nidus Sans', sans-serif;
	background-image: url(${backgroundMesh});
	background-size: cover;

	h5 {
		font-weight: 400;
		font-size: 0.9em;
		margin: 8px 0;
	}
	h4 {
		font-weight: 600;
		font-size: 1.1em;
		margin-top: 5px;
	}

	@media (min-width: 768px) {
		background-repeat: repeat;
		h5 {
			font-weight: 500;
			font-size: 1.4em;
			margin: 3vh 0 0 0;
		}
		h4 {
			font-weight: 600;
			font-size: 1.5em;
			margin: 2vh 0 3vh 0;
		}
	}
`;
const Wrapper = styled.div`
	padding: 5px 20px;
	position: relative;

	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 30% auto 30%;
		justify-items: stretch;
	}
`;

const RegionSelector = styled.div`
	@media (min-width: 768px) {
		grid-column: 2/3;
	}
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

	@media (min-width: 768px) {
		margin-top: 8vh;
		width: 90%;
		height: 18px;
	}
	::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 26px;
		height: 12px;
		background: #00ced1;
		border-radius: 5px;
		cursor: pointer;

		@media (min-width: 768px) {
			width: 40px;
			height: 24px;
		}
	}

	::-moz-range-thumb {
		width: 26px;
		height: 12px;
		background: #4caf50;
		border-radius: 5px;
		cursor: pointer;

		@media (min-width: 768px) {
			width: 40px;
			height: 24px;
		}
	}
`;
const Year = styled.div`
	border: 1px solid turquoise;
	width: 30%;
	padding: 5px 10px;
	color: turquoise;
	font-size: 1.2em;
	font-weight: 600;
	margin: 0 auto 2vh auto;

	@media (min-width: 768px) {
		margin-top: 3vh;
		width: 50%;
		font-size: 1.7em;
	}
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
	float: bottom;
	width: 100%;
	bottom: 0;
	margin: 0;
	background-image: linear-gradient(
		to right,
		rgb(64, 200, 208, 1),
		rgb(64, 200, 208, 0.4)
	);
	font-size: 0.9em;
	box-sizing: border-box;
	padding: 1px;
	color: white;

	@media (min-width: 768px) {
		font-size: 1.2em;
		padding: 6px;
	}
`;
