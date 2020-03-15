import { inject, observer, Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import  GameplayModel  from '../../../models/app/GameplayModel';
import YellowCrystal from '../../../components/YellowCrystal';
import BlueCrystal from '../../../components/BlueCrystal';
import PurpleCrystal from '../../../components/PurpleCrystal';
import RedCrystal from '../../../components/RedCrystal';
import Qbox from '../../../assets/Qbox.svg';
import LogoutIcon from '../../../assets/LogoutIcon.svg'
import RulesIcon from '../../../assets/RulesIcon.svg'
import HAWK from '../../../assets/HAWK.svg'
import PullUp from '../../../assets/PullUp.svg'
 const Game = inject('loginStore')(
	observer(({ loginStore,match }) => {
		useEffect(() => {
			if(!loginStore.profileSet){
			loginStore.getProfile()
			}
			GameplayModel.getQuestion(match.params.id);
			loginStore.getInventory()
			loginStore.clearErrors();
			
		}, [loginStore,match,GameplayModel]);

		const [invertory, setInvertory] = useState(false);

		return loginStore.profileSet ?
		 (
			
			<GameWrapper>
				
				<Provider gameplayStore={GameplayModel}>
					<nav className="Navbar">
					
					<div className="navbar-btn" onClick={() => loginStore.logout()}>
							<img src={LogoutIcon} alt="logout"/>
						</div>
						
					<div className="navbar-btn" onClick={() => setInvertory(true)}>
					<img id="rule-button" src={RulesIcon} alt="Rules"/>
						</div>
						<div>HAWKEYE</div>
						<div className="navbar-btn">
							<a href="/regions"><img src={HAWK} alt="Hawk"/></a>
						</div>

						{(loginStore.profileSetError&&(!loginStore.loggedIn)) ? <Redirect to="/login" /> : null}
					</nav>
					<div className="GameContent">
						<div className="GameWrapper">
							<QuestionBox match={match} />
							<HintsBox />
							<AttemptsBox />
							
							<div className='invertory-open' ><div>INVENTORY</div></div>
							{invertory && (
								<div className="Rules">
									<h1>Rules</h1>
									<i className="btn-close" onClick={() => setInvertory(false)}>
										x
									</i>
									<div className="Rules-content">
										<ol>
											<li>Rule</li>
											<li>Rule</li>
											<li>Rule</li>
											<li>Rule</li>
										</ol>
									</div>
									<ul></ul>
								</div>
							)}
						</div>
					</div>
					
				</Provider>
			</GameWrapper>
	):(<div>loading{(loginStore.profileSetError&&(!loginStore.loggedIn)) ? <Redirect to="/login" /> : null}</div>)
	})
);


const QuestionBox = inject('gameplayStore')(
	observer(
		({ gameplayStore,match }) => (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">Level {gameplayStore.level}</div>
					<div className="Question">{gameplayStore.question}hgf r grgr rgr rt rttwe twet wtwetwet wet wetwee twetwetwet weet wee wtewtwe twetwetewt  wtwtwe w twtwe wtwt we t wrrt wwtwtwewee fdbf bgbd gfegegb bfdgfdgfd fbfdbfdbfd  vfdvfd dfsdt tw we twe we we rwerwe wer we wee tw tww tw twe twt wetweet</div>
				</div>
				<div className="AnswerWrapper">
					<div className="AnswerField">
						<input
							name="answer"
							type="text"
							placeholder="Answer here"
							value={gameplayStore.currentAnswer}
							onChange={e => gameplayStore.setCurrentAnswer(e.target.value)}
							onKeyPress={e => {
								const code = e.keyCode || e.which;
								if (code == 13) gameplayStore.submit(match.params.id);
							}}
						></input>
						<button onClick={() => gameplayStore.submit(match.params.id)}>Submit</button>
					</div>
					<span className="AnswerStatus">
						<span>{gameplayStore.message}</span>
					</span>
				</div>
			</div>
		)
	)
);



const HintsBox = inject('gameplayStore')(
	observer(
		({ gameplayStore}) => (
			<div className="HintsBox ActualHints">
				<h1 className="HintsHeader">Hints</h1>
				<div className="Hints">
					{gameplayStore.hints.map((hint, i) => (
						<span className="Hint" key={i}>
							{hint}
						</span>
					))}
				</div>
			</div>
		)
	)
);

const AttemptsBox = inject('gameplayStore')(
	observer(
		({ gameplayStore}) => {
			const [attempts, setAttempts] = useState(true);

			return (
				<div className="HintsBox Attempts">
					<div className="AttemptsHeader">
						<div
							className={attempts ? 'selected' : ''}
							onClick={() => setAttempts(true)}
						>
							Attempts
						</div>
						<div
							className={!attempts ? 'selected' : ''}
							onClick={() => setAttempts(false)}
						>
							Stats
						</div>
					</div>
					<div className="Hints">
						{attempts ? (
							gameplayStore.attempts.map((hint, i) => (
								<span className="Hint" key={i}>
									{hint}
								</span>
							))
						) : (
							<>
								<span className="Hint">At Par: {gameplayStore.stats.atPar}</span>
								<span className="Hint">Leading: {gameplayStore.stats.leading}</span>
								<span className="Hint">Trailing: {gameplayStore.stats.trailing}</span>
							</>
						)}
					</div>
				</div>
			);
		}
	)
);

const GameWrapper = styled.div`


	display:flex;
	flex-direction:column;
	align-items:center;
	margin-bottom:40px;
.Navbar{
	width:100%;
	display:flex;
	flex-direction:row-reverse;
	
	
}
.navbar-btn{
	margin:10px 5px;
	width:50px;
	height:50px;
}
.QuestionBox{
	display: inline-block;
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	
	background-size:cover;
	padding:30px;
    padding-bottom: calc(100% * 1 / 5);
	max-height:200px;
	max-width:300px;
}
img{
	max-width:50px;
	max-height:50px;
}
.Question{
overflow-wrap:break-word;

}
.ActualHints{
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	
	background-size:cover;
	overflow:hidden;

	overflow-wrap:break-word;
	padding:30px;
    padding-bottom: calc(100% * 1.9 / 5);
	max-height:200px;
	max-width:300px;
}
.Attempts{
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	
	background-size:cover;
	overflow:hidden;

	overflow-wrap:break-word;
	padding:30px;
    padding-bottom: calc(100% * 2.5 / 5);
	margin-bottom:10px;
	max-height:200px;
	max-width:300px;
}
.invertory-open{
	position:fixed;
	bottom: 0;
	left:30px;
	right:30px;
	height:40px;
	
	padding-bottom:calc(100% * 0.5 / 5);
	background-image:url(${PullUp});
	background-repeat:no-repeat;
	
	background-size:cover;
	overflow:hidden;
	text-align:center;
	vertical-align:text-bottom;
}
.invertory-open div{
	position: absolute;
	bottom: 0;
	left:0;
	right:0;
	text-align:center;
  
}
.slider {
	background:white;
	position:fixed;
	bottom: 0;
	overflow-y: hidden;
	max-height: 500px; /* approximate max height */

	transition-property: all;
	transition-duration: .5s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slider.closed {
	max-height: 0;
}
#pullup{
	height:40px;
	width:100px;
	padding-bottom: calc(100% * 2.5 / 5);
}

@media only screen and (min-device-width : 768px) {
	.QuestionBox{
	max-width:400px;
	max-height:150px;
	padding-bottom: calc(100% * 2 / 5);
	}
	.ActualHints{
	
	
	max-width:400px;
max-height:150px;
padding-bottom: calc(100% * 2.3 / 5);
}
.Attempts{
	
	
	max-width:400px;
max-height:150px;
margin-bottom:50px;
padding-bottom: calc(100% * 4.8 / 8);
}
}

/* @media only screen and (min-device-width : 768px) {
	display: block;
	.GameWrapper{
		display:flex;
	}
	.QuestionBox{
		background-size:450px,150px;
	
	max-width:400px;
	max-height:150px;
	
	}
	.ActualHints{
	
		
	padding-bottom:0;
	min-width:400px;
	;
	padding-bottom: calc(100% * 0.6 / 5);
	
	max-height:150px;
	
} */
	
	@media only screen and (max-device-width : 340px) {
		.QuestionBox{
			padding-bottom: calc(100% * 0.7 / 5);
		}
		.ActualHints{
			padding-bottom: calc(100% * 1.75 / 5);
		}
		.Attempts{
			padding-bottom: calc(100% * 2.4 / 5);
			margin-bottom:20px;
		}
	}

`;
export default Game;