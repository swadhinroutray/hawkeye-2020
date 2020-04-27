import { isEmail } from 'validator';
import { decorate, observable, action } from 'mobx';
import {
	chainValidations,
	validateRequired,
	validateWithError,
} from '../../utils/validation';
import { get, post } from '../../utils/api';
class LoginModel {
	formData = {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
	};
	loggedIn = false;
	profile = {};
	profileSet = false;
	profileSetError = false;

	isForgotLoading = false;
	forgotEmailSent = false;

	isResetLoading = false;
	resetSuccess = false;
	passwordError = '';
	resetForm = {
		resetPassword: { value: '', err: '' },
		confirmPassword: { value: '', err: '' },
	};

	setField(field, newValue) {
		this.formData[field].value = newValue;
		let err = '';
		if (loginValidator[field](newValue)) err = loginValidator[field](newValue);
		this.formData[field].error = err;
	}

	validateAll() {
		this.formData.email.error = loginValidator['email'](
			this.formData.email.value,
		);
		this.formData.password.error = loginValidator['password'](
			this.formData.password.value,
		);
	}
	clearErrors() {
		this.formData.email.error = '';
		this.formData.password.error = '';
	}

	hasErrors() {
		const { formData } = this;

		return [formData.email.error, formData.password.error].some(
			err => err !== '',
		);
	}

	login() {
		this.validateAll();

		if (this.hasErrors()) {
			console.log('err');
			return;
		}
		const { email, password } = this.formData;
		const postData = { email: email.value, password: password.value };

		post('/api/auth/login', postData).then(this.loginControl);
	}

	loginControl = res => {
		console.log(res);
		if (res.success) {
			
			console.log(res.data);
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
				itembool,
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
			this.profile.itembool = itembool;
			this.profileSet = true;
			this.loggedIn = true;
			this.setField('email', '');
			this.setField('password', '');
			this.loggedIn = true;
			return;
		}
		this.profileSetError = true;

		if (res.message === 'CONFLICT')
			this.formData.email.error = 'Email is not registered';
		else if (res.message === 'UNAUTHORIZED') {
			this.formData.password.error = 'Incorrect password';
		} else {
			console.log('error');
		}
	};

	logout() {
		post('/api/auth/logout').then(this.logoutControl);
	}

	logoutControl = res => {
		if (res.success) {
			this.loggedIn = false;
			this.profileSet = false;
			this.profileSetError = true;
			console.log('Logged out');
		}
	};

	forgotPassword() {
		this.formData.email.error = loginValidator['email'](
			this.formData.email.value,
		);

		if (this.formData.email.error !== '') {
			console.log('err');
			return;
		}

		this.isForgotLoading = true;

		const { email } = this.formData;
		const postData = { email: email.value };

		post('/api/auth/forgotpassword', postData).then(this.forgotControl);
	}
	forgotControl = res => {
		console.log(res);
		if (res.success) {
			console.log('Sent');
			this.forgotEmailSent = true;
		} else {
			console.log('Errr');
		}
		this.isForgotLoading = false;
	};

	setPassword(field, newValue) {
		this.passwordError = '';
		this.resetForm[field].value = newValue;
		if (loginValidator['password'](newValue))
			this.resetForm[field].error = loginValidator['password'](newValue);
	}
	resetPassword(resetToken) {
		this.isResetLoading = true;

		//Validate both password fields
		this.resetForm.resetPassword.error = loginValidator['password'](
			this.resetForm.resetPassword.value,
		);
		this.resetForm.confirmPassword.error = loginValidator['password'](
			this.resetForm.confirmPassword.value,
		);

		if (
			[
				this.resetForm.resetPassword.error,
				this.resetForm.confirmPassword.error,
			].some(err => err !== '')
		) {
			this.isResetLoading = false;
			return;
		}

		//Check if they match
		if (
			this.resetForm.resetPassword.value !==
			this.resetForm.confirmPassword.value
		) {
			this.passwordError = 'The two passwords do not match.';
			this.isResetLoading = false;
			return;
		}

		let postData = {
			password: this.resetForm.resetPassword.value,
			password2: this.resetForm.confirmPassword.value,
			token: resetToken,
		};

		try {
			post('/api/auth/resetpassword', postData).then(this.resetControl);
		} catch (err) {
			this.passwordError = 'An error has occurred';
			console.log(err);
		} finally {
			this.isResetLoading = false;
			this.resetForm = {
				resetPassword: { value: '', err: '' },
				confirmPassword: { value: '', err: '' },
			};
		}
	}

	resetControl = res => {
		if (res.success) {
			//On success, show that the password has been reset and show link Login page
			this.resetSuccess = true;
		} else {
			this.passwordError = 'Something went wrong.';
		}
	};

	getProfile() {
		get('/api/users/getprofile').then(this.loginControl);
	}
	getInventory() {
		get('/api/shop/getinventory').then(this.inventoryControl);
	}
	inventoryControl = res => {
		if (res.success) {
			this.profile.inventory = res.data;
		}
	};
}

decorate(LoginModel, {
	formData: observable,
	loggedIn: observable,

	profile: observable,
	profileSet: observable,
	profileSetError: observable,
	setField: action,
	clearErrors: action,
	validateAll: action,
	login: action,
	getInventory: action,

	isForgotLoading: observable,
	forgotEmailSent: observable,

	isResetLoading: observable,
	resetSuccess: observable,
	resetForm: observable,
	passwordError: observable,
});

const store = new LoginModel();

const loginValidator = {
	email: email =>
		chainValidations(
			validateRequired(email, 'Email'),
			validateWithError(isEmail(email), 'Invalid Email'),
		),
	password: password => validateRequired(password, 'Password'),
};
export default store;
