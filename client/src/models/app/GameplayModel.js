import { decorate, observable, action } from 'mobx';
import { get, post } from '../../utils/api';
import { toast } from 'react-toastify';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const hawkResponses = {
	Correct: `Hawk approves!`,
	Wrong: `Hawk disapproves.`,
	Close: `Hawk thinks you're close.`,
};

class GameplayModel {
	questionId;
	level = 0;
	region = 0;
	question = '';
	message = '';
	currentAnswer = '';
	attempts = [];
	hints = [];
	stats = { atPar: 0, trailing: 0, leading: 0 };
	itembool = [];
	inventory = [];
	locked = false;
	hangman='';
	points = 0;
	setCurrentAnswer(newValue) {
		this.currentAnswer = newValue;
	}
	clear(){
		this.level = 0;
	this.region = 0;
	this.question = '';
	this.message = '';
	this.currentAnswer = '';
	this.attempts = [];
	this.hints = [];
	this.stats = { atPar: 0, trailing: 0, leading: 0 };
	this.itembool = [];
	this.inventory = [];
	this.locked = false;
	this.hangman='';
	this.points = 0;
	}
	getQuestion = region => {
		this.locked = false;
		if (region || region === 0) {
			this.region = parseInt(region);
		}

		get(`/api/question/fetch/${this.region}`).then(this.getQuestionControl);
	};

	getQuestionControl = res => {
		
		if (res.success) {
			if (res.data.question) {
				this.hangman='';
				this.questionId = res.data.id;
				this.question = res.data.question;
				this.level = res.data.level;
				if (res.data.hints.length > 0) {
					this.hints.replace(res.data.hints.map(hint => hint.hint));
				} else {
					this.hints.replace(['No hints yet']);
				}
			}

			this.getTries();
		} else if (res.data === 'Region Locked') {
			this.locked = true;
			toast('region locked', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				closeButton: faTimes,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else {
			this.locked = true;
			toast('all questions answered', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	};

	submit(region) {
		if (this.currentAnswer.length === 0) return;
		post(`/api/question/answer`, {
			answer: this.currentAnswer,
			region: parseInt(region),
		}).then(this.submitControl);
		this.attempts.unshift(this.currentAnswer);
		this.attempts.replace(this.attempts.slice(0, 10));
	}

	submitControl = res => {
		if (res.success) {
			this.currentAnswer = '';
			this.message = hawkResponses[res.data.split(' ')[0]];
			setTimeout(this.clearMessage, 1000);
			if (res.data === 'Correct Answer') {
				setTimeout(this.getQuestion, 1000);
			}
		}
	};

	clearMessage() {
		this.message = '';
	}

	getTries = () => {
		get(`/api/users/getprofile`).then(this.getTriesControl);
	};

	getTriesControl = res => {
		if (res.success) {
			this.itembool = res.data.itembool;
			this.points = res.data.points;
			if (res.data.submissions) {
				let submissions = res.data.submissions;
				submissions = submissions.filter(
					submission =>
						submission.region === this.region &&
						submission.level === this.level,
				);

				this.attempts.replace(submissions.map(sub => sub.answer));
				this.attempts = this.attempts.reverse();
			}
		}
		this.getStats();
	};

	getStats = () => {
		get(`/api/users/getrank`).then(this.getStatsControl);
	};

	getStatsControl = res => {
		if (res.success) {
			this.stats.atPar = res.data.atPar;
			this.stats.leading = res.data.leading;
			this.stats.trailing = res.data.trailing;
		}
		this.getInventory();
		setTimeout(this.getHiddenHints, 1000);
	};
	getInventory = () => {
		get('/api/shop/getinventory').then(this.inventoryControl);
	};
	inventoryControl = res => {
		if (res.success) {
			this.inventory = [];
			if (res.data && res.data.length > 0) {
				res.data.forEach(item => {
					let newItem = item;
					newItem.region = this.region;
					newItem.question = this.level;
					this.inventory.push(newItem);
					
				});
			} else {
				this.inventory.push(['No hints yet']);
			}
		}
	};
	getHiddenHints = () => {
		
		get(`/api/elixir/perks/hiddenhint/${this.region}/${this.level}`).then(
			this.getHiddenHintsControl,
		).then(()=>{this.getHangman()});
	};
	getHangman = () => {
		get(`/api/elixir/perks/hangman/${this.region}/${this.level}`).then(
			this.getHiddenHintsControl,
		);
	};
	getHiddenHintsControl = res => {
		
		if (res.success) {
			if (res.data && res.data.length > 0) {
				if (this.hints[0] === 'No hints yet') {
					this.hints = [];
				}

				res.data.forEach(hint => {
					
					if(hint.hintnum===2){
						this.hangman=hint.hint;
					}else{
						this.hints.push(hint.hint);
					}
				});
				
			}
		}
	};
	useHangman() {
		const hangmanData = {
			elixir: 2,
			elixir_name: 'Hangman',
			region: this.region,
			question: this.questionId,
			question_no: this.level,
		};
		post('/api/elixir/hangman', hangmanData).then(this.useElixirControl);
	}
	useSkipQuestion() {
		const hangmanData = {
			elixir: 3,
			elixir_name: 'Skip Question',
			region: this.region,
			question: this.questionId,
			question_no: this.level,
		};
		post('/api/elixir/skipquestion', hangmanData).then(
			this.useSkipQuestionControl,
		);
	}
	useSkipQuestionControl = res => {
		if (res.success) {
			this.message = '';
			this.getQuestion();

			toast('Elixir Applied Successfully!', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else {
			toast('Cannot Skip Question', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	};
	useRegionMultiplier() {
		const multiplierData = {
			elixir: 1,
			elixir_name: 'Region Multiplier',
			region: this.region,
			question: this.questionId,
			question_no: this.level,
		};
		post('/api/elixir/regionmultiply', multiplierData).then(
			this.useElixirControl,
		);
	}
	useElixirControl = res => {
		if (res.success) {
			this.getQuestion();

			toast('Elixir Applied Successfully!', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else {
			toast('Cannot Apply Elixir', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	};
	useUnlockHint() {
		const unlockHintData = {
			elixir: 0,
			elixir_name: 'Extra Hint',
			region: this.region,
			question: this.questionId,
			question_no: this.level,
		};

		post('/api/elixir/unlockhint', unlockHintData).then(this.useElixirControl);
	}
}
decorate(GameplayModel, {
	level: observable,
	question: observable,
	message: observable,
	region: observable,
	currentAnswer: observable,
	attempts: observable,
	hints: observable,
	stats: observable,
	inventory: observable,
	locked: observable,
	hangman:observable,
	getQuestion: action,
	submit: action,
	getTries: action,
	points: observable,
	itembool: observable,
	getStats: action,
	clear:action,
	useRegionMultiplier: action,
	getHiddenHints: action,
});
const store = new GameplayModel();
export default store;
