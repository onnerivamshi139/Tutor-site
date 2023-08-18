import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tutorLogin } from '../../Slice/tutorSlice';
import './login.css'; // Import the Login.css file

function TutorLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let { userobj, isError, isLoading, isSuccesstutor, errMsg } = useSelector((state) => state.tutor);

  if (isSuccesstutor === true) {
    navigate('/tutordashboard');
  }

  let dispatch = useDispatch();

  const onFormSubmit = (userCredObj) => {
    dispatch(tutorLogin(userCredObj));
  };

  const studentlog = () => {
    navigate('/login');
  }

  return (
    <div className='login-container'> {/* Apply the same class name for consistent styling */}
      <div className='mb-3 max-auto'>
        <b>Login as Student? <a href='#' onClick={studentlog}>click here</a></b>
      </div>
      
      <Form className='login-form' onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className='login-form-group'>
          <Form.Label className='login-form-label'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            {...register('username', { required: true })}
          />
          {errors.username && <p className='text-danger'>*Username is required</p>}
        </Form.Group>

        <Form.Group className='login-form-group'>
          <Form.Label className='login-form-label'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            {...register('password', { required: true })}
          />
          {errors.password && <p className='text-danger'>*password is required</p>}
        </Form.Group>

        <Button className='login-submit-button' variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default TutorLogin;
