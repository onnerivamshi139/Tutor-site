import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Tutors() {
  let navigate = useNavigate();
  const [city, setCity] = useState('Hyderabad');
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tutor-api/getusers')
      .then(response => {
        setTutors(response.data.payload);
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
      });
  }, []);

  useEffect(() => {
    if (city) {
      const filtered = tutors.filter(tutor => tutor.city === city);
      setFilteredTutors(filtered);
    } else {
      setFilteredTutors([]);
    }
  }, [city, tutors]);

  return (
    <div className="tutors-container">
      <div className="search-bar">
        <Form className="">
          <Form.Control
            type="search"
            placeholder="Search"
            className=""
            aria-label="Search"
            onChange={(e) => setCity(e.target.value)}
          />
        </Form>
      </div>

      <ul className="tutors-list">
        {filteredTutors.map(tutor => (
          <li key={tutor._id} className="tutor-card">
            <Card style={{ width: '100' }} className='mx-auto mt-3'>
              <Card.Body className="m-3">
              <Card.Img variant="top" src={tutor.profileImg} className="profile-img" />
                <Card.Title>{tutor.username}</Card.Title>
                <Card.Text>
                  Email: {tutor.email}
                </Card.Text>
                <Card.Text>
                  City: {tutor.city}
                </Card.Text>
                <Button variant="primary">Request</Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tutors;
 