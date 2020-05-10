import { isEmail } from 'validator';
import { decorate, observable, action } from 'mobx';
import {
	chainValidations,
	validateRequired,
	validateWithError,
} from '../../utils/validation';
import { get, post } from '../../utils/api';
import LandingStore from './LandingPageModel';
import HawksNestModel from './HawksNestModel';
import { toast } from 'react-toastify';

class LoginModel {
	formData = {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
	};
	loggedIn = false;
	profile = {};
	profileSet = false;
	profileSetError = false;
	firstLogin = false;
	isForgotLoading = false;
	forgotEmailSent = false;
	rulesDisplay = false;
	isResetLoading = false;
	resetSuccess = false;
	passwordError = '';
	resetForm = {
		resetPassword: { value: '', err: '' },
		confirmPassword: { value: '', err: '' },
	};
	verifySuccess = false;
	verifyMessage = "Please wait while we're verifying your account";
	setRulesDisplay(val) {
		this.rulesDisplay = false;
	}

	setField(field, newValue) {
		this.formData[field].value = newValue.trim();
		let err = '';

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
			return;
		}
		const { email, password } = this.formData;
		const postData = {
			email: email.value.trim(),
			password: password.value.trim(),
		};

		post('/api/auth/login', postData).then(this.loginControl);
	}

	loginControl = res => {
		if (res.success) {
			if (res.data.banned === true) {
				this.logout();
				toast.error('You have been banned from the game', {
					position: 'top-right',
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				return;
			}
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
				inventory,
				points,
				itembool,
				regionmultiplier,
				allanswered,
				nestlevel,
				submissions,
				FirstLogin,
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
			this.profile.invertory = inventory;
			this.profile.points = points;
			this.profile.itembool = itembool;
			this.profile.regionmultiplier = regionmultiplier;
			this.profile.allanswered = allanswered;
			this.profile.nestlevel = nestlevel;
			this.profileSet = true;
			this.profile.submissions = submissions;
			this.profile.FirstLogin = FirstLogin;
			this.loggedIn = true;
			this.setField('email', '');
			this.setField('password', '');
			this.loggedIn = true;

			HawksNestModel.setNestLevel(nestlevel);

			if (FirstLogin) {
				post('api/users/firstlogin', { value: false }).then(res => {
					if (res.success === true) {
						this.rulesDisplay = true;
					}
				});
			}
			return;
		}
		this.profileSetError = true;

		if (res.message === 'CONFLICT')
			this.formData.email.error = 'Email unregistered/ Account Unverified';
		else if (
			res.message === 'UNAUTHORIZED' &&
			this.formData.password.value.length
		) {
			this.formData.password.error = 'Incorrect password';
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
		}
	};

	forgotPassword() {
		this.formData.email.error = loginValidator['email'](
			this.formData.email.value,
		);

		if (this.formData.email.error !== '') {
			return;
		}

		this.isForgotLoading = true;

		const { email } = this.formData;
		const postData = { email: email.value };

		post('/api/auth/forgotpassword', postData).then(this.forgotControl);
	}
	forgotControl = res => {
		if (res.success) {
			this.forgotEmailSent = true;
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
		get('/api/users/getprofile')
			.then(this.loginControl)
			.then(() => {
				if (this.profile.level) {
					LandingStore.changeRegion(
						this.profile.level.indexOf(
							Math.min(...this.profile.level.filter(lvl => lvl >= 1)),
						),
					);
				}
			});
	}
	verifyEmail(token) {
		post('/api/auth/verifyemail', { token: token }).then(this.verifyControl);
	}
	verifyControl = res => {
		if (res.success) {
			this.verifySuccess = res.success;
			this.verifyMessage = 'Reset Succesfully!!';
			return;
		}
		if (res.success === false) {
			this.verifyMessage = "We couldn't verify this email, try logging in to check if email has been verified";
			setTimeout(() => {
				this.verifySuccess = true;
			}, 5000);
			return;
		}
	};
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
	rulesDisplay: observable,
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
	setRulesDisplay: action,

	verifySuccess: observable,
	verifyControl: action,
	verifyMessage: observable,
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
