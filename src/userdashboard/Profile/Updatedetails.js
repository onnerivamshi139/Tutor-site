import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import Card from 'react-bootstrap/Card';
import { updateTutor } from "../../Slice/tutorSlice";
function Updatedetails() {
  const { userobj } = useSelector((state) => state.user);
   const dispatch=useDispatch();
  // State for tutor details
  const [mobileNumber, setMobileNumber] = useState("");
  const [subjects, setSubjects] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  // const [isEditMode, setIsEditMode] = useState(false); // Add state for edit mode

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios.get(`http://localhost:4000/user-api/getusers/${userobj.username}`)
      .then(response => {
        const userrDetails = response.data.payload;
        setMobileNumber(userrDetails.mobileNumber || "");
        setSubjects(userrDetails.subjects || "");
        setAddress(userrDetails.address || "");
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
      });
  }, [userobj.username]);

  const handleProfilePictureChange = (e) => {
    // Handle profile picture change event and set the selected file
    setProfilePicture(e.target.files[0]);
  };

  
  

  const handleSubmit = (e) =>{
    e.preventDefault();
  
    // Create a FormData object to send the updated details including the profile picture
    const formData = new FormData();
    formData.append("mobileNumber", mobileNumber);
    formData.append("subjects", subjects);
    formData.append("address", address);
    formData.append("profilePicture", profilePicture);
  
    // Make a POST request to update the tutor's details
    axios
      .post(`http://localhost:4000/user-api/update-user/${userobj.username}`, formData)
      .then((response) => {
        
        dispatch(updateTutor(response.data.payload));
        alert("user details updated successfully");
        // Disable edit mode after successful update
        
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
      });
  };
  
  
  return (
    <div className="tutor-profile-container">
      
      
        <div className="tutor-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="mobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="subjects">
              <Form.Label>Subjects You Teach</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subjects (comma-separated)"
                onChange={(e) => setSubjects(e.target.value.split(",").map((subject) => subject.trim()))}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Complete Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={handleProfilePictureChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Details
            </Button>
          </Form>
        </div>
      
    </div>
  );
}

export default Updatedetails;
