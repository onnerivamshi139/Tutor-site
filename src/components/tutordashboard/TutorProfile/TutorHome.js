import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './TutorHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TutorHome() {
  const { tutorobj } = useSelector((state) => state.tutor);
  const navigate = useNavigate();
  const [tutorCollection, setTutorCollection] = useState([]);

  useEffect(() => {
    // Create a function for the axios request and call it inside useEffect
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tutor-api/getusers");
        setTutorCollection(response.data.payload);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
      }
    };

    fetchData(); // Call the function here

  }, []); // Pass an empty dependency array to run the effect only once

  const Toextradetails = () => {
    navigate('/dashboard/profileparent/extradetails');
  };

  
  const Toaddavailability = () => {
    navigate('/dashboard/profileparent/addavailability');
  };
  const Toaddservice = () => {
    navigate('/dashboard/profileparent/addservice');
  };

  return (
    <div className="tutor-home-container">
      <div className="welcome-header p-3">
        <h3>
          <b>Welcome, {tutorobj.username}!</b>
        </h3>
      </div>
      <h2 className="get-started-heading">
        <b>Get started with TutorSite</b>
      </h2>
      <Accordion defaultActiveKey="0" className="accordion my-4 custom-shadow">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>Add Availability</h5>
          </Accordion.Header>
          <Accordion.Body className="accordion-body">
            <p>Add availability so that users can select a slot</p>
            <Button variant="dark" className="mt-3" onClick={Toaddavailability}>
              Add Availability
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>Complete your profile</h5>
          </Accordion.Header>
          <Accordion.Body className="accordion-body">
            <p>Add your description</p>
            <Button variant="dark" className="mt-3" onClick={Toextradetails}>
              Complete Profile
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>Add Service Details</h5>
          </Accordion.Header>
          <Accordion.Body className="accordion-body">
            <p>Add your description</p>
            <Button variant="dark" className="mt-3" onClick={Toaddservice}>
              Add Service Details
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h3 className=''>Get Inspired By</h3>
      <div className="tutor-profiles">
        
        {tutorCollection.slice(0, 5).map((tutor) => (
          <Card key={tutor.username} className="profile-card">
            <Card.Img variant="top" src={tutor.profileImg} />
            <Card.Body>
              <Card.Title>{tutor.username}</Card.Title>
              <Button
                variant="primary"
                onClick={() => navigate(`/feedback/${tutor.username}`)}
              >
                View Profile
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TutorHome;
