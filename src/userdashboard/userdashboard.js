import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {  useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Userdashboard(){
  let {userobj,isError,isLoading,isSuccess,errMsg}=useSelector((state)=>{
    //  console.log('state',state)
      return state.user
    });
    let navigate=useNavigate();
    if(isSuccess!==true){
      navigate('/login');
    }
    return(
        <div>

    
            <Outlet/>
      
        
       
    </div>
    );
}

export default Userdashboard;