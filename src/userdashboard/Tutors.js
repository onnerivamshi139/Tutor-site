import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { useEffect,useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function Tutors(){
    let navigate=useNavigate();
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4000/tutor-api/getusers')  // Make sure this matches your backend API endpoint
        .then(response => {
          setTutors(response.data.payload);
        })
        .catch(error => {
          console.error('Error fetching tutor data:', error);
        });
        console.log(tutors);
    }, []);
    
    
    return(
        <div>
      <h1>Tutor Collection</h1>
      <ul className="list-style-type: none;">
        {tutors.map(tutor => (
          <li >
            
            {/* Display other tutor details as needed */}
            <Card style={{ width: '100' }} className='mx-auto mt-50'>
      
                <Card.Body>
                    <Card.Title>{tutor.username}</Card.Title>
                    <Card.Text>
                    Email : {tutor.email}
                    </Card.Text>
                    <Card.Text>
                    City : {tutor.city}
                    </Card.Text>
                    <Button variant="primary">equest</Button>
                </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default Tutors;