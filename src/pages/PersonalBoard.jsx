import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { db, doc, getDoc, setDoc, updateDoc } from '../firebase/firebase';

import Header from '../componets/header';

function PersonalBoard() {
  return (
    <>
      <header>
        <Header />
      </header>
    </>
  );
}

export default PersonalBoard;
