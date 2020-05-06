import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import ShopItem from './ShopItem';
import Details1 from '../../../components/Details1';
import Details2 from '../../../components/Details2';
import { ReactComponent as RulesIcon } from '../../../assets/RulesIcon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/LogoutIcon.svg';
import ShopHud from '../../../assets/ShopHud.svg';
import DescHud from '../../../assets/DescHud.svg';
import { ReactComponent as Map } from '../../../assets/Map.svg';

import buy from '../../../assets/buybuttonbg.svg';
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';

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

const ShopPageContainer = styled.div`
	height: 100%;
	text-align: center;
	color: #3abdb7;
	letter-spacing: 0.1em;
	padding: 0 40px 0;
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
	.reset {
		background-image: url(${buy});
		background-size: cover;
		box-sizing: border-box;
		width: fit-content;
		text-align: center;
		letter-spacing: 3px;
		padding: 10px 50px 15px 30px;
		margin: 10px auto;
		:hover {
			cursor: pointer;
		}
	}
	.reset-blocked {
		opacity: 30%;
	}
	.back {
		display: block;
		width: 45px;
		margin: 0.5em auto;
	}
	.filler {
		display: none;
	}
	@media ${device.mobileS} and (max-width: ${size.mobileM}) {
		padding: 0 40px 0;
		letter-spacing: 0;
		.header {
			> h1 {
				margin: 0.15em auto 0.5em;
				vertical-align: top;
				font-size: 30px;
				letter-spacing: 0;
			}
		}
		.subhead {
			font-size: 24px;
			letter-spacing: 0;
		}
		h3 {
			margin: 0.1em;
			font-size: 20px;
		}
		.back {
			display: block;
			width: 35px;
			margin: 0.5em auto;
		}
	}
	@media ${device.tablet} {
		max-width: 70%;
		margin: 0 auto;
		.header {
			padding: 20px;
			> h1 {
				margin: 0.4em auto;
				font-size: 48px;
				vertical-align: center;
			}
			.icon {
				width: 55px;
				margin: auto 15px;
			}
		}
		.subhead {
			font-size: 36px;
		}
		h3 {
			margin: 0.3em;
			font-size: 26px;
		}
		.back {
			width: 55px;
		}
	}
	@media ${device.laptop} {
		max-width: 95%;
		padding: 0;
		letter-spacing: 7px;
		.wrapper {
			display: flex;
		}
		.filler {
			display: block;
			margin: 0 1em;
			flex: 1;
			align-self: center;
		}
		.item-container {
			flex: 1.25;
		}
		.header {
			padding: 0;
			h1 {
				transform: translateX(30%);
			}
			.icon {
				cursor: pointer;
				transform: translateX(30vw);
			}
		}
		.subhead {
			font-size: 46px;
		}
		h3 {
			font-size: 38px;
		}
		.buy,
		.back {
			cursor: pointer;
		}
	}
	@media ${device.desktop} {
		max-width: 96%;
		letter-spacing: 15px;
		.filler {
			flex: 1.125;
			align-self: center;
		}
		.item-container {
			flex: 1.125;
		}
		.header {
			> h1 {
				font-size: 72px;
			}
		}
		.subhead {
			font-size: 52px;
		}
		.back {
			margin-top: 20px;
			width: 80px;
			cursor: pointer;
		}
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
	@media ${device.mobileS} and (max-width: ${size.mobileM}) {
		padding: 0.5em;
		margin-bottom: 15px;
		.title {
			margin-top: 0.4em;
		}
	}
	@media ${device.tablet} {
		margin-bottom: 15px;
		.title {
			margin-top: 0.4em;
			font-size: 28px;
		}
	}
	@media ${device.laptop} {
		margin: 0 1.5em 2em;
		padding: 1em;
		.grid {
			padding: 0 5%;
		}
	}
	@media ${device.desktop} {
		margin: 0 10px 40px;
		letter-spacing: 10px;
		.grid {
			grid-row-gap: 30px;
			padding: 0 8%;
		}
		.title {
			margin: 0.7em 0;
			font-size: 36px;
		}
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
	@media ${device.mobileS} and (max-width: ${size.mobileM}) {
		padding: 7px 15px;
		.crystal-name {
			font-size: 16px;
			margin-bottom: 10px;
		}
		.desc {
			font-size: 12px;
			margin-bottom: 8px;
		}
		.status {
			.cost,
			.left {
				padding-right: 13px;
			}
		}
		.buy {
			margin: 5px auto;
		}
	}
	@media ${device.tablet} {
		padding-left: 20px;
		.crystal-name {
			font-size: 26px;
		}
		.desc {
			font-size: 18px;
			margin-bottom: 10px;
		}
		.status {
			.cost,
			.left {
				font-size: 20px;
				padding-right: 13px;
			}
		}
	}
	@media ${device.laptop} {
		flex: 0.85;
		height: fit-content;
		align-self: center;
		padding: 10px 35px;
		margin-right: 0.5em;
		letter-spacing: 3px;
		transform: translate(0, -10%);
		.status {
			.cost,
			.left {
				display: block;
				line-height: 2em;
			}
		}
		.buy {
			padding: 10px 60px;
		}
	}
	@media ${device.desktop} {
		flex: 1;
		margin-left: 10px;
		letter-spacing: 5px;
	}
`;

