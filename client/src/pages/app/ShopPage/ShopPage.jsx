import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import ShopItem from './ShopItem';
import { ReactComponent as RulesIcon } from '../../../assets/RulesIcon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/LogoutIcon.svg';
import ShopHud from '../../../assets/ShopHud.svg';
import DescHud from '../../../assets/DescHud.svg';
import buy from '../../../assets/buybuttonbg.svg';
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';

const ShopPageContainer = styled.div`
	height: 100vh;
	overflow: scroll;
	text-align: center;
	color: #3abdb7;
	letter-spacing: 0.1em;
	padding: 0 30px 0;
	.header {
		padding: 0;
		> h1 {
			display: inline-block;
			margin: 0.15em auto 0.5em;
			font-size: 36px;
			font-weight: 600;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			color: #fff;
		}
		.icon {
			all: unset;
			display: inline-block;
			width: 35px;
			margin: 5px;
		}
	}
	.subhead {
		margin: 0;
		font-size: 28px;
		letter-spacing: 0.15em;
		font-weight: 300;
		color: #fff;
	}
	h3 {
		margin: 0.3em;
		color: #fff;
		font-weight: 100;
		font-size: 21px;
	}
	.back {
		display: block;
		width: 45px;
		margin: 0.5em auto;
	}
`;

const ItemsContainer = styled.div`
	padding: 1em;
	background-image: url(${ShopHud});
	background-size: cover;
	margin-bottom: 20px;
	.title {
		color: #fff;
		margin-top: 0.5em;
	}
	overflow: auto;
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0;
	}
`;
const ItemDescription = styled.div`
	background: url(${DescHud}) no-repeat;
	background-size: cover;
	text-align: left;
	padding: 7px 20px;
	.crystal-name {
		font-size: 18px;
		margin-bottom: 10px;
	}
	.desc {
		font-size: 12px;
		margin-bottom: 10px;
	}
	.status {
		font-size: 14px;
		font-weight: bold;
		.cost,
		.left {
			padding-right: 25px;
			display: inline-block;
		}
	}
	.buy {
		background-image: url(${buy});
		background-size: cover;
		box-sizing: border-box;
		width: fit-content;
		text-align: center;
		padding: 7px 30px;
		margin: 10px auto;
	}
	.buy-blocked {
		opacity: 30%;
	}
	.message {
		margin-top: 2px;
		font-size: 0.6em;
		min-height: 1.1em;
		user-select: none;
	}
`;

class ShopPage extends Component {
	componentDidMount() {
		this.props.shopStore.loadToBuy();
	}
	render() {
		const store = this.props.shopStore;
		return (
			<ShopPageContainer>
				<div className="header">
					<h1>Hawkeye</h1>

					<Link className="icon" to="">
						<RulesIcon />
					</Link>
					<Link className="icon" to="">
						<LogoutIcon />
					</Link>
				</div>

				<h1 className="subhead">Shop</h1>
				<h3>total Points: {this.props.loginStore.profile.points}</h3>
				<ItemsContainer>
					<div className="title">pick an item</div>
					<div className="grid">
						<ShopItem number={0} />
						<ShopItem number={1} />
						<ShopItem number={2} />
						<ShopItem number={3} />
					</div>
				</ItemsContainer>

				<ItemDescription>
					<div className="crystal-name">Crystal {store.getSelected + 1}</div>
					<div className="desc">
						{store.itemDescriptions[store.getSelected]}
					</div>
					<div className="status">
						<span className="cost">
							Cost: {store.itemCost[store.getSelected]} Points
						</span>
						<span className="left">left: {store.toBuy[store.getSelected]}</span>
					</div>
					{store.toBuy[store.getSelected] !== 0 ? (
						<div className="buy" onClick={store.buyItem.bind(store)}>
							buy
						</div>
					) : (
						<div className="buy buy-blocked">buy</div>
					)}
					<span className="message">{store.message}</span>
				</ItemDescription>

				<Link className="back" to="#">
					<BackButton />
				</Link>
			</ShopPageContainer>
		);
	}
}
ShopPage = inject('shopStore', 'loginStore')(observer(ShopPage));
export { ShopPage };
