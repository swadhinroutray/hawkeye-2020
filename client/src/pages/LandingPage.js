import React from 'react';
import styled from 'styled-components';

export const LandingPage = () => {
	return (
		<Page>
			<h1>HAWKEYE</h1>
			<h3>WELCOME NAME</h3>
			<h3>SELECT YOUR REGION</h3>
			<div>3022 AD</div>
			<div className="info">
				<div>REGION: AVALON</div>
				<div>LOCATION: NEW ENGLAND</div>
				<div>YEAR: 3120AD</div>
				<div>DATE: 26-28 MARCH</div>
				<div>12AM-12PM</div>
				<button>START</button>
			</div>
			<div>TODAYS LIST OF EVENTS</div>
		</Page>
	);
};

const Page = styled.div`
	height: 100vh;
	text-align: center;
	font-family: Raleway, sans-serif;
`;
