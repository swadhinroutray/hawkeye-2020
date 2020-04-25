import React from 'react'
import styled from 'styled-components'
import {Field,LoginFormWrapper} from '../LoginPage/LoginForm'
import {LoginPageWrapper} from '../LoginPage/LoginPage'
export default function ForgotPass() {
    return (
        <LoginPageWrapper>
            
            <h1 className="hawkeye">Hawkeye</h1>
            <LoginFormWrapper>
            <h1 className="login-head">Reset Password</h1>
            <div className="form">
            <input type="password" required name="password" placeholder="New password" />
            <input type="password" required name="password-again" placeholder="New password again" />
            </div>
            <button className="btn-login" onClick={console.log}>
						Submit
					</button>
            
            </LoginFormWrapper>
        </LoginPageWrapper>
    )
}

const ForgotWrapper=styled.div`

`