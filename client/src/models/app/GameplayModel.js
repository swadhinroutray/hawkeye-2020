import {decorate, observable, action} from 'mobx';
import { get, post } from '../../utils/api';
const hawkResponses = {
	CORRECT: `Hawk approves!`,
	WRONG: `Hawk disapproves.`,
	CLOSE: `Hawk thinks you're close.`,
};

class GameplayModel {
	level= 0
	region=0
	question= ''
	message= ''
	currentAnswer= ''
	attempts= []
	hints= []
	stats= {atPar:0,trailing:0,leading:0}
	setCurrentAnswer(newValue) {
		this.currentAnswer = newValue;
	}

	getQuestion() {
		const {region}=this;
		const questionData={region:region}
		get(`/api/gameplay/question`).then(this.getQuestionControl,questionData);
	}

	getQuestionControl(res) {
		if (res.success) {
			if (res.data.question) {
				this.question = res.data.question;
				this.level = res.data.level;
				if (res.data.hints.length > 0) {
					this.hints.replace(res.data.hints.map(hint => hint.hint));
				} else {
					this.hints.replace(['No hints yet']);
				}
			}
		}
	}

	submit() {
		if (this.currentAnswer.length === 0) return;
		post(`/api/gameplay/answer`, { answer: this.currentAnswer }).then(
			this.submitControl
		);
		this.attempts.unshift(this.currentAnswer);
		this.attempts.replace(this.attempts.slice(0, 10));
	}

	 submitControl(res) {
		if (res.success) {
			this.currentAnswer = '';
			this.message = hawkResponses[res.data.status];
			setTimeout(this.clearMessage, 1000);
			if (res.data.status === 'CORRECT') {
				setTimeout(this.getQuestion, 1000);
				setTimeout(this.getStats, 1000);
				setTimeout(this.getTries, 1000);
			}
		}
	}

	clearMessage() {
		this.message = '';
	}

	getTries() {
		get(`/api/gameplay/submissions`).then(this.getTriesControl);
	}

	getTriesControl(res) {
		if (res.success) {
			this.attempts.replace(res.data.map(sub => sub.answer));
		}
	}

	getStats() {
		get(`/api/gameplay/stats`).then(this.getStatsControl);
	}

     getStatsControl(res) {
		if (res.success) {
			this.stats.atPar = res.data.atPar;
			this.stats.leading = res.data.leading;
			this.stats.trailing = res.data.trailing;
		}
	}
}
decorate(GameplayModel,{
    level:observable,
	question:observable,
	message:observable,
	region:observable,
	currentAnswer:observable,
	attempts:observable,
	hints:observable,
	stats:observable
})
const store=new GameplayModel()
export default store;