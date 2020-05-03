import { observable, decorate, action } from 'mobx';
import {
	validateRequired,
	validateWithError,
	chainValidations,
} from '../../utils/validation';
import { post } from '../../utils/api';
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
	confirmPass = {
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
	successful=false
	setMessage = val => {
		this.message.value
			= val;
	};
	setField = (field, val) => {
		this[field].value = val;
		// console.log(field, 'val', val);
		let err = '';
		if (field === 'confirmPass') {
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
			this.confirmPass,
			this.email,
			this.mobile,
			this.college,
		].some(field => field.error.length > 0);
	};

	validateAll = () => {
		this.name.error = registerValidator['name'](this.name.value);
		this.username.error = registerValidator['username'](this.username.value);
		this.password.error = registerValidator['password'](this.password.value);
		this.confirmPass.error = registerValidator['confirmPass'](
			this.confirmPass.value,
			this.password.value,
		);
		this.email.error = registerValidator['email'](this.email.value);
		const regexp = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
		if (!regexp.test(this.email.value)) {
			this.email.error = 'Invalid Email Address';
			return;
		}

		//add regex for both

		this.mobile.error = registerValidator['mobile'](this.mobile.value);
	};
	register = () => {
		this.validateAll();
		if (this.hasErrors()) {
			console.log('error');
			return;
		}
		const postData = {
			name: this.name.value,
			username: this.username.value,
			password: this.password.value,
			confirmPass: this.confirmPass.value,
			email: this.email.value,
			mobile: this.mobile.value,
			college: this.college.value,
		};
		/*fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			console.log(res);
			// if (res.status === 200) {
			// 	this.setMessage('Registered Succesfully!!');
			// 	return;
			// }
			// if (res.statusText === 'Conflict') {
			// 	for (let err of res.data) {
			// 		if (err.field === 'username' && err.error === 'usernameexists')
			// 			this.username.error = 'Username already in use';
			// 		else if (err.field === 'email' && err.error === 'emailexists')
			// 			this.email.error = 'Email already registered';
			// 	}
			// }
		});*/
		post(`/api/auth/register`, postData).then(res => {
			console.log(res);

			if (res.success) {
				this.setMessage('Registered successfully!');
				this.successful=true;
				alert('Registered successfully!')
				return;
			}
			if (res.message === 'CONFLICT') {
				for (let err of res.data) {
					if (err.field === 'username' && err.error === 'username_exists')
						this.username.error = 'Username already in use';
					else if (err.field === 'email' && err.error === 'email_exists')
						this.email.error = 'Email already registered';
					else return;
				}
			}
			this.setMessage('Something went wrong please try again');
		});
	};
}

decorate(RegisterModel, {
	name: observable,
	username: observable,
	email: observable,
	password: observable,
	confirmPass: observable,
	mobile: observable,
	college: observable,
	message: observable,
	successful:observable,
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
	confirmPass: (confirmPass, password) =>
		chainValidations(
			validateRequired(confirmPass, 'Confirmation'),
			validateWithError(confirmPass === password, 'Password does not match'),
		),
	email: email => validateRequired(email, 'Email'),
	mobile: mobile => validateRequired(mobile, 'Mobile Number'),
	college: college => validateRequired(college, 'College'),
};
