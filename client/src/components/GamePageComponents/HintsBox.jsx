import React from 'react';
import { inject, observer } from 'mobx-react';
export const HintsBox = inject('gameplayStore')(
	observer(
		({ gameplayStore}) => (
			<div className="HintsBox ActualHints">
				<div className="HintsHeader">HINTS</div>
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