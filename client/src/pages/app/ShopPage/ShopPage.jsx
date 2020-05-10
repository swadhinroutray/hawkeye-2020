import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import ShopItem from './ShopItem';
import Details1 from '../../../components/Details1';
import Details2 from '../../../components/Details2';
import { ReactComponent as RulesIcon } from '../../../assets/RulesIcon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/LogoutIcon.svg';
import ShopHud from '../../../assets/ShopHud.svg';
import DescHud from '../../../assets/DescHud.svg';
import { ReactComponent as Map } from '../../../assets/Map.svg';
import Rules from '../../../components/Rules';
import buy from '../../../assets/buybuttonbg.svg';
import { ReactComponent as BackButton } from '../../../assets/BackButton.svg';
import { hawkLogo } from '../../../assets/landing-assets';

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
const animateDesc = keyframes`
	
	0%{
		height: 0px;
	}
	100%{
		height: fit-content;
	}
	`;
const ShopPageContainer = styled.div`
	div {
		user-select: none;
	}
	text-align: center;
	color: #3abdb7;
	letter-spacing: 0.1em;
	.header {
		margin-top: 10px;
		margin: 0 10px;
		display: flex;
		.right {
			z-index: 1000;
		}
		justify-content: space-between;
		img {
			height: 45px;
		}
		padding: 0;

		.icon {
			all: unset;
			display: inline-block;
			width: 45px;
			margin: 5px;
			transition-duration: 0.4s;
			:hover {
				cursor: pointer;
				transform: scale(1.05);
			}
		}
	}
	.subhead {
		margin: 0;
		font-size: 28px;
		letter-spacing: 0.15em;
		font-weight: 300;
		color: #fff;
	}
	.wrapper {
		padding: 0 30px 0;
	}
	h3 {
		margin: 0.3em;
		color: #fff;
		font-weight: 100;
		font-size: 21px;
		box-sizing: border-box;
	}
	.reset {
		background-image: url(${buy});
		background-size: cover;
		box-sizing: border-box;
		width: fit-content;
		text-align: center;
		letter-spacing: 3px;
		padding: 10px 50px 5px 30px;
		margin: 10px auto;
		color: #fff;
		transition: all 0.2s ease-in;
		:hover {
			cursor: pointer;
		}
		div {
			font-size: 13px;
		}
	}
	.reset-blocked {
		opacity: 50%;
		color: #3abdb7 !important;
	}

	.filler {
		display: none;
	}
	@media ${device.mobileS}, (max-width: ${size.mobileM}) {
		letter-spacing: 0;
		margin: 10px auto;
		.header {
			.icon {
				width: 35px;
			}
			img {
				width: 35px;
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
	}
	@media ${device.tablet} {
		max-width: 80%;
		margin: 0 auto;
		.header {
			padding: 20px 0;
			margin: 0;

			.icon {
				width: 8vh;
				margin: auto 15px;
			}
			img {
				height: 8vh;
				width: 8vh;
			}
		}
		.subhead {
			font-size: 36px;
		}
		h3 {
			margin: 0.3em;
			font-size: 26px;
		}
	}
	@media ${device.laptop} {
		overflow: hidden;
		max-width: 100%;
		padding: 0;
		letter-spacing: 7px;

		.wrapper {
			display: flex;
			transform: translateY(-80px);
		}
		.reset {
			transform: translateY(-80px);
		}
		.filler {
			display: block;
			margin: 0 1em;
			flex: 1;
			align-self: start;
			margin-top: 20px;
		}
		.item-container {
			flex: 1.25;
		}
		.header {
			padding: 0;
			margin: 20px;
		}
		.subhead {
			font-size: 46px;
			transform: translateY(-80px);
		}
		h3 {
			transform: translateY(-80px);
			font-size: 38px;
		}
		.buy,
		.back {
			cursor: pointer;
		}
		.reset {
			margin-bottom: 0;
		}
	}
	@media ${device.desktop} {
		margin-bottom: 0;
		max-width: 96%;
		letter-spacing: 15px;
		.filler {
			flex: 1;
			align-self: start;
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
const Background = styled.img`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 0;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	z-index: -100;
`;
const ItemsContainer = styled.div`
	padding: 1em;
	position: relative;
	margin-bottom: 20px;
	.title {
		color: #fff;
		font-size: 1.3em;
		margin: 0.8em auto 0.5em;
	}
	overflow: hidden;
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
			font-size: 26px;
		}
	}
	@media ${device.laptop} {
		margin: 0 1.5em 1em 0;
		padding: 1em;
		.grid {
			padding: 0 5%;
		}
	}
	@media ${device.desktop} {
		margin: 0 10px 10px;
		letter-spacing: 10px;
		.grid {
			grid-row-gap: 30px;
			padding: 0 8%;
		}
		.title {
			margin: 0.7em 0;
			font-size: 32px;
		}
	}
