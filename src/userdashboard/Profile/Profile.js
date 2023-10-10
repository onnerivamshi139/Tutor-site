
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
function Profile() {
  const { userobj } = useSelector((state) => state.user);
   const navigate=useNavigate();
 const Toeditdeatils=()=>{
 navigate('n/Userdashboard/personalinfo/updatedetails');
 } 
  return (
    <div className="tutor-profile-container">
      <div className="tutor-profile">
        <img className="profile-pic" src={userobj.profileImg} alt="error" />
        <div className="profile-details">
          <h1>{userobj.username}</h1>
          <p>Email: {userobj.email}</p>
          <p>Mobile: {userobj.mobileNumber}</p>
          <p>{userobj.city},{userobj.address}</p>
          <p></p>
          <p>Subjects : {userobj.subjects}</p>
          
          
            <Button variant="primary" onClick={Toeditdeatils}>
              Edit Details
            </Button>
          
        </div>
      </div>
    </div>
  )
}

export default Profile;