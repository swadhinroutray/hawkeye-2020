import { observable, decorate, action } from 'mobx';
import { hologramImg, regionImg } from '../../assets/landing-assets';

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
	currentRegion = 0;
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
				hologramImg,
				'SCOTLAND YARD',
				1945,
				'LONDON',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				regionImg,
				'new horizons',
				1977,
				'brooklyn',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				hologramImg,
				'hmayra',
				2022,
				'toronto',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				regionImg,
				'Nuketown',
				2068,
				'compton',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				hologramImg,
				'somewhere',
				3000,
				'seoul',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(regionImg, 'B1-23', 3022, 'OSLO', '26-28 MARCH', '12AM-12PM'),
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
