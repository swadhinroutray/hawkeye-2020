import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer, Provider } from 'mobx-react';
import GameplayModel from '../../models/app/GameplayModel';
import LoginStore from '../../models/app/LoginModel';
import { Redirect } from 'react-router-dom';
import Details1 from '../../components/Details1';
import Details2 from '../../components/Details2';
import Rules from '../../components/Rules';
import {
	RegionInfo,
	Header,
	Hologram,
	Map,
} from '../../components/LandingPageComponents';
import LandingStore from '../../models/app/LandingPageModel';

export const LandingPage = observer(() => {
	useEffect(() => {
		GameplayModel.locked = false;
		LoginStore.getProfile();
		GameplayModel.clear();
	}, []);

	const [rules, setrules] = useState(false);

	return (
		<Provider LoginStore={LoginStore}>
			<Provider LandingStore={LandingStore}>
				<Page>
					{LoginStore.rulesDisplay && (
						<Rules setrules={LoginStore.setRulesDisplay.bind(LoginStore)} />
					)}
					<Details1 />
					<Details2 />
					<Header setrules={setrules} />

					<Wrapper>
						<RegionSelector>
							<h5>WELCOME {LoginStore.profile.username?.toUpperCase()}</h5>
							<h4>SELECT YOUR REGION</h4>
							<Hologram LoginStore={LoginStore} />

							{!LoginStore.profile.allanswered ? (
								<>
									<Slider
										type="range"
										name="region-selector"
										min="0"
										max="41"
										onChange={e =>
											LandingStore.changeRegion(Math.floor(e.target.value / 10))
										}
										defaultValue={LandingStore.currentRegion * 10 + 1}
									></Slider>
									<MoveSlider>Move slider to change region</MoveSlider>
									<Year>
										{LandingStore.regionInfo[LandingStore.currentRegion].year}
									</Year>
								</>
							) : (
								<Year>2020 AD</Year>
							)}
						</RegionSelector>
						<RegionInfo LoginStore={LoginStore} />
						<Map />
					</Wrapper>

					{LoginStore.profileSetError && !LoginStore.loggedIn ? (
						<Redirect
							to={{
								pathname: '/login',
							}}
						/>
					) : null}
					{rules && <Rules setrules={setrules} />}
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
	font-family: 'nidus_sansregular';

	h5 {
		font-weight: 400;
		font-size: 1.4em;
		margin: 8px 0;
		color: #fff;
		font-family: 'nidus_sansregular';
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	h4 {
		font-family: 'nidus_sansregular';
		font-weight: 600;
		font-size: 1.9em;
		margin-top: 5px;
		color: #fff;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}

	@media (min-width: 768px) {
		background-repeat: repeat;
		h5 {
			font-weight: 500;
			font-size: 1.8em;
			margin: 3vh 0 0 0;
		}
		h4 {
			font-weight: 600;
			font-size: 2em;
			margin: 2vh 0 3vh 0;
		}
	}
`;
const Wrapper = styled.div`
	padding: 5px 20px;
	position: relative;
	overflow: hidden;

	@media (min-width: 1112px) {
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

	:focus {
		outline: none;
	}
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
const MoveSlider = styled.div`
	font-size: 0.8em;
	margin-bottom: 3vh;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	color: lightgrey;
`;
const Year = styled.div`
	border: 1px solid turquoise;
	width: 40%;
	padding: 1vh 2vw;
	color: turquoise;
	font-size: 1.2em;
	font-weight: 500;
	margin: 0 auto 2vh auto;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
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
