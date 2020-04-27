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