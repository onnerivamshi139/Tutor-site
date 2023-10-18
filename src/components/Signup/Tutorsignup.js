import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaUser, FaEnvelope, FaLock, FaUpload } from 'react-icons/fa'; // Import Font Awesome icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCity, faLock, faFileImage } from '@fortawesome/free-solid-svg-icons';

function Tutorsignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [img, setImg] = useState(null);

  const onImageSelect = (event) => {
    setImg(event.target.files[0]);
  }

  const navigate = useNavigate();

  // Navigating to student signup
  const studentNav = () => {
    navigate('/signup');
  }

  const onFormSubmit = (userObj) => {
    let formData = new FormData();

    formData.append('userObj', JSON.stringify(userObj));
    formData.append('photo', img);

    axios.post('http://localhost:4000/tutor-api/create-tutor', formData)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        // If user created successfully, then navigate to the login page
        if (response.data.message === 'new user created') {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong in creating user');
      });
  }

  return (
    <div className="signup-container">
      <div className="signup-heading">SignUp</div>
      <div className="tutor-link">
        <b>
          Joining as a student? <a href="#" onClick={studentNav}>click here</a>
        </b>
      </div>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>
            <FaUser /> Username
          </Form.Label>
          <Form.Control type="text" placeholder="Enter Username" {...register("username", { required: true })} />
          {errors.username && <p className='text-danger'>*Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <FaEnvelope /> Email address
          </Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
          {errors.email && <p className='text-danger'>*Email is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>
          <FontAwesomeIcon icon={faCity} /> City
          </Form.Label>
          <Form.Control type="city" placeholder="Enter city or town" {...register("city", { required: true })} />
          {errors.city && <p className='text-danger'>*City is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>
            <FaLock /> Password
          </Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
          {errors.password && <p className='text-danger'>*Password is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>
            <FaUpload /> Select photo
          </Form.Label>
          <Form.Control type="file" placeholder="photo" {...register("photo", { required: true })}
            onChange={(event) => onImageSelect(event)} />
          {errors.photo && <p className='text-danger'>*Profile image is required</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          SignUp 
        </Button>
      </Form>
    </div>
  );
}

export default Tutorsignup;
