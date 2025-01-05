import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import './totalcomps.css';

function ScoreBox({ team, score }) {
  return (
    <div className="TeamInfoBox">
      <div>{team}조</div>
      <div>{score}점</div>
    </div>
    // <div className={`square color${color}`}>
    //   <div className="team">{team}</div>
    //   <div className="score">{score}</div>
    // </div>
  );
}

function LeaderBoard({ scores }) {
  const [teams, setTeams] = useState([0, 1, 2, 3, 4]);
  scores = [100, 90, 80, 70, 60];
  return (
    <div className="leaderboard_container">
      <div className="title">점수판</div>
      {teams.map((t, index) => (
        <ScoreBox key={index} team={t + 1} score={scores[index]} />
      ))}
    </div>
  );
}

export default LeaderBoard;
