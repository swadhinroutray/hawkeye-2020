import { observable, decorate, action } from 'mobx';
import {
	regionImg,
	AOC,
	Streaks,
	Enigma,
	NS,
} from '../../assets/landing-assets';

class Region {
	constructor(img, name, year, location, date, time) {
		this.img = img;
		this.name = name;
		this.year = year;
		this.location = location;
		this.date = date;
		this.time = time;
	}
}
class LandingPageModel {
	currentRegion = 4;
	regionInfo = [];

	constructor() {
		this.regionInfo.push(
			new Region(
				regionImg,
				'AVALON',
				1900,
				'NEW YORK',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				Enigma,
				'SCOTLAND YARD',
				1945,
				'LONDON',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				Streaks,
				'new horizons',
				1977,
				'brooklyn',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(NS, 'hmayra', 2022, 'toronto', '26-28 MARCH', '12AM-12PM'),
			new Region(AOC, 'Nuketown', 2068, 'compton', '26-28 MARCH', '12AM-12PM'),
		);
	}
	changeRegion = regionNumber => {
		if (regionNumber < this.regionInfo.length)
			this.currentRegion = regionNumber;
	};
}

decorate(LandingPageModel, {
	regionInfo: observable,
	currentRegion: observable,
	changeRegion: action,
});

const LandingStore = new LandingPageModel();
export default LandingStore;
