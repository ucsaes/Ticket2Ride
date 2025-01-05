import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import Header from '../componets/header';
import LeaderBoard from '../componets/LeaderBoard';
import { checkUserCredentials } from '../firebase/firebaseUtils';
import './TotalBoard.css';

function TotalBoard() {
  const [submittedId, setSubmittedId] = useState(
    localStorage.getItem('id') || ''
  );
  const [submittedPassword, setSubmittedPassword] = useState(
    localStorage.getItem('password') || ''
  );
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserCredentials(submittedId, submittedPassword)
      .then((result) => {
        if (result.isValid) {
          // 로그인 성공
          console.log('login success');
        } else {
          // 로그인 실패
          console.log('here');
          navigate('/exception');
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/exception');
        return;
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      return;
    };

    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      {isLoading && (
        <div className="loading-overlay">
          <p>로딩 중입니다...</p>
        </div>
      )}
      <div className="entire_container">
        <div className="left_container">
          <LeaderBoard scores={scores} />
        </div>
        <div className="map_container"></div>
        <div className="right_container"></div>
      </div>
    </>
  );
}

export default TotalBoard;
