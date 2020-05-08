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
	question = '';
	message = '';
	currentAnswer = '';
	attempts = [];
	hints = [];
	stats = { atPar: 0, trailing: 0, leading: 0 };
	locked = false;
	points = 0;

	setCurrentAnswer(newValue) {
		this.currentAnswer = newValue;
	}

	getQuestion = region => {
		this.locked = false;
		get('/api/fetch/hawksnest/0').then(this.getQuestionControl);
	};

	getQuestionControl = res => {
		console.log(res);
		if (res.success) {
			if (res.data.question) {
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

	submit() {
		if (this.currentAnswer.length === 0) return;
		post(`/api/question/answer`, {
			answer: this.currentAnswer,
			region: 5,
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
		setTimeout(this.getHiddenHints, 1000);
	};
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

	getQuestion: action,
	submit: action,
	getTries: action,
	points: observable,
	getStats: action,
});
const store = new GameplayModel();
export default store;
