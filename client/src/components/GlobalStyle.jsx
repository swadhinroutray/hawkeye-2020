import { createGlobalStyle } from 'styled-components';
import bg from '../assets/Artboard.svg';
import neot from '../assets/fonts/nidsans_webfont.eot';
import nwoff from '../assets/fonts/nidsans_webfont.woff';
import nwoff2 from '../assets/fonts/nidsans_webfont.woff2';
import nttf from '../assets/fonts/nidsans_webfont.ttf';
import nsvg from '../assets/fonts/nidsans_webfont.svg';

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};
const GlobalStyle = createGlobalStyle`



@font-face {font-family: "Futura PT Heavy"; src: url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.eot"); src: url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.woff") format("woff"), url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/bf059209ee8579497a5184db40bb5076.svg#Futura PT Heavy") format("svg"); }
@font-face {font-family: "Futura PT Medium"; src: url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.eot"); src: url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.woff") format("woff"), url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/3c6b0199ae7b57966132e83c939d77e2.svg#Futura PT Medium") format("svg"); }
@font-face {
    font-family: 'nidus_sansregular';
    src: url(${neot});
    src: url(${neot}) format('embedded-opentype'),
         url(${nwoff2}) format('woff2'),
         url(${nwoff}) format('woff'),
         url(${nttf}) format('truetype'),
         url(${nsvg}) format('svg');
    font-weight: normal;
    font-style: normal;

}
	html, body {
		color:white;
		font-family: 'nidus_sansregular';
		margin:0 !important;
		padding:0 !important;
	}
	body::-webkit-scrollbar { 
		display: none; 
	}

	body{
		background-image: url(${bg});
		background-repeat: no-repeat;
		background-size: cover;
		-o-background-size: cover;
		-moz-background-size: cover;
		-webkit-background-size:cover;
		
	}
	
	.main-wrapper{
		min-height :100vh;
		overflow-x:hidden;
		overflow-y:scroll;
		:-webkit-scrollbar { 
			display: none; 
		}
	}
	*{
		color: #3abdb7;
	}
	
	.Toastify__toast-body {
		color:#276C63;
		font-family: 'nidus_sansregular';
		
}
.Toastify__toast>button{
	color:#276C63;
}
.Toastify__progress-bar--default{
	background:#276C63;
}

.Toastify__close-button--default{
	opacity:1;
	color:#276C63;
}
path{
	color:#276C63;
}
.Toastify__close-button>*{
	color:#276C63;
	opacity:1;
}	

.Toastify__toast {
	
	background:white;
}

	`;

export { GlobalStyle };
