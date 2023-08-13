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
          {isSuccess===true ?(
            <div className="App">
      <Navbar  expand="lg" className="bg-body-tertiary">
      <Container>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="justify-content-end">
          <Nav variant="pills" className="me-auto">
            
            <NavLink className="nav-link" to="/Userdashboard/tutors">Tutors</NavLink>
            <NavLink className="nav-link" to="/Userdashboard/posts">posts</NavLink>
            <NavLink className="nav-link" to="/Userdashboard/personalinfo">Profile</NavLink>
            
            

            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
    
            <Outlet/>
      
        </div>
        ):(
          <></>
        )}
    </div>
    );
}

export default Userdashboard;