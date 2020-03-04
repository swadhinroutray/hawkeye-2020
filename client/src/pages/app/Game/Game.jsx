import { inject, observer, Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import  GameplayModel  from '../../../models/app/GameplayModel';
import { LoginModel } from '../../../models/app/LoginModel';




 const Game = inject('loginStore')(
	observer(({ loginStore }) => {
		

		const [rules, setRules] = useState(false);

		return (
			<GameWrapper>
				<Provider gameplayStore={GameplayModel}>
					<nav className="Navbar">
						<div className="navbar-btn" onClick={() => setRules(true)}>
							Rules
						</div>
						<div className="navbar-btn" onClick={() => loginStore.logout()}>
							Logout
						</div>
						{!loginStore.loggedIn ? <Redirect to="/login" /> : null}
					</nav>
					<div className="GameContent">
						<div className="GameWrapper">
							<QuestionBox />
							<HintsBox />
							<AttemptsBox />
							{rules && (
								<div className="RulesBox">
									<h1>Rules</h1>
									<i className="btn-close" onClick={() => setRules(false)}>
										x
									</i>
									<div className="RulesBox-content">
										<ol>
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
		);
	})
);


const QuestionBox = inject('gameplayStore')(
	observer(
		({ gameplayStore }) => (
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
								if (code == 13) gameplayStore.submit();
							}}
						></input>
						<button onClick={() => gameplayStore.submit()}>Submit</button>
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
			<div className="HintsBox">
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
	
`;
export default Game;