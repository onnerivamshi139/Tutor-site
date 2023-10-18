// Tutorfeedback.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import './Tutorfeedback.css';
import { useSelector } from 'react-redux';
import { BiSolidQuoteAltLeft } from "react-icons/bi";

function Tutorfeedback() {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const { userobj } = useSelector(state => state.user);

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
    axios.post(`http://localhost:4000/tutor-api/submit-feedback/${tutorId}`, {
      feedback: feedback,
      username: userobj.username,
    })
      .then(response => {
        setFeedbackList(prevFeedbackList => [
          ...prevFeedbackList,
          { text: feedback, username: userobj.username, profileImg: userobj.profileImg },
        ]);
        setFeedback("");
        alert("Feedback submitted successfully");
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
      });
  };

  const sendRequest = (username) => {
    axios.post('http://localhost:4000/tutor-api/send-request', {
      tutorId: username,
      userobj: userobj,
    })
      .then(response => {
        alert("Request sent successfully");
      })
      .catch(error => {
        console.error('Error sending request:', error);
      });
  };

  return (
    <div className="tutor-profile-container1">
      <div className="profile-container">
        <div className="profile-img-container">
          <img className="profile-img" src={tutor.profileImg} alt="Tutor Profile" />
        </div>
        <div className="profile-details">
          <h3>{tutor.username}</h3>
          <p><b>Email:</b> {tutor.email}</p>
          <p><b>Mobile:</b> {tutor.mobileNumber}</p>
          <p><b>City:</b> {tutor.city}, {tutor.address}</p>
          <p><b>Subjects:</b> {tutor.subjects}</p>
          {tutor.services ? (
            <p>--Offers {tutor.services[0].type} for {tutor.services[0].details} Classes</p>
          ) : (
            <p>--Service details are given</p>
          )}
          <p></p>
          <Button
            variant="primary"
            onClick={() => sendRequest(tutor.username)}
            disabled={tutor.Requests && tutor.Requests.includes(userobj.username)}
          >
            {tutor.Requests && tutor.Requests.includes(userobj.username) ? 'Request Sent' : 'Request'}
          </Button>
        </div>
      </div>

      <div className="feedback-container1">
        <div className="feedback-card-container1">
          {feedbackList.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            <div className="feedback-row">
              {feedbackList.map((feedbackItem, index) => (
                <div key={index} className="feedback-card">
                  <div className="feedback-icon">
                    <BiSolidQuoteAltLeft />
                  </div>
                  <div className="feedback-text">
                    <p>{feedbackItem.text}</p>
                    <p>
                      - <img src={feedbackItem.profileImg} alt="Profile" className="circular-profile-img" /> {feedbackItem.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
}

export default Tutorfeedback;
