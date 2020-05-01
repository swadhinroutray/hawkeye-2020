import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import HAWK from '../../../assets/HAWK.svg'
import iecse from '../../../assets/iecse.svg'
 const LoginPage = () => {
	return (
		<LoginPageWrapper>
			<img id="hawklogo" src={HAWK} alt="Hawk"/>
			<a href="https://iecsemanipal.com/"><img id="iecselogo" src={iecse} alt="iecse"/></a>
			<h1 className="hawkeye">Hawkeye</h1>
			
			<LoginForm />
		</LoginPageWrapper>
	);
};
const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1560px',
};
export const LoginPageWrapper = styled.div`
height: 100vh;
text-align: center;
font-family: "Futura PT Heavy";
.hawkeye{
	
	font-size:3.2rem;
	font-weight: 400;

	color: white
}
.login-head {
	
	color: white;
	font-size:2rem;
	letter-spacing:0.1em;
	font-weight: 400;
}
#hawklogo{
	position:absolute;
	left:2%;
	width:2rem;
	height:2rem;
}
#iecselogo{
	position:absolute;
	right:2%;
	width:4rem;
	height:4rem;
}
@media only screen and (max-device-width){

}
`;
export default LoginPage