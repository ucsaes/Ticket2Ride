import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import './personalcomps.css';

function TrainNumBox({ color, num }) {
  return (
    <div className={`square color${color}`}>
      {num[color] === 0 ? (color === 9 ? 0 : '') : num[color]}
    </div>
  );
}

export default TrainNumBox;
