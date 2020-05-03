import { inject, observer, Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import GameplayModel from '../../../models/app/GameplayModel';
import { AttemptsBox, HintsBox, QuestionBox, InventoryBox } from '../../../components/GamePageComponents'
import Qbox from '../../../assets/Qbox.svg';
import LogoutIcon from '../../../assets/LogoutIcon.svg'
import RulesIcon from '../../../assets/RulesIcon.svg'
import HAWK from '../../../assets/HAWK.svg'
import PullUp from '../../../assets/PullUp.svg'
import ButtonBox from '../../../assets/ButtonBox.svg'
import Attempts from '../../../assets/Attempts.svg'
import ReactLoading from 'react-loading';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { leftBar, rightBar } from '../../../assets/landing-assets/index'
import { Link } from 'react-router-dom'
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';
const Game = inject('loginStore')(
	observer(({ loginStore, match }) => {
		useEffect(() => {

			loginStore.getProfile()



			GameplayModel.getQuestion(parseInt(match.params.id));
			loginStore.getInventory()

			loginStore.clearErrors();
			GameplayModel.clearMessage()

		}, [loginStore, match, GameplayModel]);

		const [rules, setrules] = useState(false);
		const [inventory, getinventory] = useState(false);

		return loginStore.profileSet ?
			(

				<GameWrapper>
					<img id='leftbar' src={leftBar} alt="leftbar" />
					<img id='rightbar' src={rightBar} alt="rightbar" />
					<Provider gameplayStore={GameplayModel}  >

						<div className="Navbar">
							<div className="navbar-btn">
								<a href="/regions"><img id="hawklogo" src={HAWK} alt="Hawk" /></a>
							</div>
							<div id='heading' ><a style={{ color: "white", textDecoration: "none" }} href="/regions">HAWKEYE</a></div>
							<div className="nav-buttons">
								<div className="navbar-btn" onClick={() => setrules(true)}>
									<img id="rule-button" src={RulesIcon} alt="Rules" />
								</div>
								<div className="navbar-btn" onClick={() => loginStore.logout()}>
									<img src={LogoutIcon} alt="logout" />
								</div>
							</div>





							{(loginStore.profileSetError && (!loginStore.loggedIn)) ? <Redirect to={{
								pathname: '/login',

							}} /> : null}

						</div>
						<div className="GameContent">
							<div className="GameWrapper">
								<div className="game-play">

									<QuestionBox getinventory={getinventory} match={match} />

									<HintsBox />
									<AttemptsBox />
								</div>
								<InventoryBox loginStore={loginStore} match={match} inventory={inventory} getinventory={getinventory} />

								{(!inventory) ? <div className='invertory-open' onClick={() => { getinventory(true) }} ><span>INVENTORY</span></div> : null}
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
					<Link className="back" to="/regions">
						<BackButton />
					</Link>
				</GameWrapper>
			) : (<GameWrapper><ReactLoading type={"spin"} color={"#3abdb7"} className="loading" />{(loginStore.profileSetError && (!loginStore.loggedIn)) ? <Redirect to="/login" /> : null}</GameWrapper>)
	})
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
overflow:hidden;
#heading{
	
	
	color:#fff;
	letter-spacing:2px;
	
	align-self: center;
	font-weight:bold;
margin-top:1vh;
font-size:2rem;

}


	display:flex;
	flex-direction:column;
	align-items:center;
	margin-bottom:50px;
.Navbar{
	width:100%;
	display:flex;
	justify-content:space-between;
	
	
}
.back{
	z-index:-100;
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
	font-size:18px;
	font-family: "Futura PT Medium";
	margin-top:10px;
	display:flex;

}
.crystal svg{
	font-size:5rem!important;
}
.Hint{
	font-size:13px;
	text-align:center;
}
.inventory-item-content button{
font-size:13px;
font-family: "Futura PT Medium";
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

margin:1vh 1vw 0 0;
	width:40px;
	height:70px;
}
.QuestionBox{
	font-family: "Futura PT Medium";
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	
	background-image:url(${Qbox});
	background-repeat:no-repeat;
	background-size:100% 100%;
	width:300px;
max-height:300px;
	padding:30px;
  
	
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
	font-family: "Futura PT Heavy";
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
	
	font-family: "Futura PT Medium";
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
	margin:1px;
	text-align:right;
	:hover{
	cursor:pointer;
}
}
#inventory-right{
	display:flex;
	flex-direction:row-reverse;
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
	font-family: "Futura PT Medium"
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
	font-family: "Futura PT Medium"
	
}
.selected{
	
}
.AnswerWrapper{
	font-family: "Futura PT Medium";
	text-align:center;
}
img{
	width:40px;
	height:40px;
	margin:0 2px;
}
#hawklogo{
	width:60px;
	height:70px;
}
.Question{
	justify-self:flex-end;
	overflow:hidden;
	overflow-y:scroll;
	font-family: "Futura PT Medium";
	font-size:15px;
overflow-wrap:break-word;

}
.AnswerStatus{
	height:20px;
}
.Question::-webkit-scrollbar { 
                display: none; 
            }
.Level{
	font-family: "Futura PT Heavy";
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
	font-family: "Futura PT Medium";
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
	font-family: "Futura PT Heavy";
	width:50%;
	text-align:center;
}
.stats{
	font-family: "Futura PT Medium";
	display:flex;
	flex-direction:column;

	overflow-y:scroll;
	height:130px;
	margin-top:30px;

}
.invertory-open{
	font-family: "Futura PT Medium";
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
	margin:20px 0;
	width:60px;
	text-align:right;
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
			#Objects{
				transform: translateX(-17%);
				width:3rem;
				height:3rem;
				
			}
			@media  (min-width : 1181px) {
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
					position:relative;
					
					justify-content:space-between;
					width: 90vw;
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
					font-family: "Futura PT Medium";
					height: 130px;
					width:220px;
				}
				.stats{
					width:220px;
				height: 90px;
				}
			}
			@media  (min-width : 1181px) {
				.ActualHints{
					
					transform:scale(1.2);
				}
				.Attempts{
					
					transform:scale(1.2);
				}
				#heading{
					transform:scale(1.4);
				}
				.QuestionBox{
					
					transform:scale(1.3)
				}
				.Rules{
					left:30%;
					right:30%;
				}
			}
			@media   (min-width : ${size.laptopL}) {
				.QuestionBox, .ActualHints,.Attempts{
					
					transform:scale(1.3);
				}
				.nav-buttons,#heading{
					transform:scale(1.5);
					
				}
				.nav-buttons img{
					margin:2vh 2vw 0 0;
				}
				#hawklogo{
					margin:2vh 0 0 1vw;
				}
			}
			@media  (min-width : ${size.desktop}) {
				.QuestionBox, .ActualHints,.Attempts{
					transform:scale(1.5);
				}
			}

			@media  (max-width : 375px) {
				.QuestionBox, .ActualHints,.Attempts{
					transform:scale(0.85);
				}
			}
 @media  (max-width : 330px) {
	 #hawklogo{
		margin-right:0;
	}
	 .ActualHints,.Attempts{
		transform:scale(0.8);
		
	}
	
	#heading{
		font-size:1.5rem;
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
.loading{
margin:50vh auto;
}
`;

export default Game;