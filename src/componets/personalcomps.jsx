import React from 'react';

import './personalcomps.css';

const SwipeScreens = () => {
  return (
    <div className="container">
      {/* 위쪽 영역 */}
      <div className="top-section">
        {[1, 2, 3, 4].map((_, idx) => (
          <RoundedBox key={idx} />
        ))}
      </div>

      {/* 아래쪽 영역 */}
      <div className="bottom-section">
        {[...Array(9)].map((_, idx) => (
          <RoundedBox key={idx} long />
        ))}
      </div>
    </div>
  );
};

// 재사용 가능한 둥근 박스 컴포넌트
const RoundedBox = ({ long = false }) => {
  return <div className={long ? 'rounded-box long' : 'rounded-box'} />;
};

export default SwipeScreens;
