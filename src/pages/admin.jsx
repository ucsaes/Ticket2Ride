import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import { checkUserCredentials } from '../firebase/firebaseUtils';
import drawCards from './admin_util';

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
            visible: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ],
            remain: 30,
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

    try {
      //기차카드 설정
      if (true) {
        for (let cls = 1; cls <= 27; cls++) {
          let cards = [12, 12, 12, 12, 12, 12, 12, 12, 14];
          console.log('Initial cards:', cards);
          let totalCards = cards.reduce((sum, count) => sum + count, 0);

          for (let group = 1; group <= 5; group++) {
            let groupCards = [];

            for (let i = 0; i < 4; i++) {
              let randomIndex = Math.floor(Math.random() * totalCards);
              let chosenCardIndex = -1;
              let cumulativeSum = 0;

              // 선택된 카드 타입 결정
              for (let j = 0; j < cards.length; j++) {
                cumulativeSum += cards[j];
                if (randomIndex < cumulativeSum) {
                  chosenCardIndex = j;
                  break;
                }
              }

              // 카드 수 감소 및 결과에 추가
              if (chosenCardIndex !== -1 && cards[chosenCardIndex] > 0) {
                groupCards.push(chosenCardIndex);
                cards[chosenCardIndex]--;
                totalCards--;
              } else {
                i--; // 카드 선택 실패 시 다시 시도
              }
            }

            // 학생 카드 저장
            let groupCards_formatted = new Array(9).fill(0);
            for (let i of groupCards) {
              groupCards_formatted[i] += 1;
            }
            const curUser = doc(
              db,
              'users',
              cls.toString().padStart(2, '0') + '_' + group.toString()
            );
            await updateDoc(curUser, {
              cardnum: 4,
              cards: groupCards_formatted,
            }).catch((err) => {
              console.error('Error 1');
            });
          }

          let extraCards = [];

          for (let i = 0; i < 5; i++) {
            let randomIndex = Math.floor(Math.random() * totalCards);
            let chosenCardIndex = -1;
            let cumulativeSum = 0;

            // 선택된 카드 타입 결정
            for (let j = 0; j < cards.length; j++) {
              cumulativeSum += cards[j];
              if (randomIndex < cumulativeSum) {
                chosenCardIndex = j;
                break;
              }
            }

            // 카드 수 감소 및 결과에 추가
            if (chosenCardIndex !== -1 && cards[chosenCardIndex] > 0) {
              extraCards.push(chosenCardIndex);
              cards[chosenCardIndex]--;
              totalCards--;
            } else {
              i--; // 카드 선택 실패 시 다시 시도
            }
          }

          await setDoc(doc(db, 'traincards', cls.toString().padStart(2, '0')), {
            deck: cards,
            visible: extraCards,
          });
        }
      }

      // 목적지 카드 설정
      if (true) {
        let visible = Array.from({ length: 30 }, (_, i) => i);
      }

      console.log('successfully done');
    } catch (error) {
      console.error('Error 2');
      return;
    }
  };

  return (
    <>
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
