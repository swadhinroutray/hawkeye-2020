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
import { faWindowClose,faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {leftBar,rightBar} from '../../../assets/landing-assets/index'

 const Game = inject('loginStore')(
	observer(({ loginStore,match }) => {
		useEffect(() => {
			
			loginStore.getProfile()
			
			if((loginStore.profileSetError&&(!loginStore.loggedIn))){
				alert("redirect")
			}
			
			GameplayModel.getQuestion(parseInt(match.params.id));
			loginStore.getInventory()
			
			loginStore.clearErrors();
			GameplayModel.clearMessage()
			
		}, [loginStore,match,GameplayModel]);

		const [rules, setrules] = useState(false);
		const [inventory, getinventory] = useState(false);

		return loginStore.profileSet ?
		 (
			
			<GameWrapper>
				<img id='leftbar' src={leftBar} alt="leftbar"/>  
						<img id='rightbar' src={rightBar} alt="rightbar" />
				<Provider  gameplayStore={GameplayModel}  >
				
					<nav className="Navbar">
					<div className="navbar-btn">
							<a href="/regions"><img id="hawklogo" src={HAWK} alt="Hawk"/></a>
						</div>
						<div id='heading' >HAWKEYE</div>
						<div className="nav-buttons">
						<div className="navbar-btn" onClick={() => setrules(true)}>
					<img id="rule-button" src={RulesIcon} alt="Rules"/>
						</div>
					<div className="navbar-btn" onClick={() => loginStore.logout()}>
							<img src={LogoutIcon} alt="logout"/>
						</div>
						</div>
						
					
						
						

						{(loginStore.profileSetError&&(!loginStore.loggedIn)) ? <Redirect  to={{
              pathname: '/login',
               
            }}  /> : null}
						
					</nav>
					<div className="GameContent">
						<div className="GameWrapper">
							<div className="game-play">
							<QuestionBox getinventory={getinventory} loginStore={loginStore} match={match} />
							<HintsBox />
							<AttemptsBox />
							</div>
							<InventoryBox loginStore={loginStore}  match={match} inventory={inventory} getinventory={getinventory} />
						
							{(!inventory) ? <div className='invertory-open' onClick={()=>{getinventory(true)}} ><span>INVENTORY</span></div>:null}
							{rules && (
								<div className="Rules">
									<h1>Rules</h1>
									<i className="btn-close" onClick={() => setrules(false)}>
									<FontAwesomeIcon icon={faTimes} />
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
		(
			
			{ gameplayStore,inventory,getinventory,match }) => 
			{
				
				useEffect(()=>{
					gameplayStore.getInventory()
				},[gameplayStore])
				return (inventory)? <div className="inventory"><div><div className="close" onClick={()=>{getinventory(false)}}><i className="btn-close" >
				<FontAwesomeIcon icon={faTimes} />
			</i>
</div>

							
							{gameplayStore.itembool[parseInt(match.params.id)]&&(!gameplayStore.potionUsed) ? (gameplayStore.inventory)? <div className="inventory-items">
								
								{gameplayStore.inventory.some(obj=>obj.elixir==0)? <div className="inventory-item"><div className='crystal'><BlueCrystal/></div> <div className="inventory-item-content"><div>Extrahint</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useUnlockHint()}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==1) ? <div className="inventory-item"><div className='crystal'><YellowCrystal/></div><div className="inventory-item-content"><div>RegionMultiplier</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useRegionMultiplier()
								}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==2) ?<div className="inventory-item"><div className='crystal'><PurpleCrystal/></div><div className="inventory-item-content"><div >Hangman</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useHangman()}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==3) ?<div className="inventory-item"><div className='crystal'><RedCrystal/></div><div className="inventory-item-content"><div >Skip Question</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory(); gameplayStore.useSkipQuestion()}}>USE</button></div></div>:null}
								</div>: <div>no potions</div>:<div>potion already used</div>	}</div>
								<a href="/shop"><img id="shop-button" src={ShopIcon} alt="shop"/></a>
								</div>:null
								}

								
		)
)
	

