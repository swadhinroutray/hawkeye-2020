import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
export const AttemptsBox = inject('gameplayStore')(
	observer(
		({ gameplayStore}) => {
			const [attempts, setAttempts] = useState(true);

			return (
				<div className="HintsBox Attempts">
					<div className="Attemptsheader">
						<div
						id="attemptsHead"
						style={!attempts?{color:"grey"}:{}}
							className={attempts ? 'selected' : ''}
							onClick={() => setAttempts(true)}
						>
							ATTEMPTS
						</div>
						<div
						style={attempts?{color:"grey"}:{}}
						id="statsHead"
							className={!attempts ? 'selected' : ''}
							onClick={() => setAttempts(false)}
						>
							STATS
						</div>
					</div>
					<div className="stats">
						{attempts ? (
							gameplayStore.attempts.map((hint, i) => (
								<span style={{color:"white"}} className="Hint" key={i}>
									{hint}
								</span>
							))
						) : (
							<>
								<span style={{color:"white",fontSize:"18px"}} className="Hint">At Par: {gameplayStore.stats.atPar}</span>
								<span style={{color:"white",fontSize:"18px"}}  className="Hint">Leading: {gameplayStore.stats.leading}</span>
								<span style={{color:"white",fontSize:"18px"}}  className="Hint">Trailing: {gameplayStore.stats.trailing}</span>
							</>
						)}
					</div>
				</div>
			);
		}
	)
);