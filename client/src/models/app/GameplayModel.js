import {decorate, observable, action} from 'mobx';
import { get, post } from '../../utils/api';
const hawkResponses = {
	Correct: `Hawk approves!`,
	Wrong: `Hawk disapproves.`,
	Close: `Hawk thinks you're close.`,
};

class GameplayModel {
	questionId
	level= 0
	region=0
	question= ''
	message= ''
	currentAnswer= ''
	attempts= []
	hints= []
	stats= {atPar:0,trailing:0,leading:0}
	hangman=""
	inventory=[]

	setCurrentAnswer(newValue) {
		this.currentAnswer = newValue;
	}
	
	getQuestion=(region)=> {
		if(this.region===0){
		this.region=parseInt(region);
		}
		
	get(`/api/question/fetch/${this.region}`).then(this.getQuestionControl);
	}

	getQuestionControl=(res)=> {
		
		console.log(res)
		if (res.success) {
			if (res.data.question) {
				this.questionId=res.data.id
				this.question = res.data.question;
				this.level = res.data.level;
				if (res.data.hints.length > 0) {
					this.hints.replace(res.data.hints.map(hint => hint.hint));
				} else {
					this.hints.replace(['No hints yet']);
				}
			}
			this.getTries()
		}
		
	}

	submit(region) {
		console.log(region)
		if (this.currentAnswer.length === 0) return;
		post(`/api/question/answer`, { answer: this.currentAnswer,region:parseInt(region) }).then(
			this.submitControl
		);
		this.attempts.unshift(this.currentAnswer);
		this.attempts.replace(this.attempts.slice(0, 10));
	}

	 submitControl=(res)=> {
		 console.log(hawkResponses[res.data.split(' ')[0]])
		if (res.success) {
			this.currentAnswer = '';
			this.message = hawkResponses[res.data.split(' ')[0]];
			setTimeout(this.clearMessage, 1000);
			if (res.data === 'Correct Answer') {
				setTimeout(this.getQuestion, 1000);	
				
			}
		}
	}

	clearMessage() {
		this.message = '';
	}

	getTries=()=> {
		get(`/api/users/getprofile`).then(this.getTriesControl);
	}

	getTriesControl=(res)=> {
		console.log(res.data.submissions)
		if (res.success) {
			if (res.data.submissions){
			let submissions=res.data.submissions
			submissions=submissions.filter(submission=>submission.region===this.region&&submission.level===this.level)
			console.log(submissions)
			
			this.attempts.replace(submissions.map(sub=>sub.answer))
			}
		}
		this.getStats()
		}
	

	getStats=()=> {
		get(`/api/users/getrank`).then(this.getStatsControl);
	}

     getStatsControl=(res)=> {
		 console.log(res)
		if (res.success) {
			this.stats.atPar = res.data.atPar;
			this.stats.leading = res.data.leading;
			this.stats.trailing = res.data.trailing;
			console.log(this.stats)
		}
		this.getInventory()
	}
	getInventory=()=>{
		get('/api/shop/getinventory').then(this.inventoryControl)
	}
	inventoryControl=(res)=>{
		if(res.success){
			this.inventory=[]
			if (res.data.length > 0) {
				res.data.forEach(item=>{
					let newItem=item;
					newItem.region=this.region;
					newItem.question=this.level;
					this.inventory.push(newItem)
				})
			} else {
				this.inventory.push(['No hints yet']);
			}
		console.log(this.inventory)	
		}
	}
	useHangman(){
		const hangmanData={
			elixir:2,
			elixir_name:'Hangman',
			region:this.region,
			question:this.questionId,
			question_no:this.level
		}
		post('/api/elixir/hangman',hangmanData)
	}
	useRegionMultiplier(){
		const hangmanData={
			elixir:2,
			elixir_name:'Hangman',
			region:this.region,
			question:this.questionId,
			question_no:this.level
		}
		post('/api/elixir/regionmultiplier',hangmanData)
	}
	useUnlockHint(){
		const hangmanData={
			elixir:2,
			elixir_name:'Hangman',
			region:this.region,
			question:this.questionId,
			question_no:this.level
		}
		post('/api/elixir/unlockhint',hangmanData)
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
	stats:observable,
	hangman:observable,
	getQuestion:action,
	submit:action,
	getTries:action,
	getStats:action
})
const store=new GameplayModel()
export default store;