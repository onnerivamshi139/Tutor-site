import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { updateTutor } from "../../../Slice/tutorSlice";
import Pincode from 'react-pincode';

function EXtradetails() {
  const { tutorobj } = useSelector((state) => state.tutor);
  const dispatch = useDispatch();

  // State for tutor details
  const [mobileNumber, setMobileNumber] = useState("");
  const [subjects, setSubjects] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios.get(`http://localhost:4000/tutor-api/getusers/${tutorobj.username}`)
      .then(response => {
        const tutorDetails = response.data.payload;
        setMobileNumber(tutorDetails.mobileNumber || "");
        setSubjects(tutorDetails.subjects || "");
        setAddress(tutorDetails.address || "");
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
      });
  }, [tutorobj.username]);

  const handleProfilePictureChange = (e) => {
    // Handle profile picture change event and set the selected file
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the updated details including the profile picture
    const formData = new FormData();
    formData.append("mobileNumber", mobileNumber);
    formData.append("subjects", subjects);
    formData.append("address", address);
    formData.append("profilePicture", profilePicture);

    // Make a POST request to update the tutor's details
    axios
      .post(`http://localhost:4000/tutor-api/update-tutor/${tutorobj.username}`, formData)
      .then((response) => {
        // Update the local state with the new values
        setMobileNumber(response.data.payload.mobileNumber || "");
        setSubjects(response.data.payload.subjects || "");
        setAddress(response.data.payload.address || "");

        // Dispatch an action to update the Redux store
        dispatch(updateTutor(response.data.payload));
        
        alert("Tutor details updated successfully");
      })
      .catch((error) => {
        console.error('Error updating tutor details:', error);
      });
  };

  return (
    <div>
      <h3>Update Profile</h3>
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
            <Form.Label>address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter locality"
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* <Pincode
              invalidError="Please check pincode"
              lengthError="Check length"
              value={address}
              onChange={(data) => setAddress(data)}
              getData={(data) => setAddress(data)}
            /> */}
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

export default EXtradetails;
