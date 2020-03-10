import { observable, decorate, action } from 'mobx';
import { hologramImg, regionImg, waves } from '../../assets/landing-assets';

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
	regionImages = [regionImg, hologramImg, regionImg, hologramImg, regionImg];

	currentRegion = 1;
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
				'NEW HORIZONS',
				1977,
				'BROOKLYN',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				hologramImg,
				'HMAYRA',
				2022,
				'TORONTO',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				regionImg,
				'NUKETOWN',
				2068,
				'COMPTON',
				'26-28 MARCH',
				'12AM-12PM',
			),
			new Region(
				hologramImg,
				'SOMWHERE',
				3000,
				'SEOUL',
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
	regionImages: observable,
	currentRegion: observable,
	changeRegion: action,
});

const LandingStore = new LandingPageModel();
export default LandingStore;
