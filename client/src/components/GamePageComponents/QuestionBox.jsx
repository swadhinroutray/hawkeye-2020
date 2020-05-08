import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
export const QuestionBox = inject('gameplayStore','loginStore')(

	observer(
		({ gameplayStore,match,loginStore ,getinventory}) => {
			
			useEffect(() => {
				if(gameplayStore.message==='Hawk approves!'||gameplayStore.message==='Hawk disapproves.')
					setTimeout(()=>{gameplayStore.message=''},3000)
			})
			return (
			<div className="QuestionBox">
				<div className="QuestionWrapper">
					<div className="Level">LEVEL {gameplayStore.level}</div>
					<br />
					<div style={{ color: 'white' }} className="Question">
						{gameplayStore.question}
					</div>
				</div>
				<div className="AnswerWrapper">
					<div className="AnswerField">
						<input
						style={{marginBottom:0}}
						autoComplete="off"
							name="answer"
							type="text"
							placeholder="Answer here"
							value={gameplayStore.currentAnswer}
							onChange={e => gameplayStore.setCurrentAnswer(e.target.value)}
							onKeyPress={e => {
								const code = e.keyCode || e.which;
								if (code === 13) {
									getinventory(false);
									gameplayStore.submit(match.params.id);
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
						<div style={{color:"white",minHeight:"2px",marginBottom:"10px",marginTop:"10px",overflowWrap:"break-word"}}>{gameplayStore.hangman}</div>
					<button style={{color:"white"}}  onClick={() => {getinventory(false);loginStore.getProfile();gameplayStore.submit(match.params.id)}}>SUBMIT</button>
					<div style={{marginTop:"2px"}} className="AnswerStatus">
						{gameplayStore.message==='Hawk approves!'&&<div style={{color:"#90ee90"}} >{gameplayStore.message}</div>}
						{gameplayStore.message==='Hawk disapproves.'&&<div style={{color:"#ff6666"}} >{gameplayStore.message}</div>}
						{gameplayStore.message===`Hawk thinks you're close.`&&<div style={{color:"yellow"}} >{gameplayStore.message}</div>}
						
					</div>
				</div>
			</div>
		);
	}),
);
