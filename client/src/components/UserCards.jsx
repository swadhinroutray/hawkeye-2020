import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
const Header = styled.h1`
    text-align:center;
    font-family: 'Raleway', sans-serif;
    font-size: 60px;
    margin-bottom: 30px;
`;
const Div = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: 10vh;
    width: 30vh;
    margin-left:auto;
    margin-right:auto;
    font-size: 20px;
    border: 2px solid #3abdb7;
    border-radius: 10px;
    margin-bottom: 10px;
    font-family:"Futura PT Medium"
`;
const Centre = styled.div`
    display:flex;
    
    justify-content:center;
    margin-left:auto;
    margin-right:auto;
    margin-top:45vh;
`;
const UserCards = ({users,loading}) => {
    if(loading){
        return(
            <Centre>
                <ReactLoading type={"spin"} color={"#3abdb7"} className="loading" />
            </Centre>
        )
    }
    return (
        <div>
        <Header>Leaderboard</Header>
            {users.map(user =>(
                <Div key ={user.id} >
                  {user.name} : {user.points}
                </Div>
            ))}
        </div>
    )
};

export default UserCards
