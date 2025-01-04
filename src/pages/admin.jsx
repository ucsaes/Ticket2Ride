import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import { checkUserCredentials } from '../firebase/firebaseUtils';
import { drawCards, drawOne } from './cards_util';
import Header from '../componets/header';

function Admin() {
  const [submittedId, setSubmittedId] = useState(
    localStorage.getItem('id') || ''
  );
  const [submittedPassword, setSubmittedPassword] = useState(
    localStorage.getItem('password') || ''
  );
  const navigate = useNavigate();

  // 처음 한번 설정

  const initialSetting = async () => {
    const isValidUser = await checkUserCredentials(
      submittedId,
      submittedPassword
    );

    if (!isValidUser) {
      console.error('Invalid password');
      navigate('/exception');
      return;
    }

    try {
      //학생들 설정
      if (false) {
        for (let cls = 1; cls <= 27; cls++) {
          for (let group = 1; group < 6; group++) {
            console.log(cls, group);
            const curUser = doc(
              db,
              'users',
              cls.toString().padStart(2, '0') + '_' + group.toString()
            );
            await setDoc(curUser, {
              password: '1234', //학생들 비밀번호
              cardnum: 0,
              cards: [0, 0, 0, 0, 0, 0, 0, 0],
              destcards: [-1, -1, -1, -1],
              number: group.toString(),
              score: 0,
              train: 45,
            }).catch((err) => {
              console.error('Error 1');
            });
          }
        }
      }

      //디렉터 설정
      if (false) {
        for (let cls = 1; cls <= 27; cls++) {
          const curUser = doc(
            db,
            'users',
            cls.toString().padStart(2, '0') + '_' + '0'
          );
          await setDoc(curUser, {
            password: '0215', //디렉터 비밀번호
          }).catch((err) => {
            console.error('Error 1');
          });
        }
      }

      //기차카드 설정
      if (false) {
        for (let cls = 1; cls <= 27; cls++) {
          await setDoc(doc(db, 'traincards', cls.toString().padStart(2, '0')), {
            deck: [12, 12, 12, 12, 12, 12, 12, 12, 14],
            returned: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            visible: [-1, -1, -1, -1, -1],
          });
        }
      }

      //목적지카드 설정
      if (false) {
        for (let cls = 1; cls <= 27; cls++) {
          await setDoc(doc(db, 'destcards', cls.toString().padStart(2, '0')), {
            remain: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ],
          });
        }
      }

      //목적지카드 종류 설정
      if (false) {
        await setDoc(doc(db, 'destcards', 'info'), {
          start: new Array(30).fill('창의학습관'),
          end: new Array(30).fill('교양분관'),
        });
      }

      console.log('successfully done');
    } catch (error) {
      console.error('Error 2');
      return;
    }
  };

  const gameSetting = async () => {
    const isValidUser = await checkUserCredentials(
      submittedId,
      submittedPassword
    );

    if (!isValidUser) {
      console.error('Invalid password');
      navigate('/exception');
      return;
    }

    //기차카드 설정
    if (false) {
      for (let cls = 1; cls <= 27; cls++) {
        let deck = [12, 12, 12, 12, 12, 12, 12, 12, 14];

        for (let group = 1; group <= 5; group++) {
          let result = drawCards(deck, 4);
          deck = result.deck;
          // 학생 카드 저장
          let groupCards = new Array(9).fill(0);
          for (let i of result.drawnCards) {
            groupCards[i] += 1;
          }
          await updateDoc(
            doc(
              db,
              'users',
              cls.toString().padStart(2, '0') + '_' + group.toString()
            ),
            {
              cardnum: 4,
              cards: groupCards,
            }
          ).catch((err) => {
            console.error('Error 1');
          });
        }

        let result = drawCards(deck, 5);
        deck = result.deck;
        let extraCards = result.drawnCards;

        await setDoc(doc(db, 'traincards', cls.toString().padStart(2, '0')), {
          deck: deck,
          visible: extraCards,
        });
      }
    }

    // 목적지 카드 설정
    if (true) {
      for (let cls = 1; cls <= 27; cls++) {
        let remain = Array.from({ length: 30 }, (_, i) => i);

        for (let group = 1; group <= 5; group++) {
          let groupCards = new Array(4).fill(-1);
          let result = drawOne(remain);
          remain = result.updatedList;
          groupCards[0] = result.drawnNumber;
          result = drawOne(remain);
          remain = result.updatedList;
          groupCards[1] = result.drawnNumber;

          await updateDoc(
            doc(
              db,
              'users',
              cls.toString().padStart(2, '0') + '_' + group.toString()
            ),
            {
              destcards: groupCards,
            }
          ).catch((err) => {
            console.error('Error 1');
          });
        }

        await setDoc(doc(db, 'destcards', cls.toString().padStart(2, '0')), {
          remain: remain,
        });
      }
    }

    console.log('successfully done');
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <button
        onClick={() => {
          initialSetting();
        }}
      >
        initial setting
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          gameSetting();
        }}
      >
        game setting
      </button>
    </>
  );
}

export default Admin;
