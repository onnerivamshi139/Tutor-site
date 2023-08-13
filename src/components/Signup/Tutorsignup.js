import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {MdLogin} from "react-icons/md";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Tutorsignup(){

    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();

    let [img,setimg]=useState(null);

    const onImageSelect=(event)=>{
        setimg(event.target.files[0]);
    }


    const navigate=useNavigate();
    //navigating to student signup
    const studentnav=()=>{
        navigate('/signup')
    }
    const onFormSubmit=(userObj)=>{

        let formData=new FormData();

        formData.append("userObj",JSON.stringify(userObj));

        formData.append("photo",img);

  
        axios.post('http://localhost:4000/tutor-api/create-tutor',userObj)
        .then(response=>{
            console.log(response)
            alert(response.data.message)
            //if user created success the navigate to login page

            if(response.data.message=='new user created'){
                navigate('/login')
            }
        })
        .catch(error=>{
            console.log(error)
            alert("something went wrong in creating user")
        })
    }
    return(
        <div>
            
            <div className='display-5 text-center text-info mb-3'>SignUp </div> 
            <div>
                <b>Joining as Student? <a href="" onClick={studentnav}>click here</a></b>
            </div>
            <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
            

            <Form.Group className="mb-3 w-60 mx-auto">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"{...register("username",{required:true})} />
                {errors.username&& <p className='text-danger'>*Username is required</p>}
            </Form.Group>

            <Form.Group className="mb-3 w-60 mx-auto">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email",{required:true})}  />
                {errors.email&& <p className='text-danger'>*email is required</p>}
            </Form.Group>

            <Form.Group className="mb-3 w-60 mx-auto" >
                <Form.Label>City</Form.Label>
                <Form.Control type="city" placeholder="Enter city or town" {...register("city",{required:true})}  />
                {errors.city&& <p className='text-danger'>*city is required</p>}
            </Form.Group>

            <Form.Group className="mb-3 w-60 mx-auto" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password",{required:true})}  />
                {errors.password&& <p className='text-danger'>*password is required</p>}
            </Form.Group>

            <Form.Group className="mb-3 w-60 mx-auto" >
                <Form.Label>Select photo</Form.Label>
                <Form.Control type="file" placeholder="photo" {...register("photo",{required:true})} 
                onChange={(event)=>onImageSelect(event)}
                 />
                {errors.photo&& <p className='text-danger'>*profile image is required</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
                SignUp <MdLogin/>
            </Button>
            </Form>
        </div>
    )
}

export default Tutorsignup;