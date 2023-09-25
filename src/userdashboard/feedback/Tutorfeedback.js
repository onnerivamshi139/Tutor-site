// TutorProfile.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import './Tutorfeedback.css';

function Tutorfeedback() {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  
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
    })
    .then(response => {
      // Handle success, e.g., show a confirmation message
      //setIsFeedbackSubmitted(true);
      setFeedbackList(prevFeedbackList => [...prevFeedbackList, feedback]); // Use a callback to update the state
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

      <Card className='mx-auto mt-3'>
  <Card.Body className="m-3">
    <Card.Img variant="top" src={tutor.profileImg} className="profile-img" />
    <Card.Title>{tutor.username}</Card.Title>
    <Card.Text>
      Email: {tutor.email}
    </Card.Text>
    <Card.Text>
      City: {tutor.city}
    </Card.Text>
  </Card.Body>
</Card>

<div className="feedback-form">
  <Form>
    <Form.Group controlId="feedback">
      <Form.Label>Give Feedback</Form.Label>
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

        
<div className="feedback-list">
        <h3>Feedback</h3>
        {feedbackList.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbackList.map((feedbackItem, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>{feedbackItem}</Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Tutorfeedback;
