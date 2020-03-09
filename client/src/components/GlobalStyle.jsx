import { createGlobalStyle } from 'styled-components';
import bg from '../assets/Artboard.svg';
const GlobalStyle = createGlobalStyle`



@font-face {
    font-family: 'nidus_sansregular';
    src: url('nidsans-webfont.eot');
    src: url('nidsans-webfont.eot?#iefix') format('embedded-opentype'),
         url('nidsans-webfont.woff2') format('woff2'),
         url('nidsans-webfont.woff') format('woff'),
         url('nidsans-webfont.ttf') format('truetype'),
         url('nidsans-webfont.svg#nidus_sansregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
	html, body {
		font-family: 'Nidus Sans';
		height: 100%;
		margin:0 !important;
		padding:0 !important;
		overflow: auto;
		overflow-x: hidden;
	}
	body{
		background-image: url(${bg})
	}
	*{
		color: #3abdb7;
	}
	`;

export { GlobalStyle };
