import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import './ProfileParent.css'
import { useNavigate, Outlet } from 'react-router-dom';

function ProfileParent() {
  const { userobj, isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <Nav className="flex-column">
        <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/tutorprofile')}>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/extradetails')}>
              EXtradetails Details
            </Nav.Link>
          </Nav.Item>
          
          {/* <Nav.Item>
            <Nav.Link onClick={() => navigate('/Userdashboard/personalinfo/requirements')}>
              Requirements
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </div>
      <div className="profile-content">
        {/* Use React Router's Outlet to render nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileParent;
