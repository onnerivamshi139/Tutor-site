import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Preload from 'react-preload';

function Home() {
  let navigate = useNavigate();
  const onopen = () => {
    navigate('/login');
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Define an array of image URLs to preload
  const imagesToPreload = [
    'https://topmate.io/_next/static/media/img-landing-hero-1.fff4d8ae.svg',
    'https://topmate.io/_next/static/media/img-landing-hero-2.f490f0c5.svg',
  ];

  return (
    <div className='body'>
      <div className='crouselandheader bg-dark'>
        <header className='App-header bg-dark'>
          <h1>Tutoring Services</h1>
          <p>Welcome to our website!</p>
          <p>We offer personalized tutoring services for all ages.</p>
          <button onClick={onopen}>Get Started</button>
        </header>
        <div className='crousel'>
          <Preload images={imagesToPreload}>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
              <Carousel.Item>
                <a href='/product/f6a6bf7f'>
                  <img
                    className='d-block imgsize'
                    src='https://topmate.io/_next/static/media/img-landing-hero-1.fff4d8ae.svg'
                    alt='First slide'
                  />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a href='/product/ed644f9c'>
                  <img
                    className='d-block imgsize'
                    src='https://topmate.io/_next/static/media/img-landing-hero-2.f490f0c5.svg'
                    alt='Second slide'
                  />
                </a>
              </Carousel.Item>
            </Carousel>
          </Preload>
        </div>
      </div>
      <section className='Contact'>
        <h2>Contact Us</h2>
        <p>Ready to get started? Contact us for any queries</p>
        <p>Email: vonnerivamshi@gmail.com</p>
        <p>Phone: 9177497478</p>
      </section>
    </div>
  );
}

export default Home;
