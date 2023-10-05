import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import './personalinfo.css'; // Import your custom CSS for styling
import { useNavigate } from 'react-router-dom';

function Personalinfo() {
  const { userobj, isSuccess } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <Card className='profile-card'>
  <Card.Body>
    <Card.Title className='profile-title'>Username: {userobj.username}</Card.Title>
    <img className="profile-pic" src={userobj.profileImg} alt="error" />
    <Card.Text className='profile-text'>Email: {userobj.email}</Card.Text>
    <Card.Text className='profile-text'>City: {userobj.city}</Card.Text>
    <Button variant="primary" className='edit-button'>
      Edit Details
    </Button>
  </Card.Body>
</Card>

    </div>
  );
}

export default Personalinfo;
