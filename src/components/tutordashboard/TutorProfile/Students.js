import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Students.css'

function Students() {
  const { tutorobj } = useSelector((state) => state.tutor);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios.get(`http://localhost:4000/tutor-api/getusers/${tutorobj.username}`)
      .then(response => {
        const tutorDetails = response.data.payload;
        const studentsArray = tutorDetails.Students || [];

        setStudents(studentsArray);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching tutor data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [tutorobj.username]);

  return (
    <div>
      <h2>Students</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        students.length > 0 ? (
          <div>
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <div className="left">
                  <img src={student.profileImg} alt="Student" />
                </div>
                <div className="right">
                  <p className='profname'>{student.username}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No students yet</p>
        )
      )}
    </div>
  );
}

export default Students;
