import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import Header from '../componets/header';
import { checkUserCredentials } from '../firebase/firebaseUtils';
import TrainNumBox from '../componets/TrainNumBox';
import DestCardBox from '../componets/DestCardBox';
import './PersonalBoard.css';

function PersonalBoard() {
  const [submittedId, setSubmittedId] = useState(
    localStorage.getItem('id') || ''
  );
  const [submittedPassword, setSubmittedPassword] = useState(
    localStorage.getItem('password') || ''
  );
  const [myTrainCards, setMyTrainCards] = useState([]);
  const [myDestCards, setMyDestCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkUserCredentials(submittedId, submittedPassword)
      .then((result) => {
        if (result.isValid) {
          // 로그인 성공
          console.log('success');
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
      try {
        const docRef = doc(db, 'users', submittedId);
        const docSnapShot = await getDoc(docRef);
        let imsi = docSnapShot.data().cards;
        imsi.push(docSnapShot.data().score);
        setMyTrainCards(imsi);

        let myDestCardsNum = docSnapShot.data().destcards;

        const docRef_2 = doc(db, 'destcards', 'info');
        const docSnapShot_2 = await getDoc(docRef_2);

        let temp = new Array(4);
        for (let i = 0; i < 4; i++) {
          if (myDestCardsNum[i] === -1) {
            temp[i] = '아직 없습니다.';
          } else {
            temp[i] =
              docSnapShot_2.data().start[myDestCardsNum[i]] +
              '\n 와(과) \n' +
              docSnapShot_2.data().end[myDestCardsNum[i]] +
              '\n 을(를) 이으세요!';
          }
        }
        setMyDestCards(temp);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
      <div className="container">
        <div className="dest_container">
          <DestCardBox msg={myDestCards[0]} />
          <DestCardBox msg={myDestCards[1]} />
          <DestCardBox msg={myDestCards[2]} />
          <DestCardBox msg={myDestCards[3]} />
        </div>
        <div className="train_container">
          <TrainNumBox color={0} num={myTrainCards} />
          <TrainNumBox color={1} num={myTrainCards} />
          <TrainNumBox color={2} num={myTrainCards} />
          <TrainNumBox color={3} num={myTrainCards} />
          <TrainNumBox color={4} num={myTrainCards} />
          <TrainNumBox color={5} num={myTrainCards} />
          <TrainNumBox color={6} num={myTrainCards} />
          <TrainNumBox color={7} num={myTrainCards} />
          <TrainNumBox color={8} num={myTrainCards} />
          <TrainNumBox color={9} num={myTrainCards} />
        </div>
      </div>
    </>
  );
}

export default PersonalBoard;
