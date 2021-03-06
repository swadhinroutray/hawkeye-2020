import React from 'react';
import { inject, observer } from 'mobx-react';
export const HintsBox = inject('gameplayStore')(
	observer(
		({ gameplayStore}) => (
			<div className="HintsBox ActualHints">
				<div className="HintsHeader">HINTS</div>
				<div className="Hints">
				<br/>
				{gameplayStore.hints.length?
					gameplayStore.hints.map((hint, i) => (
						<span style={{color:"white"}} className="Hint" key={i}>
							{hint}
						</span>
					)):(<span style={{color:"white"}} className="Hint" >
					No Hints yet
				</span>)
				}
					
				</div>
			</div>
		)
	)
);