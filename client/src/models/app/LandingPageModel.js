import { observable, decorate, action } from 'mobx';
import { CodeHeat, AOC, Enigma, NS, Castle } from '../../assets/landing-assets';

class Region {
	constructor(img, name, year, description) {
		this.img = img;
		this.name = name;
		this.year = year;
		this.description = description;
	}
}
class LandingPageModel {
	currentRegion = Math.floor(Math.random() * 4);
	regionInfo = [];

	constructor() {
		this.regionInfo.push(
			new Region(
				NS,
				'Florence',
				'1502 AD',
				'Bring around an era of change and make your way to the throne',
			),
			new Region(
				Castle,
				'Ottomania',
				'1918 AD',
				'Set in World War One, work your way to clinch the top spot.',
			),
			new Region(
				Enigma,
				'Pripyat',
				'1986 AD',
				'An eerie wave of disaster has come upon, guide your people to safety. ',
			),
			new Region(
				CodeHeat,
				'The Anthropocene',
				'2012 AD',
				'At the advent of a world more connected than ever, can you help humanity solve problems that come with it?',
			),
			new Region(
				AOC,
				'Medusae Fossae',
				'2047 AD',
				'A new beginning. A perfect utopia? Only time will tell.',
			),
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
	callMe: action,
});

const LandingStore = new LandingPageModel();
export default LandingStore;
