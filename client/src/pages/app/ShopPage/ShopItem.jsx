import React, { Component } from 'react';
import styled from 'styled-components';
import YellowCrystal from '../../../components/YellowCrystal';
import BlueCrystal from '../../../components/BlueCrystal';
import PurpleCrystal from '../../../components/PurpleCrystal';
import RedCrystal from '../../../components/RedCrystal';
import store from '../../../models/app/ShopModel';
import { inject, observer } from 'mobx-react';
import { ShopPage } from './ShopPage';
const ShopItemContainer = styled.div`
	justify-self: center;
	margin: 10px;
	.image {
		width: 80px;
	}
	.content {
		font-size: 15px;
	}
	.subtext {
		font-size: 13px;
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
					<div className="content">
						Crystal {number + 1}
						<div className="subtext">
							Owned: {this.props.loginStore.profile.invertory}
						</div>
					</div>
				</div>
			</ShopItemContainer>
		);
	}
}
ShopItem = inject('shopStore', 'loginStore')(observer(ShopItem));
export default ShopItem;
