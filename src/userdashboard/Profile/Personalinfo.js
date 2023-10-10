import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import './personalinfo.css'; // Import your custom CSS for styling
import { useNavigate, Outlet } from 'react-router-dom';

function Personalinfo() {
  const { userobj, isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container-nav">
      <div className="profile-sidebar">
        <Nav className="flex-column">
        <Nav.Item>
            <Nav.Link onClick={() => navigate('/Userdashboard/personalinfo/profile')}>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/Userdashboard/personalinfo/updatedetails')}>
              Update Details
            </Nav.Link>
          </Nav.Item>
          
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/Userdashboard/personalinfo/requirements')}>
              Requirements
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="profile-content">
        {/* Use React Router's Outlet to render nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default Personalinfo;
