import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import './Welcome.css';

function Welcome() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 5500);
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <>
      <h1 className={fadeOut ? 'fade-out' : ''}>Ticket To Ride</h1>
      <h3 className={fadeOut ? 'fade-out' : ''}>by ucsaes</h3>
    </>
  );
}

export default Welcome;
