import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { updateTutor } from "../../../Slice/tutorSlice";
 import EXtradetails from "../Extradetails/EXtradetails";
function TutorProfile() {
  const { tutorobj } = useSelector((state) => state.tutor);
   const navigate=useNavigate();
 const Toeditdeatils=()=>{
 navigate('/dashboard/profileparent/extradetails');
 } 
  
  
  return (
    <div className="tutor-profile-container">
      <div className="tutor-profile">
        <img className="profile-pic" src={tutorobj.profileImg} alt="error" />
        <div className="profile-details">
          <h1>{tutorobj.username}</h1>
          <p>Email: {tutorobj.email}</p>
          <p>Mobile: {tutorobj.mobileNumber}</p>
          <p>{tutorobj.city},{tutorobj.address}</p>
          <p></p>
          <p>Subjects : {tutorobj.subjects}</p>
          
          
            <Button variant="primary" onClick={Toeditdeatils}>
              Edit Details
            </Button>
          
        </div>
      </div>

      
        
    </div>
  );
}

export default TutorProfile;
