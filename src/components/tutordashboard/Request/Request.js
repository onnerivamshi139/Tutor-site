import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import './request.css';

function Request() {
  const { tutorobj } = useSelector((state) => state.tutor);
  const [Requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios.get(`http://localhost:4000/tutor-api/getusers/${tutorobj.username}`)
      .then(response => {
        const tutorDetails = response.data.payload;
        const requestsArray = tutorDetails.Requests || [];
        setRequests(requestsArray);
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
      });
  }, [tutorobj.username]);

  const handleAccept = (studentUsername) => {
    // Implement the logic to accept the request
    axios.post(`http://localhost:4000/tutor-api/accept-request`, {
      tutorId: tutorobj.username,
      studentUsername: studentUsername
    })
    .then(response => {
      // Request accepted successfully, you can update the state or perform any necessary actions
      // Reload the requests after accepting if needed
      alert("request accepted successfully");
      setRequests(response.data.payload);
    })
    .catch(error => {
      console.error('Error accepting request:', error);
    });
  };

  const handleReject = (studentUsername) => {
    // Implement the logic to reject the request
    axios.post(`http://localhost:4000/tutor-api/reject-request`, {
      tutorId: tutorobj.username,
      studentUsername: studentUsername
    })
    .then(response => {
      // Request rejected successfully, you can update the state or perform any necessary actions
      // Reload the requests after rejecting if needed
      alert("request rejected successfully");
      setRequests(response.data.payload);
      
    })
    .catch(error => {
      console.error('Error rejecting request:', error);
    });
  };

  return (
    <div className="request-container">
      <h2>Requests</h2>
      {Requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <ul className="request-list">
          {Requests.map((request, index) => (
            <li key={index} className="request-item">
              <div className="request-user">
                <img src={request.profileImg} alt={`${request.username}'s Profile`} />
                <span>{request.username}</span>
              </div>
              <div className="request-actions">
                <button className="accept-button" onClick={() => handleAccept(request.username)}>Accept</button>
                <button className="reject-button" onClick={() => handleReject(request.username)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Request;
