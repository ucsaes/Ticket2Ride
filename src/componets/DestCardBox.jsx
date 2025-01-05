import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import './personalcomps.css';

function DestCardBox({ msg }) {
  return <div className={`rect`}>{msg}</div>;
}

export default DestCardBox;
