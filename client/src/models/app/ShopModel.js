import { decorate, observable, action, computed } from 'mobx';
import { get, post } from '../../utils/api';
class ShopModel {
	//0 Extra Hint
	//1 Region Multiplier
	//2 Hangman
	//3
	initValues = [2, 2, 2, 1];
	message = '';
	toBuy = [2, 2, 2, 1];
	itemDescriptions = [
		'Get an extra hint for a question of your choice',
		'Add a 1.5 multiplier for a region that has been unlocked for you',
		"Ever played Hangman? This is exactly what you're thinking right now. Get some letters of the final answer for a question of your choice",
		'Stuck with some question for a really long time? Here’s an elixir that lets you skip it!',
	];
	itemCost = [200, 300, 400, 500];
	selected = 0;
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

	//ADD BOUGHT ITEM TO INVENTORY NOT DONE
	buyItem() {
		post('api/shop/buy/' + this.selected, {}).then(res => {
			if (res.success) {
				if (res.data === 'A new potion has been addedto your inventory') {
					this.message = 'A new elixir has been added to your inventory';
					this.toBuy[this.selected] -= 1;
					return;
				}
				if (res.data === "You don't have enough points!") {
					this.message = res.data;
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
	itemDescriptions: observable,
	getSelected: computed,
	updateSelected: action,
	loadToBuy: action,
	buyItem: action,
});

const store = new ShopModel();
export default store;
