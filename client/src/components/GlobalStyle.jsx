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
         url('nidsans-webfont.svg#nidus_sansregular') format('svg'),;
		 src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
    font-style: normal;
}


	html, body {
		color:white;
		font-family: 'Nidus Sans';
		height: 100%;
		margin:0 !important;
		padding:0 !important;
		overflow: auto;
	}
	body::-webkit-scrollbar { 
                display: none; 
            }
	body{
		background-image: url(${bg});
		background-repeat: no-repeat;
		background-size: cover;
	}
	*{
		color: #3abdb7;
	}
	`;

export { GlobalStyle };
