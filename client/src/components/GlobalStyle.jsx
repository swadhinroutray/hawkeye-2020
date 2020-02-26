import { createGlobalStyle } from 'styled-components';

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
		margin:0;
		padding:0;
		background: radial-gradient(
			103.64% 49.14% at 50% 50%,
			#312163 0%,
			#24113b 100%
			);
			
		overflow: auto;
		overflow-x: hidden;
	}
	`;

export { GlobalStyle };
