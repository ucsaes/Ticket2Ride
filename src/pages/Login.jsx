import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import { checkUserCredentials } from '../firebase/firebaseUtils';

function LoginPage() {
  const [cls, setCls] = useState(''); // 아이디 상태
  const [group, setGroup] = useState('');
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [submittedId, setSubmittedId] = useState(
    localStorage.getItem('id') || ''
  );
  const [submittedPassword, setSubmittedPassword] = useState(
    localStorage.getItem('password') || ''
  );
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에 상태 값 저장
    if (submittedId && submittedPassword) {
      localStorage.setItem('id', submittedId);
      localStorage.setItem('password', submittedPassword);

      checkUserCredentials(submittedId, submittedPassword)
        .then((result) => {
          if (result.isValid) {
            // 로그인 성공
            setMessage('');
            console.log('success');
            if (group == '0') {
              navigate('/TotalBoard');
            } else {
              navigate('/PersonalBoard');
            }
          } else {
            // 로그인 실패
            setMessage(result.error);
          }
        })
        .catch((error) => {
          setMessage(error);
        });
    }
  }, [submittedId, submittedPassword]);

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setSubmittedId(cls.padStart(2, '0') + '_' + group); // 아이디 상태를 제출된 아이디로 저장
    setSubmittedPassword(password); // 비밀번호 상태를 제출된 비밀번호로 저장
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px', textAlign: 'center' }}>
      {/* 로고 */}
      <div style={{ margin: '40px 0' }}>
        <h2>Ticket To Ride</h2>
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleLogin}>
        {/* 반 번호 */}
        <div style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>반</p>
            <input
              type="text"
              placeholder="반 번호를 입력하세요"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </label>
        </div>

        {/* 학번 */}
        <div style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>조 번호</p>
            <input
              type="text"
              placeholder="조 번호를 입력하세요"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </label>
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>비밀번호</p>
            <input
              type="text"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </label>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          시작하기
        </button>
        <p style={{ color: 'red' }}>{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
