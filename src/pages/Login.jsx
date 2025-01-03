import React, { useRef } from 'react';

function LoginPage() {
  // 각 입력 필드를 참조하는 useRef
  const classRef = useRef(null);
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  // 특정 입력 필드로 스크롤하는 함수
  const scrollToNext = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px', textAlign: 'center' }}>
      {/* 로고 */}
      <div style={{ margin: '40px 0' }}>
        <h2>Ticket To Ride</h2>
      </div>

      {/* 입력 폼 */}
      <form>
        {/* 반 번호 */}
        <div ref={classRef} style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>반</p>
            <input
              type="text"
              placeholder="반 번호를 입력하세요"
              onBlur={() => scrollToNext(idRef)} // 입력 후 다음 필드로 스크롤
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </label>
        </div>

        {/* 학번 */}
        <div ref={idRef} style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>조 번호</p>
            <input
              type="text"
              placeholder="조 번호를 입력하세요"
              onBlur={() => scrollToNext(passwordRef)} // 입력 후 다음 필드로 스크롤
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </label>
        </div>

        {/* 비밀번호 */}
        <div ref={passwordRef} style={{ marginBottom: '35px' }}>
          <label>
            <p style={{ margin: '5px' }}>비밀번호</p>
            <input
              type="text"
              placeholder="비밀번호를 입력하세요"
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
      </form>
    </div>
  );
}

export default LoginPage;
