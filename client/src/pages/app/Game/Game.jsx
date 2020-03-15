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
import ButtonBox from '../../../assets/ButtonBox.svg'
import Attempts from '../../../assets/Attempts.svg'
import ShopIcon from '../../../assets/ShopIcon.svg'
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

		const [rules, setrules] = useState(false);
		const [inventory, getinventory] = useState(false);
		return loginStore.profileSet ?
		 (
			
			<GameWrapper>
				
				<Provider  gameplayStore={GameplayModel} >
					<nav className="Navbar">
					
					<div className="navbar-btn" onClick={() => loginStore.logout()}>
							<img src={LogoutIcon} alt="logout"/>
						</div>
						
					<div className="navbar-btn" onClick={() => setrules(true)}>
					<img id="rule-button" src={RulesIcon} alt="Rules"/>
						</div>
						<div id='heading' >HAWKEYE</div>
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
							<InventoryBox loginStore={loginStore} match={match} inventory={inventory} getinventory={getinventory} />
							{(!inventory) ? <div className='invertory-open' onClick={()=>{getinventory(true)}} ><span>Inventory</span></div>:null}
							{rules && (
								<div className="Rules">
									<h1>Rules</h1>
									<i className="btn-close" onClick={() => setrules(false)}>
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

const InventoryBox = inject('gameplayStore')(
	observer(
		({ loginStore,gameplayStore,inventory,getinventory,match }) => 
			{return (inventory)? <div className="inventory"><div><div className="close" onClick={()=>{getinventory(false)}}>x</div>
							
							{loginStore.profile.itembool[parseInt(match.params.id)] ? gameplayStore.inventory? <div className="inventory-items">
								
								{gameplayStore.inventory.some(obj=>obj.elixir==0)? <div className="inventory-item"><div className='crystal'><BlueCrystal/></div> <div className="inventory-item-content"><div>Extrahint</div><button onClick={()=>{gameplayStore.useUnlockHint();loginStore.getProfile()}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==1) ? <div className="inventory-item"><div className='crystal'><YellowCrystal/></div><div className="inventory-item-content"><div>RegionMultiplier</div><button onClick={()=>{gameplayStore.useRegionMultiplier();loginStore.getProfile()
								}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==2) ?<div className="inventory-item"><div className='crystal'><PurpleCrystal/></div><div className="inventory-item-content"><div>Hangman</div><button>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==3) ?<div className="inventory-item"><div className='crystal'><RedCrystal/></div><div className="inventory-item-content"><div>Swadhin gay</div><button>USE</button></div></div>:null}
								</div>: <div>no potions</div>:<div>potion already used</div>	}</div>
								<a href="/shop"><img id="shop-button" src={ShopIcon} alt="shop"/></a>
								</div>:null
								}

								
		)
)
	

const QuestionBox = inject('gameplayStore')(
	observer(
		({ gameplayStore,match }) => (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">Level {gameplayStore.level}</div>
					<div className="Question">{gameplayStore.question}hgfwtwewee fdbf bgbd gfegegb bfdgfdgfd fbfdbfdbfd  vfdvfd dfsdt tw we twe we we rwerwe wer we wee tw tww tw twe twt wetweet</div>
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
						{(gameplayStore.locked) ? <Redirect to="/login" /> : null}
					</div>
					<button onClick={() => gameplayStore.submit(match.params.id)}>SUBMIT</button>
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
				<div className="HintsHeader">Hints</div>
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
					<div className="Attemptsheader">
						<div
						id="attemptsHead"
							className={attempts ? 'selected' : ''}
					AttemptsH		onClick={() => setAttempts(true)}
						>
							Attempts
						</div>
						<div
						id="statsHead"
							className={!attempts ? 'selected' : ''}
							onClick={() => setAttempts(false)}
						>
							Stats
						</div>
					</div>
					<div className="stats">
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
#heading{
	color:#fff;
	align-self: center;
	font-size:5vh;
}

	display:flex;
	flex-direction:column;
	align-items:center;
	margin-bottom:40px;
.Navbar{
	width:100%;
	display:flex;
	flex-direction:row-reverse;
	
	
}
.crystal{
	width:55px;
	height:55px;
	margin:3px;
	margin-top:0;
}
.inventory-item{
	margin-top:10px;
	display:flex;
}
.inventory-item-content button{
font-size:10px;

background-image:url(${ButtonBox});
	background-color:transparent;
	background-repeat:no-repeat;
	border:none;
	background-size:70px 30px;
color:#fff;
	width:70px;
	height:30px;
}
.navbar-btn{
	margin:10px 5px;
	width:50px;
	height:50px;
}
.QuestionBox{
	
	display:flex;
	flex-direction:column;
	
	align-items:center;
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	width:300px;
max-height:300px;
	padding:30px;
  
	
}

.QuestionWrapper{
	min-height:148px;
	text-align:center;


}
.AnswerWrapper{
	margin-top:3px;
	width:100%;
}
.HintsHeader{
	text-align:center;
	color: #fff;
	font-size:30px;
	letter-spacing:1px;
	
}
.Hints{
	display:flex;
	flex-direction:column;
	height:200px
	
}
.inventory{
	border-top:2px solid #7FD1E0;
	position:fixed;
	display:flex;
	justify-content:space-between;
	bottom: 0;
	min-height:20vh;
	left:0;
	right:0;
	background:#322264;

}
.close{
	font-size:20px;
	color: #fff;
}
.AnswerField input{
	width:90%;
	
	
	background-color: Transparent;
	border-right:5px solid #7FD1E0;
	border-left:5px solid #7FD1E0;
	border-top:2px solid #7FD1E0;
	border-bottom:2px solid #7FD1E0;
}
.AnswerWrapper button{
	margin-top:10px;
	background-image:url(${ButtonBox});
	background-color:transparent;
	background-repeat:no-repeat;
	background-size:cover;
	border:none;
	padding:7px;
	height:30px;
	width:82px;
	margin-bottom:5px;
	font-size:13px;
	
}
.selected{
	
}
.AnswerWrapper{
	text-align:center;
}
img{
	max-width:50px;
	max-height:50px;
}
.Question{
	
overflow-wrap:break-word;

}
.Level{
	color: #fff;
	font-size:3vh;
	letter-spacing:1px;
}
.ActualHints{
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	
	
	overflow:hidden;

	overflow-wrap:break-word;
	padding:30px;
    ;
	
	
}
.Attempts{
	background-image:url(${Attempts});
	background-repeat:no-repeat;
	
	
	overflow:hidden;

	overflow-wrap:break-word;
	padding:30px;
  
	
	padding-top:10px;
	max-width:300px;
}
.Attemptsheader{
	display:flex;
	
}
.Attemptsheader div{
	color: #fff;
	font-size:25px;
	width:50%;
	text-align:center;
}
.stats{
	display:flex;
	flex-direction:column;
	height:230px;
	margin-top:30px;

}
.invertory-open{
	position:fixed;
	bottom: 0;
	left:50%;
	transform: translateX(-50%);
	height:50px;
	width:200px;
	text-align:center;
	vertical-align:bottom;
	background-image:url(${PullUp});
	background-repeat:no-repeat;
	

	overflow:hidden;
	text-align:center;
	vertical-align:text-bottom;
}
.invertory-open span{
	position:fixed;
	bottom: 0;
	left:47%;
	font-size:20px;
	transform: translateX(-50%);
}
.inventory a{
	margin:6px;
	width:60px;
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


	.Navbar{
		justify-content:center;
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
	
	

`;
export default Game;