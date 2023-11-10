import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";
import './Tutor.css';

function Tutors() {
  const [city, setCity] = useState('Hyderabad');
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [schoolTuition, setSchoolTuition] = useState(false);
  const [collegeTuition, setCollegeTuition] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const { userobj } = useSelector((state) => state.user);

  const navigate = useNavigate();

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
    let filtered = tutors;

    if (city && userobj?.address) {
      filtered = filtered.filter(tutor => tutor.address?.toLowerCase() === userobj.address.toLowerCase());
    }

    if (schoolTuition || collegeTuition) {
      filtered = filtered.filter(tutor => {
        if (schoolTuition && tutor.services && tutor.services.some(service => service.type === 'School Tuitions')) {
          return true;
        }
        if (collegeTuition && tutor.services && tutor.services.some(service => service.type === 'College Tuitions')) {
          return true;
        }
        return false;
      });
    }

    if (searchQuery) {
      // Filter based on subjects
      filtered = filtered.filter(tutor => {
        if (tutor.subjects && tutor.subjects.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
        return false;
      });
    }

    setFilteredTutors(filtered);
  }, [city, tutors, userobj, schoolTuition, collegeTuition, searchQuery]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="tutors-container">
      <div className="search-bar">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {userobj.address}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item  >change address</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="accordion-container">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header><b>Filter By</b></Accordion.Header>
              <Accordion.Body>
                <Form.Check
                  type="checkbox"
                  label="School Tuitions"
                  id="schoolTuition"
                  checked={schoolTuition}
                  onChange={() => setSchoolTuition(!schoolTuition)}
                />
                <Form.Check
                  type="checkbox"
                  label="College Tuitions"
                  id="collegeTuition"
                  checked={collegeTuition}
                  onChange={() => setCollegeTuition(!collegeTuition)}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div className="search-input">
        <Form.Control
          type="text"
          placeholder="Search by subjects"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="profiles">
        {filteredTutors.length > 0 ? (
          <ul className="tutors-grid">
            {filteredTutors.map(tutor => (
              <li key={tutor._id} className="tutor-card">
                <NavLink to={`/feedback/${tutor.username}`} className="tutor-link" style={{ textDecoration: 'none' }}>
                  <Card style={{ width: '100' }} className='mx-auto mt-3'>
                    <Card.Body className="m-3">
                      <Card.Img className="profile-img" variant="top" src={tutor.profileImg} />
                      <Card.Title>
                        <h3>{tutor.username}</h3>
                      </Card.Title>
                      <Card.Text>
                        <b>Address:</b> {tutor.city}, {tutor.address}
                      </Card.Text>
                      <Card.Text>
                        <b>Subjects:</b> {tutor.subjects}, {tutor.address}
                      </Card.Text>
                      {/* {tutor.services ? (
                        <p>--Teaches for  {tutor.services[0].details}</p>
                      ) : (
                        <p>--service details are given</p>
                      )} */}
                    </Card.Body>
                  </Card>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-profiles-message">No profiles found.</p>
        )}
      </div>
    </div>
  );
}

export default Tutors;
