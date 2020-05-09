import { inject, observer, Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import HawksNestModel from '../../../models/app/HawksNestModel';
import { Link } from 'react-router-dom';
import {
	AttemptsBox,
	HintsBox,
	QuestionBox,
} from '../../../components/HawksNestComponents';
import Qbox from '../../../assets/Qbox.svg';
import LogoutIcon from '../../../assets/LogoutIcon.svg';
import RulesIcon from '../../../assets/RulesIcon.svg';
import HAWK from '../../../assets/HAWK.svg';
import ButtonBox from '../../../assets/ButtonBox.svg';
import Attempts from '../../../assets/Attempts.svg';
import ReactLoading from 'react-loading';
import Rules from '../../../components/Rules';
import Details1 from '../../../components/Details1';
import Details2 from '../../../components/Details2';
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';

const HawksNest = inject('loginStore')(
	observer(({ loginStore, match }) => {
		useEffect(() => {
			loginStore.getProfile();
			HawksNestModel.getQuestion();
			loginStore.clearErrors();
			HawksNestModel.clearMessage();
		}, [loginStore, match, HawksNestModel]);

		const [rules, setrules] = useState(false);

		return loginStore.profileSet ? (
			<GameWrapper region={match.params.id}>
				{!loginStore.profile.allanswered && <Redirect to="/regions" />}
				<Details1 />
				<Details2 />

				<Provider gameplayStore={HawksNestModel}>
					<div className="Navbar">
						<div className="navbar-btn">
							<a href="/regions">
								<img id="hawklogo" src={HAWK} alt="Hawk" />
							</a>
						</div>

						<div className="nav-buttons">
							<Link className="back" to="/regions">
								<BackButton />
							</Link>
							<div className="navbar-btn" onClick={() => setrules(true)}>
								<img id="rule-button" src={RulesIcon} alt="Rules" />
							</div>

							<div
								className="navbar-btn"
								id="logout"
								onClick={() => loginStore.logout()}
							>
								<img src={LogoutIcon} alt="logout" />
							</div>
						</div>

						{loginStore.profileSetError && !loginStore.loggedIn ? (
							<Redirect
								to={{
									pathname: '/login',
								}}
							/>
						) : null}
					</div>

					<div id="heading">HAWKS NEST</div>

					<div id="points">
						Current Points:{' '}
						<span style={{ color: 'white' }}>{HawksNestModel.points}</span>
					</div>

					<div className="GameContent">
						<div className="GameWrapper">
							<div className="game-play">
								<QuestionBox />
								<HintsBox />
								<AttemptsBox />
							</div>

							{rules && <Rules setrules={setrules} />}
						</div>
					</div>
				</Provider>
			</GameWrapper>
		) : (
			<GameWrapper>
				<ReactLoading type={'spin'} color={'#3abdb7'} className="loading" />

				{loginStore.profileSetError && !loginStore.loggedIn ? (
					<Redirect to="/login" />
				) : null}
			</GameWrapper>
		);
	}),
);

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};
const GameWrapper = styled.div`
	overflow: hidden;
	color: #fff;
	#heading {
		color: #fff;
		letter-spacing: 0.1em;

		text-align: center;
		align-self: center;
		font-weight: 300;

		font-size: 1.8rem;
	}

	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50px;

	.Navbar {
		width: 100vw;
		display: flex;
		justify-content: space-between;
	}

	.nav-buttons {
		display: flex;
	}

	.Hint {
		font-size: 16px;
		text-align: center;
	}

	.navbar-btn img {
		transition-duration: 0.4s;
		:hover {
			cursor: pointer;

			transform: scale(1.1);
		}

		margin: 1vh 2vw 0 0;
		width: 45px;
		height: 70px;
	}
	.QuestionBox {
		font-family: 'Futura PT Medium';
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		background-image: url(${Qbox});
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 300px;
		max-height: 300px;
		padding: 30px;
	}

	.QuestionWrapper {
		height: 110px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: white;
	}
	.AnswerWrapper {
		color: white;
		margin-top: 3px;
		width: 100%;
	}
	.HintsHeader {
		font-family: 'Futura PT Heavy';
		text-align: center;
		color: white;
		font-size: 23px;
	}
	.Hints {
		display: flex;
		flex-direction: column;
		height: 180px;
		text-align: center;
		overflow-y: scroll;
		font-size: 13px;
		color: white;
	}
	.Hints::-webkit-scrollbar {
		display: none;
	}
	.stats::-webkit-scrollbar {
		display: none;
	}
	#points {
		font-size: 15px;
		font-weight: bold;
		color: #f2ad00;
		margin-top: 1rem;
		@media (min-width: ${size.laptop}) {
			margin-top: 2rem;
			font-size: 20px;
		}
		@media (min-width: ${size.laptopL}) {
			margin-top: 2rem;
			font-size: 25px;
		}
	}

	@keyframes fadeInUp {
		from {
			transform: translate3d(0, 40px, 0);
		}

		to {
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeInUp {
		from {
			transform: translate3d(0, 40px, 0);
		}

		to {
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	.close {
		font-size: 20px;
		color: #fff;

		text-align: right;
		position: absolute;
		top: 5%;
		right: 3%;
		:hover {
			cursor: pointer;
		}
	}

	.AnswerField input {
		width: 90%;
		height: 23px;
		padding: 3px 1px;
		text-align: center;
		background-color: Transparent;
		border-right: 5px solid #7fd1e0;
		border-left: 5px solid #7fd1e0;
		border-top: 1px solid #7fd1e0;
		border-bottom: 1px solid #7fd1e0;
		font-family: 'Futura PT Medium';
	}
	.AnswerWrapper button {
		:hover {
			cursor: pointer;

			transform: scale(1.05);
		}
		:focus {
			outline: none;
			box-shadow: none;
		}

		background-image: url(${ButtonBox});
		background-color: transparent;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border: none;
		padding: 7px;
		height: 30px;
		width: 82px;
		margin-bottom: 5px;
		font-size: 12px;
		font-family: 'Futura PT Medium';
	}
	.selected {
	}
	.AnswerWrapper {
		font-family: 'Futura PT Medium';
		text-align: center;
	}
	img {
		width: 40px;
		height: 40px;
		margin: 0 2px;
	}
	#hawklogo {
		width: 50px;
		height: 70px;
	}
	.Question {
		justify-self: flex-end;
		overflow: hidden;
		overflow-y: scroll;
		font-family: 'Futura PT Medium';
		font-size: 16px;
		overflow-wrap: break-word;
		color: #fff;
	}
	.AnswerStatus {
		color: #fff;
		height: 20px;
	}
	.Question::-webkit-scrollbar {
		display: none;
	}
	.Level {
		font-family: 'Futura PT Heavy';
		color: #fff;
		font-size: 20px;
	}
	.ActualHints {
		color: #fff;
		background-image: url(${Qbox});
		background-repeat: no-repeat;

		overflow: hidden;

		overflow-wrap: break-word;
		padding: 30px;
	}
	.Attempts {
		font-family: 'Futura PT Medium';
		background-image: url(${Attempts});
		background-repeat: no-repeat;

		overflow: hidden;

		overflow-wrap: break-word;
		padding: 30px;

		padding-top: 10px;
		max-width: 300px;
	}
	.Attemptsheader {
		display: flex;
	}
	.Attemptsheader div {
		:hover {
			cursor: pointer;
		}
		color: #fff;
		font-size: 23px;
		font-family: 'Futura PT Heavy';
		width: 50%;
		text-align: center;
	}
	.stats {
		font-family: 'Futura PT Medium';
		display: flex;
		flex-direction: column;

		overflow-y: scroll;
		height: 130px;
		margin-top: 30px;
	}

	overflow-x: hidden;
	.slider {
		background: white;
		position: fixed;
		bottom: 0;
		overflow-y: hidden;
		max-height: 500px; /* approximate max height */

		transition-property: all;
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}
	.slider.closed {
		max-height: 0;
	}
	#pullup {
		height: 40px;
		width: 100px;
		padding-bottom: calc(100% * 2.5 / 5);
	}

	#Objects {
		transition-duration: 0.4s;
		margin: 1vh 2vw 0 0;
		width: 45px;
		height: 70px;
		:hover {
			transform: scale(1.1);
		}
	}

	@media (min-width: 1181px) {
		.Navbar {
			position: absolute;
		}
		#Objects {
			width: 55px;
			height: 70px;
			margin: 1vh 1vw 0 0;
		}

		.navbar-btn img {
			width: 55px;
			margin: 1vh 1vw 0 0;
		}

		.Attemptsheader div {
			font-size: 20px;
		}
		.game-play {
			display: flex;
			align-items: center;
			height: 70vh;
			position: relative;

			justify-content: space-between;
			width: 90vw;
		}
		#heading {
			margin-top: 30px;
		}

		.QuestionBox {
			order: 2;
		}
		.ActualHints {
			order: 1;
		}
		.Attempts {
			order: 3;
		}
		.Hints {
			font-family: 'Futura PT Medium';
			height: 130px;
			width: 220px;
		}
		.stats {
			width: 220px;
			height: 90px;
		}
	}

	@media (min-width: 1181px) {
		.nav-buttons {
			margin: 0 20px;
		}
		.ActualHints {
			transform: scale(1.2);
		}
		.Attempts {
			transform: scale(1.2);
		}
		#heading {
			transform: scale(1.4);
		}
		.QuestionBox {
			transform: scale(1.3);
		}
		.Rules {
			left: 30%;
			right: 30%;
		}
	}
	@media (min-width: ${size.laptopL}) {
		.QuestionBox,
		.ActualHints,
		.Attempts {
			transform: scale(1.3);
		}
		.navbar-btn img {
			width: 65px;
		}
		#Objects {
			width: 65px;
		}
		#heading {
			transform: scale(1.5);
		}

		#hawklogo {
			width: 65px;

			margin: 2vh 0 0 1vw;
		}

		.game-play {
			width: 85vw;
		}
	}
	@media (min-width: ${size.desktop}) {
		.QuestionBox,
		.ActualHints,
		.Attempts {
			transform: scale(1.5);
		}
	}

	@media (max-width: 375px) {
		.QuestionBox,
		.ActualHints,
		.Attempts {
			transform: scale(0.85);
		}
	}
	@media (max-width: 330px) {
		#hawklogo {
			margin-right: 0;
		}
		.ActualHints,
		.Attempts {
			transform: scale(0.8);
		}

		#heading {
			font-size: 1.4rem;
		}
	}

	#leftbar {
		height: 100%;
		width: auto;
		position: fixed;
		top: 15%;
		left: 0;
	}
	#rightbar {
		height: 100%;
		width: auto;
		position: fixed;
		top: 15%;
		right: 0;
	}
	.loading {
		margin: 50vh auto;
	}
`;

export default HawksNest;