class ShopPage extends Component {
	componentDidMount() {
		this.props.loginStore.getProfile();
		this.props.shopStore.getProfile();
		this.props.shopStore.getOwned();
		this.props.shopStore.loadToBuy();
	}
	render() {
		const store = this.props.shopStore;
		return (
			<ShopPageContainer>
				<Details1 />
				<Details2 />
				<div className="header">
					<h1>HAWKEYE</h1>

					<Link className="icon" to="">
						<RulesIcon />
					</Link>
					<Link
						className="icon"
						onClick={() => {
							this.props.loginStore.logout();
						}}
						to=""
					>
						<LogoutIcon />
					</Link>
				</div>
				<h1 className="subhead">Shop</h1>
				<h3>Your Points: {this.props.shopStore.points}</h3>
				<div className="wrapper">
					<div className="filler">
						<Map />
						{/* <Waves /> */}
					</div>

					<div className="item-container">
						<ItemsContainer>
							<div className="title">Choose an Elixir</div>
							<div className="grid">
								<ShopItem number={0} />
								<ShopItem number={1} />
								<ShopItem number={2} />
								<ShopItem number={3} />
							</div>
						</ItemsContainer>
						{store.points > store.resetMinimumPointsReq ? (
							<div className="reset" onClick={store.resetStore.bind(store)}>
								<span>Reset Store</span>
							</div>
						) : (
							<div className="reset reset-blocked">Reset Store</div>
						)}
					</div>
					<ItemDescription>
						<div className="crystal-name">Crystal {store.getSelected + 1}</div>
						<div className="desc">
							{store.itemDescriptions[store.getSelected]}
						</div>
						<div className="status">
							<span className="cost">
								Cost: {store.itemCost[store.getSelected]} Points
							</span>
							<span className="left">
								Left: {store.toBuy[store.getSelected]}
							</span>
						</div>
						{store.toBuy[store.getSelected] !== 0 ? (
							<div className="buy" onClick={store.buyItem.bind(store)}>
								Buy
							</div>
						) : (
							<div className="buy buy-blocked">Buy</div>
						)}
						<span className="message">{store.message}</span>
					</ItemDescription>
				</div>
				<Link className="back" to="/regions">
					<BackButton />
				</Link>
				{this.props.loginStore.profileSetError &&
				!this.props.loginStore.loggedIn ? (
					<Redirect
						to={{
							pathname: '/login',
						}}
					/>
				) : null}
			</ShopPageContainer>
		);
	}
}
ShopPage = inject('shopStore', 'loginStore')(observer(ShopPage));
export { ShopPage };
