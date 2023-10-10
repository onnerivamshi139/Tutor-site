import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import './Tutor.css';


function Tutors() {
  const [city, setCity] = useState('Hyderabad');
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const { userobj } = useSelector((state) => state.user);
  // const requestobj={username:userobj.username,
  //                   profileImg:userobj.profileImg};
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

      <ul className="tutors-grid">
        {filteredTutors.map(tutor => (
          <li key={tutor._id} className="tutor-card">
            {/* Use Link to navigate to the tutor profile */}
            < NavLink to={`/Userdashboard/feedback/${tutor.username}`} className="tutor-link" style={{ textDecoration: 'none' }}>
              <Card style={{ width: '100' }} className='mx-auto mt-3'>
                <Card.Body className="m-3">
                  <Card.Img className="profile-img" variant="top" src={tutor.profileImg}  />
                  <Card.Title>
                    <h3>{tutor.username}</h3>
                    </Card.Title>
              
                    
                  <Card.Text>
                    <b>city :</b>  {tutor.city},{tutor.address}
                  </Card.Text>
                  <Card.Text>
                   <b>subjects :</b>{tutor.subjects}
                  </Card.Text>
                  
                  
                </Card.Body>
              </Card>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tutors;
