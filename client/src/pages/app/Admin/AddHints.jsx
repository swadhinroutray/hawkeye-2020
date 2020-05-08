import React from 'react';
import './style.css';
import styled from 'styled-components';

const StyledForm = styled.div`
	display: list-item;
	list-style-type: none;
	margin-top: 30px;
	font-size: 20px;
	margin-left: auto;
	margin-right: auto;
	display: list-item;
	list-style-type: none;
`;
class AddHints extends React.Component {
	constructor() {
		super();
		this.state = {
			region: 0,
			level: 0,
			hint: '',
			hintnum: 0,
		};
		this.addHint = this.addHint.bind(this);
		this.addHiddenHint = this.addHiddenHint.bind(this);
	}

	addHint() {
		fetch('/api/admin/addhint', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				region: this.state.region,
				level: this.state.level,
				hint: this.state.hint,
				hintnum: this.state.hintnum,
			}),
		})
			.then(resp => resp.json())
			.then(data => console.log(data));
	}

	addHiddenHint() {
		fetch('/api/admin/hiddenhint', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				region: this.state.region,
				level: this.state.level,
				hint: this.state.hint,
				hintnum: this.state.hintnum,
			}),
		})
			.then(resp => resp.json())
			.then(data => console.log(data));
	}

	render() {
		return (
			<StyledForm>
				<div>
					Hint:{' '}
					<input
						type="text"
						placeholder="Enter Hint"
						onChange={event => this.setState({ hint: event.target.value })}
					/>
				</div>
				<div>
					Region:{' '}
					<input
						type="text"
						placeholder="Enter Region, between [0, 4]"
						onChange={event =>
							this.setState({ region: parseInt(event.target.value) })
						}
					/>
				</div>
				<div>
					Level:{' '}
					<input
						type="text"
						placeholder="Enter Level, between [1,15]"
						onChange={event =>
							this.setState({ level: parseInt(event.target.value) })
						}
					/>
				</div>
				<div>
					Hint Number:{' '}
					<input
						type="text"
						placeholder="Hint number, between [1,3]"
						onChange={event =>
							this.setState({ hintnum: parseInt(event.target.value) })
						}
					/>
				</div>
				<button onClick={() => this.addHint()}>Add Hint</button>
				<button onClick={() => this.addHiddenHint()}>Add Hidden Hint</button>
			</StyledForm>
		);
	}
}

export default AddHints;
