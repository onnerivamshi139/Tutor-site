import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import {useSelector,useDispatch} from 'react-redux'
import { userLogin } from '../../Slice/userSlice';
import { useNavigate } from 'react-router-dom';
import Userdashboard from '../../userdashboard/userdashboard';
import './login.css'
function Login(){
    const navigate=useNavigate()
    const{ 
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();

    let {userobj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
    let dispatch=useDispatch(); 

    const onFormSubmit=(userCredObj)=>{
       // console.log(userCredObj)
    
            dispatch(userLogin(userCredObj))
            
        
        
    }
    if(isSuccess===true){
        navigate('/Userdashboard')
    }
    
    const tutorlog=()=>{
        navigate('/tutorlogin');
    }
    return(
        <div className=''>
            
            <div className='mb-3 max-auto'>
                    <b>Login as Tutor? <a href="" onClick={tutorlog}>click here</a></b>
            </div>
            
            <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>

            

            <Form.Group className="mb-3 w-60 mx-auto" controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"{...register("username",{required:true})} />
                {errors.username&& <p className='text-danger'>*Username is required</p>}
            </Form.Group>

            
            

            <Form.Group className="mb-3 w-60 mx-auto" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password",{required:true})}  />
                {errors.password&& <p className='text-danger'>*password is required</p>}
            </Form.Group>

            
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
        </div>
    )
}

export default Login;