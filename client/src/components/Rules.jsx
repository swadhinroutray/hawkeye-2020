import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import ShopHud from '../assets/ShopHud.svg';
export default class Rules extends React.Component {
	constructor(props) {
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}

	escFunction(event) {
		if (event.keyCode === 27 || event.c) {
			this.props.setrules(false);
		}
	}
	componentDidMount() {
		document.addEventListener('keydown', this.escFunction, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction, false);
	}
	render() {
		return (
			<RulesWrapper>
				<div className="Rules">
					<h1 style={{ color: 'white', margin: 0 }}>Rules</h1>
					<div className="Rules-content">
						<i
							style={{ color: 'white' }}
							className="btn-close"
							onClick={e => this.props.setrules(false)}
						>
							<FontAwesomeIcon style={{ color: 'white' }} icon={faTimes} />
						</i>

						<h2 style={{ color: 'white' }}> Welcome to HawkEye'20 </h2>

						<div style={{ color: 'white' }} className="rules-list">
							<div
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									color: 'white',
									fontSize: '30px',
								}}
							>
								Gameplay
							</div>

							<div style={{ color: 'white' }}>
								1) This is an online scavenger hunt, it starts at 9/5/20 12:00
								PM and ends on 12/5/20 11:59 PM
							</div>
							<div style={{ color: 'white' }}>
								2) Due to a mishap with the time portal, you have been randomly
								dropped into one of the 5 total timelines that have been
								created.
							</div>
							<div style={{ color: 'white' }}>
								3)The next timeline(region) will be made available after a
								certain period of time. You can unlock them faster if you solve
								the questions of your current timeline early.
							</div>
							<div style={{ color: 'white' }}>
								4) If the answer is &#34;22 Cakes&#34; then the answer you
								should write is &#34;twotwo cakes&#34;. If the answer contains
								special characters, replace them to the nearest character. For
								example, &#x27;&#x101;&#x27; becomes &#x27;a&#x27;. If the
								answer is &#x27;Steve Jobs&#x27; then the answer you should
								write is &#x27;steven paul jobs&#x27;.
							</div>
							<div style={{ color: 'white' }}>
								5) All names, places, organizations, things should be as appears
								on Wikipedia with a few exceptions. They will mostly be the full
								name of the person, place or thing.
							</div>
							<div style={{ color: 'white' }}>
								6)All supporting images shall be linked externally or given to
								you. You will not find anything hidden in the codebase of the
								game.
							</div>

							<div style={{ color: 'white' }}>
								7)Hawk will also let you know if you’re on the right track, by
								indicating that it thinks you’re close, if your answer contains
								keywords close to the actual answer, or the correct answer
								partially.
							</div>
							<div style={{ color: 'white' }}>
								8) Cheaters will be found by our monitoring system and will be
								ineligible for any prizes. Any suspicious behaviour will be
								reported to us by the game.
							</div>
							<div
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									color: 'white',
									fontSize: '30px',
								}}
							>
								Ranking & Points
							</div>
							<div style={{ color: 'white' }}>
								1) You will receive points for every question you solve. The
								leaderboard is calculated based on the total points you have,
								and NOT the number of questions you have solved.
							</div>
							<div style={{ color: 'white' }}>
								2) As you progress through these timelines, the points you get
								for answering a question also increases. After every fifth
								question that you solve, you get 1.25 times more points than you
								did for the previous ones.
							</div>
							<div style={{ color: 'white' }}>
								3) To make it interesting, Hawk presents you with 4 different
								types of Elixirs, that you can buy using your points. However,
								due to a limited supply, there are only a few Elixirs of each
								kind you can buy. You can only use one Elixir on a particular
								question.
							</div>
							<div style={{ color: 'white' }}>
								4) However, after you reach a certain point, you will be allowed
								to reset your supply of Elixirs at the cost of your points. But
								this will affect your position on the leaderboard, so use your
								points wisely.
							</div>
							<div style={{ color: 'white' }}>
								5) Winners will be decided on the basis of who has the most
								points at the end of the game and who got there first.
								Therefore, it’s imperative that you buy and use your Elixirs
								wisely.
							</div>
							<div
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									color: 'white',
									fontSize: '30px',
								}}
							>
								Elixirs
							</div>
							<div
								style={{
									color: '#F2AD00',
									fontWeight: 'bold',
									fontSize: '20px',
								}}
							>
								Extra Hint - 30 points
							</div>
							<div style={{ color: 'white' }}>
								- If you’re stuck on a question, you can get an extra hint that
								is completely different from the default hints of the question.
							</div>
							<div
								style={{
									color: '#F2AD00',
									fontWeight: 'bold',
									fontSize: '20px',
								}}
							>
								Region Multiplier - 60 points
							</div>
							<div style={{ color: 'white' }}>
								- This elixir gives you an opportunity to score 1.5x times the
								points that were previously allotted to the questions. This
								elixir is valid ONLY for all questions in that particular
								region. The multiplier starts from the question, at which it is
								applied.
							</div>
							<div
								style={{
									color: '#F2AD00',
									fontWeight: 'bold',
									fontSize: '20px',
								}}
							>
								Hangman - 20 points
							</div>
							<div style={{ color: 'white' }}>
								- Hangman like the classic game gives you the letters of the
								answer with blanks in between. This way you get a chance to get
								to the answer, using a few letters of the actual answer!
							</div>
							<div
								style={{
									color: '#F2AD00',
									fontWeight: 'bold',
									fontSize: '20px',
								}}
							>
								Skip Question -50 Points
							</div>
							<div style={{ color: 'white' }}>
								- For the first time ever, Hawk gives you the opportunity to
								skip a question! Remember that this will not count as an
								answered question, and points will not be added for it.
							</div>
							<div
								style={{
									fontWeight: 'bold',
									textAlign: 'center',
									fontSize: '25px',
								}}
							>
								For any issues, contact one of the following
							</div>
							<div className="Contact">
								<div className="single-contact">
									<div>Swadhin Routray</div>
									<div>7676598351</div>{' '}
								</div>
								<div className="single-contact">
									<div>Chakradhar Reddy</div> <div>9515334754</div>
								</div>
								<div className="single-contact">
									<div>Keoul Patel</div>
									<div> 8291416388</div>
								</div>
								<div className="single-contact">
									<div>Dennis Johnson</div>
									<div> 9048044761</div>
								</div>
								<div className="single-contact">
									<div>Sanchit Sahay</div> <div>8817137466</div>
								</div>
								<div className="single-contact">
									<div>Devesh Mahajan</div> <div>9953512577</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</RulesWrapper>
		);
	}
}
const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};
const RulesWrapper = styled.div`
	letter-spacing: 0;
	background: rgba(0, 0, 0, 0.9);
	box-sizing: border-box;
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 10000;
	left: 0;
	right: 0;
	text-align: center;
	color: white;
	.Rules {
		overflow: hidden;
		// overflow-y: scroll;
		position: absolute;
		top: 5%;
		bottom: 2%;
		left: 25%;
		right: 25%;
		box-sizing: border-box;
		padding: 3rem;
		::-webkit-scrollbar {
			display: none;
		}
		background: url(${ShopHud}) no-repeat;
		background-size: 100% 100%;
		-o-background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
	}
	.Rules i {
		color: white;

		padding: 2px 6px;
		position: absolute;
		margin: 1rem;
		top: 0;
		right: 0;
		color: white !important;
		font-size: 30px;
		:hover {
			cursor: pointer;
		}
	}
	.Rules path {
		color: white;
	}
	.Rules-content div {
		text-align: left;
	}
	.Rules-content {
		font-family: 'Futura PT Medium';
		height: 90%;
		font-size: 20px;
		overflow: hidden;
		overflow-y: scroll;
		::-webkit-scrollbar {
			display: none;
		}
	}
	.rules-list div {
		margin-top: 1rem;
	}

	.rules-list {
		color: white;
		text-align: left;
	}
	.Contact {
		* {
			color: white;
		}

		margin: 0 auto;

		display: flex;

		font-size: 20px !important;

		flex-wrap: nowrap;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.Contact > .single-contact {
		margin: 1rem auto;
		font-weight: 800;

		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin: 0.3rem;
	}
	.Contact > h4 > div {
		margin: 0;
	}
	@media (max-width: ${size.laptop}) {
		.Rules {
			left: 5%;
			right: 5%;
		}
	}
	@media (max-width: ${size.laptopL}) {
		.Rules i {
			font-size: 25px;
			margin: 1rem 1.5rem;
		}
	}
`;
