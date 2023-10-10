    import React from 'react';
    import { useSelector } from 'react-redux';
    import Accordion from 'react-bootstrap/Accordion';
    import Button from 'react-bootstrap/Button';
    import './TutorHome.css';
    import { useNavigate } from 'react-router-dom';
    import Addavailability from './Addavailability';

    function TutorHome() {
    const { tutorobj } = useSelector((state) => state.tutor);
    const navigate = useNavigate();

    const Toextradetails = () => {
        navigate('/dashboard/profileparent/extradetails');
    };

    const Toaddavailability = () => {
        navigate('/dashboard/profileparent/addavailability');
    };

    return (
        <div className="tutor-home-container">
        <div className="welcome-header p-3">
            <h3 ><b>Welcome, {tutorobj.username}!</b> </h3>
        </div>
          <h2 className="get-started-heading"> <b>Get started with TutorSite</b></h2>
        <Accordion defaultActiveKey="0" className="accordion my-4 custom-shadow">
          
            <Accordion.Item eventKey="0">
            <Accordion.Header>
                <h5>Add Availability</h5>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
                <p>Add availability so that users can select a slot</p>
                <Button variant="dark" className="mt-3" onClick={Toaddavailability}>
                Add Availability
                </Button>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
            <Accordion.Header>
                <h5>Complete your profile</h5>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
                <p>Add your description</p>
                <Button variant="dark" className="mt-3" onClick={Toextradetails}>
                Complete Profile
                </Button>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </div>
    );
    }

    export default TutorHome;
