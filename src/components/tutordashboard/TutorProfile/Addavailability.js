import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addavailabilityexperience } from '../../../Slice/tutorSlice';
import './Addavailability.css';

export default function AddAvailability() {
  const dispatch = useDispatch();
  const { tutorobj } = useSelector((state) => state.tutor);
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '9:00 AM - 11:00 AM',
    '10:00 AM - 12:00 AM',
    '11:00 AM - 1:00 PM',
    '12:00 PM - 2:00 PM',
    // Add more time slots as needed
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [experienceMonths, setExperienceMonths] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4000/tutor-api/getusers/${tutorobj.username}`)
      .then((response) => {
        const tutorDetails = response.data.payload;
        setSelectedDays(tutorDetails.selectedDays || []);
        setSelectedTimeSlot(tutorDetails.selectedTimeSlot || '');
        setExperienceYears(tutorDetails.experienceYears || '');
        setExperienceMonths(tutorDetails.experienceMonths || '');
      })
      .catch((error) => {
        console.error('Error fetching tutor data:', error);
      });
  }, [tutorobj.username]);

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a JSON object with the form data
    const formData = {
      selectedDays,
      selectedTimeSlot,
      experienceYears,
      experienceMonths,
    };

    axios
      .post(
        `http://localhost:4000/tutor-api/add-availability-experience/${tutorobj.username}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        }
      )
      .then((response) => {
        dispatch(addavailabilityexperience(response.data.payload));
        alert('Tutor availability and experience updated successfully');
      })
      .catch((error) => {
        console.error('Error updating tutor details:', error);
      });
  };

  return (
    <Container className="add-availability-container">
      <h2>Add Availability and Experience</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select Days:</Form.Label>
          {days.map((day) => (
            <Form.Check
              key={day}
              type="checkbox"
              id={day}
              label={day}
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
            />
          ))}
        </Form.Group>
        {selectedDays.length > 0 && (
          <Form.Group>
            <Form.Label>Select Time Slot:</Form.Label>
            <Form.Control
              as="select"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Years of Experience:</Form.Label>
          <Form.Control
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            placeholder="Years"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Months of Experience:</Form.Label>
          <Form.Control
            type="number"
            value={experienceMonths}
            onChange={(e) => setExperienceMonths(e.target.value)}
            placeholder="Months"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
