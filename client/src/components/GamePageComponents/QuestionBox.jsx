import React from 'react';
import { inject, observer} from 'mobx-react';
import { Redirect } from 'react-router';
export const QuestionBox = inject('gameplayStore')(
	observer(
		({ gameplayStore,match,loginStore ,getinventory}) => (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">LEVEL {gameplayStore.level}</div>
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