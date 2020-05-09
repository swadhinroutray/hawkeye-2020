import { decorate, observable, action, computed } from 'mobx';
import { get, post } from '../../utils/api';
import { toast } from 'react-toastify';
class ShopModel {
	//0 Extra Hint
	//1 Region Multiplier
	//2 Hangman
	//3 skip Question

	initValues = [2, 1, 2, 1];
	points = 0;
	message = '';
	toBuy = [2, 1, 2, 2];
	resetMinimumPointsReq = 400;
	resetPoints = 300;
	elixirName = [
		'Extra Hint',
		'Region Multiplier',
		'Hangman Elixir',
		'Skip Question',
	];
	itemDescriptions = [
		'Get an extra hint for a question of your choice',
		'Add a 1.5 multiplier for a region that has been unlocked for you',
		"Ever played Hangman? This is exactly what you're thinking right now. Get some letters of the final answer for a question of your choice",
		'Stuck with some question for a really long time? Here’s an elixir that lets you skip it!',
	];
	itemCost = [30, 60, 20, 50];
	selected = 0;
	owned = [0, 0, 0, 0];
	get getSelected() {
		return this.selected;
	}

	updateSelected(number) {
		this.selected = number;
		this.message = '';
	}
	loadToBuy() {
		get('/api/shop/tobuy').then(({ success, data }) => {
			if (success) {
				this.toBuy = data;
			}
		});
	}
	getProfile() {
		get('/api/users/getprofile').then(this.getProfileControl);
	}
	getProfileControl = res => {
		if (res.success) {
			this.points = res.data.points;
		}
	};
	getOwned() {
		get('/api/shop/remaining').then(this.getOwnedControl);
	}
	getOwnedControl = res => {
		// console.log(res);
		if (res.success) {
			this.owned = res.data;
		}
	};
	resetStore() {
		get('/api/shop/resetstore').then(this.resetControl);
	}
	resetControl = res => {
		// console.log(res);
		if (res.success) {
			if (res.data === 'You do not have enough points') this.message = res.data;
			if (res.data === 'Store successfully reset') {
				this.message = 'Store successfully reset';
				this.toBuy = this.initValues;
				this.points -= this.resetPoints;
				this.loadToBuy();
				this.getProfile();
				this.getOwned();
			}
		}
	};
	//ADD BOUGHT ITEM TO INVENTORY NOT DONE
	buyItem() {
		post('api/shop/buy/' + this.selected, {}).then(res => {
			// console.log(res);
			if (res.success) {
				if (res.data === 'A new elixir has been added to your inventory') {
					toast('A new elixir has been added to your inventory', {
						position: 'top-right',
						autoClose: 4000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					});
					this.toBuy[this.selected] -= 1;
					this.points -= this.itemCost[this.selected];
					this.owned[this.selected]++;
					return;
				}
				if (res.data === "You don't have enough points!") {
					toast.error("You don't have enough points!", {
						position: 'top-right',
						autoClose: 4000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					});
					return;
				}
			} else {
				this.message = res.data;
			}
		});
	}
}

decorate(ShopModel, {
	toBuy: observable,
	selected: observable,
	message: observable,
	itemCost: observable,
	points: observable,
	owned: observable,
	itemDescriptions: observable,
	getSelected: computed,
	getOwned: action,
	getProfile: action,
	updateSelected: action,
	loadToBuy: action,
	buyItem: action,
	resetStore: action,
});

const store = new ShopModel();
export default store;
