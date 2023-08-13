import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home(){
  let navigate=useNavigate();
    const onopen=()=>{
      navigate('/login')
    }
    return(
        <div className='body'>
          <header className="App-header">
        <h1>Home Tutoring Services</h1>
        <p>Welcome to our website!</p>
        <p>We offer personalized tutoring services for all ages.</p>
        <button onClick={onopen}>Get Started</button>
      </header>
      <section className="About">
        <h2>About Us</h2>
        <p>
          Our team of experienced tutors is dedicated to helping students achieve their academic goals.
          Whether it's improving grades, preparing for exams, or gaining a deeper understanding of subjects,
          we're here to support your learning journey.
        </p>
      </section>
      <section className="Services">
        <h2>Our Services</h2>
        <ul>
          <li>Mathematics</li>
          <li>Science</li>
          <li>Language Arts</li>
          <li>History</li>
          <li>Test Preparation</li>
        </ul>
      </section>
      <section className="Contact">
        <h2>Contact Us</h2>
        <p>Ready to get started? Contact us for any queries</p>
        <p>Email: vonnerivamshi@gmail.com</p>
        <p>Phone: 9177497478</p>
      </section>
      
    </div>
        
    )
}

export default Home; 