const QuestionBox = inject('gameplayStore')(
	observer(
		({ gameplayStore,match,loginStore ,getinventory}) => (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">Level {gameplayStore.level}</div>
					<div className="Question">{gameplayStore.question}</div>
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
								if (code == 13) {getinventory(false);
									gameplayStore.submit(match.params.id);}
							}}
						></input>
						{(gameplayStore.locked)&&(()=>{gameplayStore.locked=false; return true}) ? (<Redirect to="/login" />) : null}
					</div>
					<button onClick={() => {getinventory(false);loginStore.getProfile();gameplayStore.submit(match.params.id)}}>SUBMIT</button>
					<div className="AnswerStatus">
						<span>{gameplayStore.message}</span>
					</div>
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
							onClick={() => setAttempts(true)}
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
font-family: 'Nidus Sans', sans-serif;
#heading{

	margin-left:15px;
	color:#fff;
	
	font-size:5.5vh;
	align-self: center;
	font-weight:bold;
	font-family: 'Nidus Sans', sans-serif;
	
}


	display:flex;
	flex-direction:column;
	align-items:center;
	margin-bottom:40px;
.Navbar{
	width:100%;
	display:flex;
	justify-content:space-between;
	
	
}
.nav-buttons{
	display:flex;
	
	
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
.Hint{
	font-size:13px;
}
.inventory-item-content button{
font-size:10px;
:hover{
	cursor:pointer;
}
background-image:url(${ButtonBox});
	background-color:transparent;
	background-repeat:no-repeat;
	border:none;
	background-size:70px 30px;
color:#fff;
	width:70px;
	height:30px;
}
.navbar-btn img{
	:hover{
	cursor:pointer;
}
	margin:2vh 3vw 0rem 0rem;
	
	width:40px;
	height:50px;
}
.QuestionBox{
	font-family: 'Nidus Sans', sans-serif;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	width:300px;
max-height:300px;
	padding:30px;
	padding-bottom:68px;
  
	
}

.QuestionWrapper{
	height:110px;
	display:flex;
	flex-direction:column;
	align-items:center;
	text-align:center;


}
.AnswerWrapper{
	margin-top:3px;
	width:100%;
}
.HintsHeader{
	font-family: 'Nidus Sans', sans-serif;
	text-align:center;
	color: #fff;
	font-size:30px;
	
	
}
.Hints{
	display:flex;
	flex-direction:column;
	height:180px;
	text-align:center;
	overflow-y:scroll;
	font-size:13px;
	
}
.Hints::-webkit-scrollbar { 
                display: none; 
            }
.stats::-webkit-scrollbar { 
                display: none; 
            }
.inventory{
	border-top:2px solid #7FD1E0;
	border-right:2px solid #7FD1E0;
	border-left:2px solid #7FD1E0;
	
	position:fixed;
	display:flex;
	justify-content:space-between;
	
	
	bottom: 0;
	min-height:20vh;
	left:0;
	right:0;
	background:#322264;
	animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
	animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
	
}
@keyframes fadeInUp {
    from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInUp {
    from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

.close{
	font-size:20px;
	color: #fff;
	margin:3px;
	:hover{
	cursor:pointer;
}
}
.AnswerField input{
	width:90%;
	height:23px;
	padding:3px 1px;
	text-align:center;
	background-color: Transparent;
	border-right:5px solid #7FD1E0;
	border-left:5px solid #7FD1E0;
	border-top:1px solid #7FD1E0;
	border-bottom:1px solid #7FD1E0;
}
.AnswerWrapper button{
	:hover{
	cursor:pointer;
}
	margin-top:10px;
	background-image:url(${ButtonBox});
	background-color:transparent;
	background-repeat:no-repeat;
	background-size:100% 100%;
	border:none;
	padding:7px;
	height:30px;
	width:82px;
	margin-bottom:5px;
	font-size:9px;
	
}
.selected{
	
}
.AnswerWrapper{
	text-align:center;
}
img{
	width:40px;
	height:40px;
	margin:0 2px;
}
#hawklogo{
	width:60px;
	height:50px;
}
.Question{
	justify-self:flex-end;
	overflow:hidden;
	overflow-y:scroll;
	font-family: 'Nidus Sans', sans-serif;
	font-size:13px;
overflow-wrap:break-word;

}
.Question::-webkit-scrollbar { 
                display: none; 
            }
.Level{
	font-family: 'Nidus Sans', sans-serif;
	color: #fff;
	font-size:3vh;
	
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
	:hover{
		cursor:pointer;
	}
	color: #fff;
	font-size:23px;
	font-family: 'Nidus Sans', sans-serif;
	width:50%;
	text-align:center;
}
.stats{
	display:flex;
	flex-direction:column;

	overflow-y:scroll;
	height:130px;
	margin-top:30px;

}
.invertory-open{
	:hover{
	cursor:pointer;
}
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
	color:#FFF;
}
.inventory a{
	margin:6px;
	width:60px;
}
overflow-x:hidden;
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


.Rules li{
	margin-top:2rem;
}	

	
.Rules{
	position: fixed;
	top:10%;
	left:5%;
	right:5%;
	bottom:10%;
	background:#322264;
	display:flex;
	flex-direction:column;
	align-items:center;

	font-family:sans-serif;
	
	border-radius:25px;
	overflow:hidden;
	overflow-y:scroll;
	overflow-wrap:break-word;
	
}
li,h1{
	color: #fff !important;
}
.Rules i{
	position:absolute;
	top:2%;
	right:2%;
	font-size:30px;
	
}
.inventory-items{
	display:flex;
	flex-direction:column;
	
	
}

.Rules::-webkit-scrollbar { 
                display: none; 
            }
			@media  (min-device-width : 1174px) {
				.inventory{
	left:35%;
	right:35%;

	
	
}
.Attemptsheader div{
	font-size:20px;
}
				.game-play{
					display:flex;
					align-items:center;
					height:70vh;
					left:5%;
					right:5%;
					justify-content:space-between;
					position:fixed;
				}
				#heading{
				margin-left:40px ;
				}
				
				.QuestionBox{
					order:2;
					
				}
				.ActualHints{
			
				order:1
				
					
				}
				.Attempts{
					order:3;
				}
				.Hints{
					height: 130px;
					width:220px;
				}
				.stats{
					width:220px;
				height: 90px;
				}
			}
			@media  (min-device-width : 1346px) {
				.ActualHints{
					
					transform:scale(1.2);
				}
				.Attempts{
					
					transform:scale(1.2);
				}
				.QuestionBox{
					
					transform:scale(1.3)
				}
				.Rules{
					left:30%;
					right:30%;
				}
			}
			@media   (min-device-width : ${size.laptopL}) {
				.QuestionBox, .ActualHints,.Attempts{
					
					transform:scale(1.3);
				}
				.nav-buttons,#hawklogo,#heading{
					transform:scale(1.5);
				}
			}
			@media  (min-device-width : ${size.desktop}) {
				.QuestionBox, .ActualHints,.Attempts{
					transform:scale(1.5);
				}
			}

			@media  (max-device-width : 375px) {
				.QuestionBox, .ActualHints,.Attempts{
					transform:scale(0.85);
				}
			}
 @media  (max-device-width : 330px) {
	.QuestionBox, .ActualHints,.Attempts{
		transform:scale(0.9);
		padding-left:10px;
		padding-right:10px;
	}
	.stats{
		height:125px;
		margin-top:5px;
	}
	#heading{
		margin-left:15px;
	}
	
	
} 
	
#leftbar{
		height: 100% ;
		width:auto;
	position: fixed;
	top: 15%;
	left: 0;
	}
	#rightbar{
		height: 100% ;
		width:auto;
	position: fixed;
	top: 15%;
	right: 0;
	}	

`;

export default Game;