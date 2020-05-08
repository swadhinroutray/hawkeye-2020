import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
export const QuestionBox = inject(
	'gameplayStore',
	'loginStore',
)(
	observer(({ gameplayStore, loginStore }) => {
		useEffect(() => {
			if (gameplayStore.message === 'Hawk approves!')
				setTimeout(() => {
					gameplayStore.message = '';
				}, 3000);
		});
		return (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">LEVEL {gameplayStore.nestLevel}</div>
					<br />
					<div style={{ color: 'white' }} className="Question">
						{gameplayStore.question}
					</div>
				</div>
				<div className="AnswerWrapper">
					<div className="AnswerField">
						<input
							autoComplete="off"
							name="answer"
							type="text"
							placeholder="Answer here"
							value={gameplayStore.currentAnswer}
							onChange={e => gameplayStore.setCurrentAnswer(e.target.value)}
							onKeyPress={e => {
								const code = e.keyCode || e.which;
								if (code === 13) {
									gameplayStore.submit();
								}
							}}
						></input>
						{gameplayStore.locked &&
						(() => {
							gameplayStore.locked = false;
							return true;
						}) ? (
							<Redirect to="/login" />
						) : null}
					</div>
					<button
						style={{ color: 'white' }}
						onClick={() => {
							loginStore.getProfile();
							gameplayStore.submit();
						}}
					>
						SUBMIT
					</button>
					<div>{gameplayStore.nestlevel}</div>

					<div className="AnswerStatus">
						{gameplayStore.message === 'Hawk approves!' && (
							<div style={{ color: '#90ee90' }}>{gameplayStore.message}</div>
						)}
						{gameplayStore.message === 'Hawk disapproves.' && (
							<div style={{ color: '#ff6666' }}>{gameplayStore.message}</div>
						)}
						{gameplayStore.message === `Hawk thinks you're close.` && (
							<div style={{ color: 'yellow' }}>{gameplayStore.message}</div>
						)}
					</div>
				</div>
			</div>
		);
	}),
);
