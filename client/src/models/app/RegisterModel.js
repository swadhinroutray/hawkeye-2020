import { observable, decorate, action, computed } from 'mobx';
import {
	validateRequired,
	validateWithError,
	chainValidations,
} from '../../utils/validation';
class RegisterModel {
	name = {
		value: '',
		error: '',
	};
	username = {
		value: '',
		error: '',
	};
	email = {
		value: '',
		error: '',
	};
	password = {
		value: '',
		error: '',
	};
	confPass = {
		value: '',
		error: '',
	};
	mobile = {
		value: '',
		error: '',
	};
	college = {
		value: '',
		error: '',
	};
	message = {
		value: '',
		error: '',
	};
	setMessage = val => {
		this.message = val;
	};
	setField = (field, val) => {
		this[field].value = val;
		// console.log(field, 'val', val);
		let err = '';
		if (field === 'confPass') {
			err = registerValidator[field](val, this.password.value);
		} else {
			err = registerValidator[field](val);
		}
		this[field].error = err;
	};

	hasErrors = () => {
		return [
			this.name,
			this.username,
			this.password,
			this.confPass,
			this.email,
			this.mobile,
			this.college,
		].some(field => field.error.length > 0);
	};

	validateAll = () => {
		this.name.error = registerValidator['name'](this.name.value);
		this.username.error = registerValidator['username'](this.username.value);
		this.password.error = registerValidator['password'](this.password.value);
		this.confPass.error = registerValidator['confPass'](
			this.confPass.value,
			this.password.value,
		);
		this.email.error = registerValidator['email'](this.email.value);
		//add regex for both
		this.mobile.error = registerValidator['mobile'](this.mobile.value);
	};
	register = () => {
		this.validateAll();
		if (this.hasErrors()) {
			console.log('error');
			return;
		}
		const data = {
			name: this.name.value,
			username: this.username.value,
			password: this.password.value,
			confPass: this.confPass.value,
			email: this.email.value,
			mobile: this.mobile.value,
			college: this.college.value,
		};
		fetch('')
			.then(res => res.json())
			.then(({ message, success }) => {
				// console.log(data);
				// if (success) {
				// 	this.setMessage('Registered Succesfully!!');
				// 	return;
				// }
				// if (message === 'CONFLICT') {
				// 	for (let err of data) {
				// 		if (err.field === 'username' && err.error === 'usernameexists')
				// 			this.username.error = 'Username already in use';
				// 		else if (err.field === 'email' && err.error === 'emailexists')
				// 			this.email.error = 'Email already registered';
				// 	}
				// }
			});
	};
}

decorate(RegisterModel, {
	name: observable,
	username: observable,
	email: observable,
	password: observable,
	confPass: observable,
	mobile: observable,
	college: observable,
	message: observable,
	setField: action,
	setMessage: action,
	validateAll: action,
	register: action,
});
const store = new RegisterModel();
export default store;

const registerValidator = {
	name: name => validateRequired(name, 'Name'),
	username: username => validateRequired(username, 'Username'),
	password: username => validateRequired(username, 'Password'),
	confPass: (confPass, password) =>
		chainValidations(
			validateRequired(confPass, 'Confirmation'),
			validateWithError(confPass === password, 'Password does not match'),
		),
	email: email => validateRequired(email, 'Email'),
	mobile: mobile => validateRequired(mobile, 'Mobile Number'),
	college: college => validateRequired(college, 'College'),
};
