import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddService() {
  const [serviceType, setServiceType] = useState('');
  const [serviceMode, setServiceMode] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const { tutorobj } = useSelector((state) => state.tutor);

  const handleServiceSubmit = () => {
    if (serviceType && serviceDetails) {
      const newService = {
        serviceType,
        serviceDetails,
        serviceMode,
      };

      axios
        .post(`http://localhost:4000/tutor-api/update-tutor-services/${tutorobj.username}`, newService)
        .then((response) => {
          setServiceType('');
          setServiceDetails('');
          setServiceMode('');
          alert('Tutor services updated successfully');
        })
        .catch((error) => {
          console.error('Error updating tutor services:', error);
        });
    }
  };

  const inputStyles = {
    margin: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
  };

  return (
    <div>
      <h3>Add Service Details</h3>
      <div className="service-form">
        <div>
          <label htmlFor="serviceType">Service Type:</label>
          <select
            id="serviceType"
            name="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            style={inputStyles}
          >
            <option value="">Select a service type</option>
            <option value="School Tuitions">School Tuitions</option>
            <option value="College Tuitions">College Tuitions</option>
          </select>
        </div>
        {serviceType === 'School Tuitions' && (
          <div>
            <label htmlFor="serviceDetails">School Tuition Details:</label>
            <select
              id="serviceDetails"
              name="serviceDetails"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              style={inputStyles}
            >
              <option value="">Select a class</option>
              <option value="Class 12">Class 12</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 1">Class 1</option>
              <option value="Soon to Class 10">Soon to Class 10</option>
              <option value="All classes">All</option>
            </select>
          </div>
        )}
        {serviceType === 'College Tuitions' && (
          <div>
            <label htmlFor="serviceDetails">College Tuition Details:</label>
            <select
              id="serviceDetails"
              name="serviceDetails"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              style={inputStyles}
            >
              <option value="">Select a college tuition</option>
              <option value="Btech Tuitions">Btech Tuitions</option>
              <option value="Bsc Tuitions">Bsc Tuitions</option>
              <option value="BBA Tuitions">BBA Tuitions</option>
              <option value="Bcom Tuitions">Bcom Tuitions</option>
              <option value="Engineering Diploma Tuitions">Engineering Diploma Tuitions</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="serviceMode">Service Mode:</label>
          <select
            id="serviceMode"
            name="serviceMode"
            value={serviceMode}
            onChange={(e) => setServiceMode(e.target.value)}
            style={inputStyles}
          >
            <option value="">Select a service Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <button onClick={handleServiceSubmit} style={inputStyles} className='bg-success'>
          Submit Service
        </button>
      </div>
    </div>
  );
}

export default AddService;
