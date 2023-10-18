import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import './ProfileParent.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaInfoCircle } from 'react-icons/fa'; // Import icons from react-icons

function ProfileParent() {
  const { userobj, isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container-nav">
      <div className="profile-sidebar">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/tutorhome')}>
              <FaHome /> Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/tutorprofile')}>
              <FaUser /> Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/students')}>
              <FaUsers /> Students
            </Nav.Link>
          </Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/addservice')}>
              <FaInfoCircle /> Service
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

export default ProfileParent;
