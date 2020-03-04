import { isEmail } from 'validator';
import {decorate, observable, action} from 'mobx';
import {
	chainValidations,
	validateRequired,
	validateWithError,
} from '../../utils/validation';
import {get,post} from '../../utils/api'
class LoginModel {	
    formData= {email:{value:"",error:""},password:{value:"",error:""}}
	loggedIn= false
	profile= {}
    profileSet= false

    setField(field, newValue) {
		this.formData[field].value = newValue;
		let err = '';

		if (loginValidator[field](newValue)) err = loginValidator[field](newValue);
		this.formData[field].error = err;
	}

    validateAll() {
		
		this.formData.email.error = loginValidator['email'](this.formData.email.value);
		this.formData.password.error = loginValidator['password'](this.formData.password.value);
    }
   clearErrors() {
		this.formData.email.error = '';
		this.formData.password.error = '';
	}

	hasErrors() {
		const { formData } = this;
		
		return [formData.email.error, formData.password.error].some(
			err => err !== ''
		);
	}

    login() {
		
		this.validateAll();
		
		if (this.hasErrors()){
			console.log("err");
			return;
		} 
		const { email, password } = this.formData;
        const postData = { email: email.value, password: password.value };
        
		post('/api/auth/login',postData).then(this.loginControl)
	}

    loginControl=(res) =>{
		if (res.success) {
			this.loggedIn = true;
			const {
				id,
				name,
				username,
				email,
				mobile,
				college,
				access,
				banned,
				level,
				invertory,
				points,
			} = res.data;

			this.profile.id = id;
			this.profile.name = name;
			this.profile.username = username;
			this.profile.email = email;
			this.profile.mobile = mobile;
			this.profile.college = college;
			this.profile.level = level;
			this.profile.access = access;
			this.profile.banned = banned;
			this.profile.invertory = invertory;
			this.profile.points = points;

			this.setField('email', '');
			this.setField('password', '');
			return;
		}
		if (res.message === 'CONFLICT')
			this.formData.email.error = 'Email is not registered';
		if (res.message === 'UNAUTHORIZED')
			this.formData.password.error = 'Incorrect password';
	}

	logout() {
		console.log("unimplemented");
	}

	logoutControl=(res)=> {
		if (res.success) {
			this.loggedIn = false;
		}
	}

	getProfile() {
		console.log("unimplemented");
	}


};
decorate(LoginModel,{
    formData:observable,
    loggedIn:observable,
    profile:observable,
    profileSet:observable,
    setField:action,
    clearErrors:action,
    validateAll:action,
    login:action,
})

const store=new LoginModel()

const loginValidator= {
	email: email =>
		chainValidations(
			validateRequired(email, 'Email'),
			validateWithError(isEmail(email), 'Invalid Email')
		),
	password: password => validateRequired(password, 'Password'),
};
export default store;
