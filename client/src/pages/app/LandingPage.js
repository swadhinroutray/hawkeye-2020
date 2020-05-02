import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer, Provider } from 'mobx-react';
import store from '../../models/app/LandingPageModel';
import GameplayModel from '../../models/app/GameplayModel';
import LoginStore from '../../models/app/LoginModel';
import { Redirect } from 'react-router-dom';
import {
	RegionInfo,
	Header,
	Hologram,
	Map,
} from '../../components/LandingPageComponents';
import { leftBar, rightBar, backgroundMesh } from '../../assets/landing-assets';

export const LandingPage = observer(() => {
	useEffect(() => {
		GameplayModel.locked = false;
		LoginStore.getProfile();
	}, []);
	return (
		<Provider LoginStore={LoginStore}>
			<Provider LandingStore={store}>
				<Page>
					{!LoginStore.loggedIn && <Redirect to="/login" />}
					<Header />
					<Wrapper>
						<RegionSelector>
							<LeftBar src={leftBar} />
							<RightBar src={rightBar} />
							<h5>WELCOME {LoginStore.profile.username?.toUpperCase()}</h5>
							<h4>SELECT YOUR REGION</h4>
							<Hologram />
							<Slider
								type="range"
								name="region-selector"
								min="0"
								max="49"
								onChange={e =>
									store.changeRegion(Math.floor(e.target.value / 10))
								}
								value={store.currentRegion * 10}
							></Slider>
							<Year>{store.regionInfo[store.currentRegion].year} AD</Year>
						</RegionSelector>

						<RegionInfo />
						<Map />
					</Wrapper>
				</Page>
			</Provider>
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
	font-family: 'Futura PT Medium';
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
	overflow: hidden;

	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 30fr auto 30fr;
		/* justify-items: center; */
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
	padding: 0;
	outline: none;
	border-radius: 5px;
	-webkit-transition: 0.2s;
	transition: opacity 0.2s;
	margin-bottom: 3vh;

	@media (min-width: 768px) {
		margin-top: 8vh;
		width: 90%;
		height: 16px;
	}
	::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 26px;
		height: 14px;
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
		height: 14px;
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
	width: 40%;
	padding: 1vh 2vw;
	color: turquoise;
	font-size: 1.2em;
	font-weight: 500;
	margin: 0 auto 2vh auto;
	@media (min-width: 425px) {
		width: 30%;
	}
	@media (min-width: 768px) {
		margin-top: 3vh;
		width: 50%;
		font-size: 1.7em;
	}
	@media (min-width: 1024px) {
		width: 60%;
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