`;
const ItemDescription = styled.div`
	background: url(${DescHud}) no-repeat;
	transition: height 1s linear;
	background-size: cover;
	box-sizing: border-box;
	text-align: left;
	padding: 15px 25px;

	.crystal-name {
		font-size: 18px;
		color: #fff;
		margin-bottom: 10px;
	}
	.desc {
		font-size: 12px;
		margin-bottom: 10px;
		line-height: 20px;
	}

	.white-txt {
		color: #fff;
	}
	.status {
		font-size: 14px;
		font-weight: bold;
		.cost,
		.left {
			color: #f2ad00;
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
		padding: 7px 50px;
		color: #fff;
		user-select: none;
		margin: 10px auto;
		transition: all 0.1s ease-out;
		:hover {
			transform: scale(1.05);
		}
	}
	.buy-blocked {
		opacity: 40%;
		color: #3abdb7 !important;
	}
	.message {
		margin-top: 2px;
		font-size: 0.7em;
		min-height: 1.1em;
		user-select: none;
	}
	@media ${device.mobileS} and (max-width: ${size.mobileM}) {
		padding: 15px 25px;
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
		padding: 20px 40px;
		.crystal-name {
			font-size: 26px;
		}
		.desc {
			font-size: 18px;
			line-height: 28px;
			margin-bottom: 20px;
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
		align-self: start;
		margin-top: 40px;
		padding: 20px 25px;
		box-sizing: border-box;
		padding-right: 10px;
		margin-right: 0.5em;
		letter-spacing: 3px;
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
	constructor(props) {
		super(props);
		this.state = {
			rules: false,
		};
	}
	componentDidMount() {
		this.props.loginStore.getProfile();
		this.props.shopStore.getProfile();
		this.props.shopStore.getOwned();
		this.props.shopStore.loadToBuy();
	}
	setRules = val => {
		this.setState({ rules: val });
	};
	render() {
		const store = this.props.shopStore;
		return (
			<ShopPageContainer>
				<Details1 />
				<Details2 />
				<div className="header">
					<img src={hawkLogo} alt="hawk logo" />

					<div className="right">
						<Link className="icon" to="/regions">
							<BackButton />
						</Link>
						<div
							className="icon"
							onClick={e => {
								this.setRules(true);
							}}
						>
							<RulesIcon />
						</div>
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
							<Background src={ShopHud} />
							<div className="title">Choose an Elixir</div>
							<div className="grid">
								<ShopItem number={0} />
								<ShopItem number={1} />
								<ShopItem number={2} />
								<ShopItem number={3} />
							</div>
						</ItemsContainer>
					</div>
					<ItemDescription>
						<div className="crystal-name">
							{store.elixirName[store.getSelected]}
						</div>
						<div className="desc">
							{store.itemDescriptions[store.getSelected]}
						</div>
						<div className="status">
							<span className="cost">
								Cost:{' '}
								<span className="white-txt">
									{store.itemCost[store.getSelected]} Points
								</span>
							</span>
							<span className="left">
								Left:{' '}
								<span className="white-txt">
									{store.toBuy[store.getSelected]}
								</span>
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
				{store.points > store.resetMinimumPointsReq ? (
					<div className="reset" onClick={store.resetStore.bind(store)}>
						<span>Reset Store</span>
						<div>cost: {store.resetPoints}</div>
					</div>
				) : (
					<div className="reset reset-blocked">
						<span>Reset Store</span>
						<div>cost: {store.resetPoints}</div>
					</div>
				)}
				{this.props.loginStore.profile.allanswered === true && (
					<Redirect to="/regions" />
				)}
				{this.state.rules && <Rules setrules={this.setRules} />}
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
