import React, {useState,useEffect} from 'react'
import { get } from '../../../utils/api';
import UserCard from '../../../components/UserCards'
import Pagination from '../../../components/Pagination'


function Leaderboard() {
    const [users, getUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    useEffect(()=>{
     const fetchUsers = async ()=>{
         setLoading(true);
         const res = await get('/api/admin/user/all');
        //  console.log(res)
          getUsers(res.data.users);
         setLoading(false);
     }   
     fetchUsers();
    }, []);


    // console.log(totalusers)
   //Get current users
   const indexOfLastUser = currentPage *usersPerPage;
   const indexOfFirstUser = indexOfLastUser-usersPerPage;
   const currentUsers = users.slice(indexOfFirstUser,indexOfLastUser)
    
   const paginate  = (pageNumber) =>{
       setCurrentPage(pageNumber)
   }
   return (
        <div>
            
            <UserCard users ={currentUsers} loading ={loading}/>
            <Pagination usersPerPage ={usersPerPage} totalUsers ={users.length} paginate ={paginate} />
        </div>
    )
}

export default Leaderboard
