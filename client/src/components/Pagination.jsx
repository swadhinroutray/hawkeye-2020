import React from 'react'
import styled from 'styled-components'

const Link = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width : 20vh;
    margin-left:auto;
    margin-right:auto;
`;
 const Pagination = ({usersPerPage,totalUsers, paginate}) => {
    const pageNumber = [];
    for(let i=1;i<=Math.ceil(totalUsers/usersPerPage);i++){
        pageNumber.push(i);
    }
    return (
        <nav>
            <Link>
                {pageNumber.map(number =>(
                    <h1 key ={number} className ='page-item'>
                        <a onClick= {()=> paginate(number)} href ='/admin/leaderboard/!#' className ='page-link'>
                            {number}
                        </a>
                    </h1>
                ))}
                </Link>
        </nav>
            
        
    )
};

export default Pagination;
