import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import HAWK from '../../../assets/HAWK.svg'
import iecse from '../../../assets/iecse.svg'
import Face from '../../../assets/Face.svg'
import Finger from '../../../assets/Finger.svg'
 const LoginPage = () => {
	return (
		<LoginPageWrapper>
			<div id="headers">
			<img id="hawklogo" src={HAWK} alt="Hawk"/>
			<div className="hawkeye">HAWKEYE</div>
			<a href="https://iecsemanipal.com/"><img id="iecselogo" src={iecse} alt="iecse"/></a>
			
			</div>
			<div id="loginStuff">
			<img id="finger" src={Finger} alt="Finger"/>
			<LoginForm />
			<img id="face" src={Face} alt="Face"/>
			</div>
			
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
display:grid;
grid-template-rows:10% auto;

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
	margin:1rem;
	width:3rem;
	height:3rem;
}
#iecselogo{
	margin:1rem;

	width:3rem;
	height:3rem;
}
#headers{
	display:flex;
	justify-content:space-between;
}

@media  (max-width:${size.laptop}){

	.hawkeye{
	
	font-size:3rem;


}




#finger,#face{
display:none;
}
#hawklogo,#iecselogo{
	width:2rem;
	height:2rem;

	margin:1rem 0.5rem;
}
}
#finger,#face{
	width:20rem;
	height:20rem;
}
#loginStuff{
	
	display:flex;
	justify-content:space-around;
	align-items: center;
}
`;
export default LoginPage