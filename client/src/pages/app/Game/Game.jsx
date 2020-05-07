import { inject, observer, Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import GameplayModel from '../../../models/app/GameplayModel';
import {
	AttemptsBox,
	HintsBox,
	QuestionBox,
	InventoryBox,
} from '../../../components/GamePageComponents';
import Qbox from '../../../assets/Qbox.svg';
import LogoutIcon from '../../../assets/LogoutIcon.svg';
import RulesIcon from '../../../assets/RulesIcon.svg';
import HAWK from '../../../assets/HAWK.svg';
import PullUp from '../../../assets/PullUp.svg';
import ButtonBox from '../../../assets/ButtonBox.svg';
import Attempts from '../../../assets/Attempts.svg';
import ReactLoading from 'react-loading';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { leftBar, rightBar } from '../../../assets/landing-assets/index';
import { Link } from 'react-router-dom';
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';
import ShopIcon from '../../../assets/ShopIcon.svg'
const Game = inject('loginStore')(
	observer(({ loginStore, match }) => {
		if (match.params.id < 0 || match.params.id > 4) {
			return <Redirect to="/regions" />;
		}
		useEffect(() => {
			loginStore.getProfile();

			GameplayModel.getQuestion(parseInt(match.params.id));
			loginStore.getInventory();

			loginStore.clearErrors();
			GameplayModel.clearMessage();
		}, [loginStore, match, GameplayModel]);

		const [rules, setrules] = useState(false);
		const [inventory, getinventory] = useState(false);

		return loginStore.profileSet ? (
			<GameWrapper region={match.params.id}>
				<img id="leftbar" src={leftBar} alt="leftbar" />
				<img id="rightbar" src={rightBar} alt="rightbar" />
				<Provider gameplayStore={GameplayModel}>
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
				<div className="navbar-btn" >
				<a href ="/shop"><img id="shop-button" src={ShopIcon} alt="shop"/></a>
				</div>
				<div className="navbar-btn" onClick={() => setrules(true)}>
								<img id="rule-button" src={RulesIcon} alt="Rules" />
							</div>
							
							<div className="navbar-btn" id="logout" onClick={() => loginStore.logout()}>
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
					{match.params.id==='0'&&<div id="heading">FLORENCE</div>}
						{match.params.id==='1'&&<div id="heading">OTTOMANIA</div>}
						{match.params.id==='2'&&<div id="heading">PRIPYAT</div>}
						{match.params.id==='3'&&<div id="heading">THE ANTHROPOCENE</div>}
						{match.params.id==='4'&&<div id="heading">MEDUSAE FOSSAE</div>}
					<div className="GameContent">
						<div className="GameWrapper">
							<div className="game-play">
								<QuestionBox getinventory={getinventory} match={match} />

								<HintsBox />
								<AttemptsBox />
							</div>
							<InventoryBox
								loginStore={loginStore}
								match={match}
								inventory={inventory}
								getinventory={getinventory}
							/>

							{!inventory ? (
								<div
									className="invertory-open"
									onClick={() => {
										getinventory(true);
									}}
								>
									<span>INVENTORY</span>
								</div>
							) : null}
							{rules && (
								<div className="Rules">
									<h1>Rules</h1>
									<i className="btn-close" onClick={() => setrules(false)}>
										<FontAwesomeIcon icon={faTimes} />
									</i>
									<div className="Rules-content">
										<h2> Welcome to HawkEye'20 </h2>
											<h3> Gameplay </h3>
										<ol className= "rules-list">
											<li>This is an online scavenger hunt, it starts at 9/5/20 12:00 HRs and ends on 12/5/20 00:00 HRs</li>
											<li>Due to a mishap with the time portal, you have been randomly dropped into one of the 5 total timelines that have been created.</li>
											<li>The next timeline is available after a certain period of time. You can unlock them faster if you solve the questions of your current timeline early.</li>
											<li>If the answer is &#34;22 Cakes&#34; then the answer you should write is &#34;twotwo cakes&#34;. If the answer contains special characters, replace them to the nearest character.
											For example, &#x27;&#x101;&#x27; becomes &#x27;a&#x27;. If the answer is &#x27;Steve Jobs&#x27; then the answer you should write is &#x27;steven paul jobs&#x27;.</li>
											<li>All names, places, organizations, things will be as written onWikipedia with a few exceptions. They will mostly be the full nameof the answer.</li>
											<li>All supporting images shall be linked externally or given to you. You will not find anything hidden in the codebase of the game.</li>
											<li>To make it easier, Hawk presents you with 4 different types of Elixirs, that you can buy using your points. However due to a limited supply, there will be a limit on how many Elixirs of each kind you can buy, and you can only use one Elixir on a particular question.</li>
											<li>However, after you reach a certain point, you will be allowed to reset your supply of Elixirs at the cost of your points. However, this will affect your position on the leaderboard, so use your points wisely. </li>
											<li>Hawk will also let you know if you’re on the right track, by indicating that it thinks you’re close, if your answer contains keywords close to the actual answer, or the correct answer partially. </li>
											<li>As you progress through these timelines, the points you get for answering a question also increases. After every third question that you solve, you get 1.5 times more points than you did for the previous ones.</li>
											<li>Cheaters will be found by our monitoring system and will be ineligible for any prizes. Any suspicious behaviour will be reported to us by the game.</li>
											<li>Winners will be decided on the basis of who has the most points at the end of the game and who got there first. Therefore, it’s imperative that you use your Elixirs wisely.</li>
										</ol>
									</div>
									<ul></ul>
								</div>
							)}
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
		
text-align:center;
		align-self: center;
		font-weight:300;
		
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

	.crystal {
		width: 55px;
		height: 55px;
		margin: 3px;
		margin-top: 0;
	}
	.inventory-item {
		font-size: 18px;
		font-family: 'Futura PT Medium';
		margin: 10px;
		display: flex;
	}
	.crystal svg {
		font-size: 5rem !important;
	}
	.Hint {
		font-size: 16px;
		text-align: center;
	}
	.inventory-item-content button {
		font-size: 13px;
		font-family: 'Futura PT Medium';
		:hover {
			cursor: pointer;
		}
		background-image: url(${ButtonBox});
		background-color: transparent;
		background-repeat: no-repeat;
		border: none;
		background-size: 70px 30px;
		color: white;
		width: 70px;
		height: 30px;
	}

	.navbar-btn img {
		transition-duration: 0.4s;
		:hover {
			cursor: pointer;
		
			transform:scale(1.1);
		
		}

		margin: 1vh 1vw 0 0;
		width: 40px;
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
	.inventory {
		border-top: 2px solid #7fd1e0;
		border-right: 2px solid #7fd1e0;
		border-left: 2px solid #7fd1e0;
		z-index: 100;
		position: fixed;
		

		font-family: 'Futura PT Medium';
		bottom: 0;
		min-height: 20vh;
		left: 0;
		right: 0;
		background: rgb(50, 34, 100,0.5);
		
		animation-name: fadeInUp;
		-webkit-animation-name: fadeInUp;
		animation-duration: 1s;
		animation-fill-mode: both;
		-webkit-animation-duration: 1s;
		-webkit-animation-fill-mode: both;
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
		position: absolute;top:0;
		right:1%;
		:hover {
			cursor: pointer;
		}
	}
	#inventory-right {
		display: flex;
		flex-direction: row-reverse;
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
			
			transform:scale(1.05);
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
	.invertory-open {
		font-family: 'Futura PT Medium';
		:hover {
			cursor: pointer;
		}
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 50px;
		width: 200px;
		text-align: center;
		vertical-align: bottom;
		background-image: url(${PullUp});
		background-repeat: no-repeat;

		overflow: hidden;
		text-align: center;
		vertical-align: text-bottom;
	}
	.invertory-open span {
		position: fixed;
		bottom: 0;
		left: 47%;
		font-size: 20px;
		transform: translateX(-50%);
		color: #fff;
	}
	.inventory a {
		margin: 20px 0;
		width: 60px;
		text-align: right;
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

	.Rules li {
		margin-top: 2rem;
		border: 2px solid turquoise;
		border-radius: 2px;
		list-style-type:none;
	}
	.rules-list{
		padding-inline-start: 0;
		padding : 15px;
	}
	.Rules {
		position: fixed;
		top: 10%;
		left: 5%;
		right: 5%;
		bottom: 10%;
		background: #322264;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align:center;
		font-family: sans-serif;

		border-radius: 25px;
		overflow: hidden;
		overflow-y: scroll;
		overflow-wrap: break-word;
	}
	li,
	h1 {
		color: #fff !important;
	}
	.Rules i {
		position: absolute;
		top: 2%;
		right: 2%;
		font-size: 30px;
	}
	

	.Rules::-webkit-scrollbar {
		display: none;
	}
	#Objects {
		transition-duration: 0.4s;
		margin: 1vh 1vw 0 0;
		width: 40px;
		height: 70px;
		:hover{
			transform:scale(1.1);
		}
	}
	.inventory-items{
		
		display:flex;
		flex-wrap:wrap;
	}
	
	@media (min-width: 1181px) {
		.Navbar{
			position:absolute;
		}
		#Objects {
		
		width: 50px;
		height: 70px;
	}
	
	.navbar-btn img{
		width:50px;
		
	}
		.inventory {
			left: 35%;
			right: 35%;
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
		
			margin-top:30px;
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
	.nav-buttons{
		
		margin:0 20px;
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
		.navbar-btn img{
		width:65px;
		
	}
	#Objects{
		width:65px;
	}
		#heading {
			transform: scale(1.5);
		}
		
		#hawklogo {
			width:65px;
			
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

export default Game;
