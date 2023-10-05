// TutorProfile.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import './Tutorfeedback.css';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { BiSolidQuoteAltLeft } from "react-icons/bi";

function Tutorfeedback() {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);


  const {userobj}=useSelector(state=>state.user);
  useEffect(() => {
    axios.get(`http://localhost:4000/tutor-api/getusers/${tutorId}`)
      .then(response => {
        setTutor(response.data.payload);
        setFeedbackList(response.data.payload.feedback || []);
        
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
      });
  }, []);

  const submitFeedback = () => {
    // Make a POST request to submit feedback
    axios.post(`http://localhost:4000/tutor-api/submit-feedback/${tutorId}`, {
      feedback: feedback,
      username:userobj.username,
    })
    .then(response => {
      // Handle success, e.g., show a confirmation message
      //setIsFeedbackSubmitted(true);
      // Use a callback to update the state
      setFeedbackList(prevFeedbackList => [
        ...prevFeedbackList,
        { text: feedback, username: userobj.username },
      ]);
      setFeedback("");
      alert("Feedback submitted successfully");
    })
    .catch(error => {
      // Handle error
      console.error('Error submitting feedback:', error);
    });
  };

  // Fetch tutor details using another axios request, similar to what you did in the Tutors component

  return (
    <div className="tutor-profile-container">
     
      <h2>Tutor Profile</h2>

      <Card style={{ width: '100' }} className='mx-auto mt-3'>
                <Card.Body className="m-3">
                  <Card.Img className="profile-img" variant="top" src={tutor.profileImg}  />
                  <Card.Title>
                    <h3>{tutor.username}</h3>
                    </Card.Title>
                  <Card.Text>
                    <b>Email : </b> {tutor.email}
                  </Card.Text>
                  <Card.Text>
                    <b>mobile : </b> {tutor.mobileNumber }
                  </Card.Text>
                  <Card.Text>
                    <b>city :</b>  {tutor.city},{tutor.address}
                  </Card.Text>
                  <Card.Text>
                   <b>subjects :</b>{tutor.subjects}
                  </Card.Text>
                  
                </Card.Body>
              </Card>

<div className="feedback-card-container">
        
        {feedbackList.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbackList.map((feedbackItem, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <div className="feedback-icon">
                  <BiSolidQuoteAltLeft/>
                </div>
                
              <Card.Text className="feedback-text">{feedbackItem.text}</Card.Text>
                <Card.Text>-{feedbackItem.username}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

<div className="feedback-form">
  <Form>
    <Form.Group controlId="feedback">
      <Form.Label></Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Write your feedback here"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
    </Form.Group>
    <Button variant="primary" onClick={submitFeedback}>
      Submit Feedback
    </Button>
  </Form>
</div>

        

    </div>
  );
}

export default Tutorfeedback;
