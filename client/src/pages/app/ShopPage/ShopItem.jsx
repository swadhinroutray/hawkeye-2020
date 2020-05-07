import React, { Component } from 'react';
import styled from 'styled-components';
import YellowCrystal from '../../../components/YellowCrystal';
import BlueCrystal from '../../../components/BlueCrystal';
import PurpleCrystal from '../../../components/PurpleCrystal';
import RedCrystal from '../../../components/RedCrystal';
import { inject, observer } from 'mobx-react';

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};

const device = {
	mobileS: `(min-width: ${size.mobileS})`,
	mobileM: `(min-width: ${size.mobileM})`,
	mobileL: `(min-width: ${size.mobileL})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};

const ShopItemContainer = styled.div`
	justify-self: center;
	margin: 10px 0;
	.image {
		width: 80px;
		margin: 0 auto;
	}
	.content {
		font-size: 15px;
	}
	.subtext {
		font-size: 13px;
	}
	.selected {
		transition: 0.5s linear;
		color: #f2ad00;
	}
	@media ${device.mobileS} and (max-width: ${size.mobileM}) {
		.image {
			width: 70px;
		}
	}
	@media ${device.tablet} {
		margin: 5px 0;

		.image {
			margin: 10px auto;
			width: 90px;
		}
		.content {
			font-size: 18px;
		}
		.subtext {
			font-size: 18px;
		}
	}
	@media ${device.laptop} {
		letter-spacing: 1px;
		.image {
			cursor: pointer;
		}
	}
	@media ${device.desktop} {
		letter-spacing: 5px;
		.image {
			margin: 0 auto;
			width: 100px;
		}
	}
`;

class ShopItem extends Component {
	render() {
		const { number, shopStore } = this.props;
		return (
			<ShopItemContainer>
				<div onClick={() => shopStore.updateSelected(number)}>
					<div className="image">
						{number === 0 ? (
							<BlueCrystal
								selected={shopStore.getSelected === number ? true : false}
							/>
						) : number === 1 ? (
							<YellowCrystal
								selected={shopStore.getSelected === number ? true : false}
							/>
						) : number === 2 ? (
							<PurpleCrystal
								selected={shopStore.getSelected === number ? true : false}
							/>
						) : (
							<RedCrystal
								selected={shopStore.getSelected === number ? true : false}
							/>
						)}
					</div>
					<div
						className={
							'content ' + (shopStore.getSelected === number ? 'selected' : '')
						}
					>
						{shopStore.elixirName[number]}
						<div
							className={
								'subtext ' +
								(shopStore.getSelected === number ? 'selected' : '')
							}
						>
							Owned: {shopStore.owned[number]}
						</div>
					</div>
				</div>
			</ShopItemContainer>
		);
	}
}
ShopItem = inject('shopStore', 'loginStore')(observer(ShopItem));
export default ShopItem;
