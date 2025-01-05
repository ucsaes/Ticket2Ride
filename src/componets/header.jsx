import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom을 사용하여 페이지 이동

function Header() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.setItem('id', '');
    localStorage.setItem('password', '');
    navigate('/login'); // '/loginpage'로 리디렉션
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <span>
          {userId
            .split('_')
            .map((part, index) => {
              return index === 0
                ? parseInt(part) + '반'
                : part === '0'
                ? '디렉터'
                : part + '조';
            })
            .join(' ')}
        </span>{' '}
        {/* 좌측에 아이디 표시 */}
      </div>
      <div style={styles.right}>
        <button onClick={handleLogout}>Logout</button> {/* 로그아웃 버튼 */}
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    display: 'flex',
    top: 0, // 상단에 위치
    left: 0, // 좌측에 위치
    width: '100%', // 전체 화면 너비
    height: '40px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    zIndex: 10,
  },
  left: {
    fontSize: '18px',
  },
  right: {
    fontSize: '16px',
    marginRight: '30px', // 오른쪽에 여백 추가
  },
};

export default Header;
