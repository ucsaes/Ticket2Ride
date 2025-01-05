import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import './totalcomps.css';

function ScoreBox({ team, score }) {
  return (
    <div></div>
    // <div className={`square color${color}`}>
    //   <div className="team">{team}</div>
    //   <div className="score">{score}</div>
    // </div>
  );
}

function LeaderBoard({ scores }) {
  const [teams, setTeams] = useState([]);
  return (
    <div className="leaderboard_container">
      <div className="title">점수판</div>
      {teams.map((t, index) => (
        <ScoreBox key={index} teams={t} score={scores[index]} />
      ))}
    </div>
  );
}

export default LeaderBoard;
