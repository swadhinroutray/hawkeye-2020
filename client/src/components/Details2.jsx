import React, { Component } from 'react';
import styled from 'styled-components';
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
const SVG = styled.svg`
	height: 60%;
	position: fixed;
	left: 1%;
	top: 20%;
	opacity: 59%;
	@media ${device.tablet} {
		height: 70%;
		top: 15%;
	}
`;
export class Details2 extends Component {
	render() {
		return (
			<SVG
				id="Viewport"
				xmlns="http://www.w3.org/2000/SVG"
				viewBox="0 0 27.5 1452.25"
			>
				<defs>
					<style>{'.cls-1{fill:#757dbc}'}</style>
				</defs>

				<g id="OBJECTS">
					<path
						className="cls-1"
						d="M12.44,1085a.86.86,0,0,0,.86-.86V766.18a.86.86,0,0,0-1.72,0V1084.1A.86.86,0,0,0,12.44,1085Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,767H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,777H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,786.91H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,796.84H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,806.78H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,816.71H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,826.65H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,836.58H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,846.52H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,856.45H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,866.39H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,876.32H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,886.26H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,896.19H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,906.13H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,916.06H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,926H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,935.94H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,945.87H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,955.81H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,965.74H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,975.68H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,985.61H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,995.55H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1005.48H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1015.42H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1025.35H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1035.29H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1045.22H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1055.16H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1075.08H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1065.09H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1383a.86.86,0,0,0,.86-.86V1064.23a.86.86,0,1,0-1.72,0v317.92A.86.86,0,0,0,12.44,1383Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1065.09H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1075H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1094.9H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1104.83H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1114.77H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1124.7H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1134.64H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1144.57H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1154.51H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1164.44H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1174.38H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1184.31H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1194.25H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1204.18H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1214.12H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1224.05H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1234H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1243.92H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1253.86H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1263.79H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1273.73H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1283.66H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1293.6H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1303.53H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1313.47H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1323.41H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1333.34H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1343.28H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1353.21H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1383H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1373.13H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1363.15H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,786.91a.86.86,0,0,0,.86-.86V468.13a.86.86,0,0,0-1.72,0V786A.86.86,0,0,0,12.44,786.91Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,469H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,478.92H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,488.85H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,498.79H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,508.72H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,518.66H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,528.6H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,538.53H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,548.47H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,558.4H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,568.34H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,578.27H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,588.21H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,598.14H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,608.08H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,618H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,627.95H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,637.88H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,647.82H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,657.75H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,667.69H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,677.62H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,687.56H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,697.49H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,707.43H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,717.36H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,727.3H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,737.23H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,747.17H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,757.1H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,786.91H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,777H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,767H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1383.88a.86.86,0,0,0,.86-.86V1065.09a.86.86,0,0,0-1.72,0V1383A.86.86,0,0,0,12.44,1383.88Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1066H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1075.89H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085.82H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1095.76H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1105.69H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1115.63H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1125.56H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1135.5H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1145.43H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1155.37H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1165.3H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1175.24H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1185.17H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1195.11H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1205H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1215H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1224.91H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1234.85H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1244.78H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1254.72H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1264.65H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1274.59H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1284.52H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1294.46H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1304.39H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1314.33H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1324.26H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1334.2H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1344.13H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1354.07H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1383.88H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1374H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1364H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1681.93a.86.86,0,0,0,.86-.86V1363.15a.86.86,0,1,0-1.72,0v317.92A.86.86,0,0,0,12.44,1681.93Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1364H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1373.94H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1383.88H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1393.81H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1403.75H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1413.68H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1423.62H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1433.55H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1443.49H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1453.42H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1463.36H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1473.29H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1483.23H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1493.16H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1503.1H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1513H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1523H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1532.9H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1542.84H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1552.77H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1562.71H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1572.64H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1582.58H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1592.51H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1602.45H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1612.38H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1622.32H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1632.25H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1642.19H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1652.12H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1681.93H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1672H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1662.06H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085.82a.86.86,0,0,0,.86-.86V767a.86.86,0,1,0-1.72,0V1085A.86.86,0,0,0,12.44,1085.82Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,767.9H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,777.83H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,787.77H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,797.7H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,807.64H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,817.57H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,827.51H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,837.44H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,847.38H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,857.31H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,867.25H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,877.18H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,887.12H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,897.05H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,907H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,916.92H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,926.86H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,936.79H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,946.73H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,956.66H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,966.6H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,976.53H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,986.47H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,996.41H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1006.34H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1016.28H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1026.21H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1036.15H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1046.08H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1056H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085.82H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1075.94H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1066H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,847.38a.86.86,0,0,0,.86-.86V528.6a.86.86,0,0,0-1.72,0V846.52A.86.86,0,0,0,12.44,847.38Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,529.45H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,539.39H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,549.32H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,559.26H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,569.19H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,579.13H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,589.07H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,599H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,608.94H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,618.87H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,628.81H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,638.74H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,648.68H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,658.61H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,668.55H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,678.48H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,688.42H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,698.35H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,708.29H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,718.22H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,728.16H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,738.09H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,748H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,758H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,767.9H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,777.83H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,787.77H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,797.7H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,807.64H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,817.57H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,847.38H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,837.5H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,827.51H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1145.43a.86.86,0,0,0,.86-.86V826.65a.86.86,0,1,0-1.72,0v317.92A.86.86,0,0,0,12.44,1145.43Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,827.51H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,837.44H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,847.38H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,857.31H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,867.25H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,877.18H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,887.12H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,897.05H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,907H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,916.92H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,926.86H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,936.79H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,946.73H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,956.66H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,966.6H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,976.53H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,986.47H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,996.41H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1006.34H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1016.28H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1026.21H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1036.15H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1046.08H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1056H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1066H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1075.89H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1085.82H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1095.76H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1105.69H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1115.63H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1145.43H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1135.55H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,1125.56H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,549.32a.86.86,0,0,0,.86-.86V230.54a.86.86,0,0,0-1.72,0V548.47A.86.86,0,0,0,12.44,549.32Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,231.4H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,241.34H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,251.27H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,261.21H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,271.14H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,281.08H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,291H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,300.95H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,310.88H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,320.82H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,330.75H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,340.69H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,350.62H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,360.56H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,370.49H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,380.43H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,390.36H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,400.3H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,410.23H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,420.17H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,430.1H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,440H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,450H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,459.91H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,469.84H38.22a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,479.78H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,489.71H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,499.65H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,509.58H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,519.52H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,549.32H23.9a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,539.44H23.9a.86.86,0,0,0,0-1.72H12.44a.86.86,0,0,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
					<path
						className="cls-1"
						d="M12.44,529.45H38.22a.86.86,0,1,0,0-1.72H12.44a.86.86,0,1,0,0,1.72Z"
						transform="translate(-11.58 -229.68)"
					/>
				</g>
			</SVG>
		);
	}
}

export default Details2;
