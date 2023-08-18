import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
function Posts(){
    const [city, setCity] = useState('');
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tutor-api/getusers') // Make sure the URL matches your backend API endpoint
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
        <div>
           <h1>Tutor Search</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <ul>
        {filteredTutors.map(tutor => (
          <li>
            <h2>{tutor.username}</h2>
            <p>Email: {tutor.email}</p>
            <p>City: {tutor.city}</p>
            {/* Display other tutor details as needed */}
          </li>
        ))}
      </ul>
        </div>
    );
}

export default Posts;