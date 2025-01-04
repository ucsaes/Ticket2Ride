import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';

import './App.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import TotalBoard from './pages/TotalBoard';
import PersonalBoard from './pages/PersonalBoard';
import Exception from './pages/Exception';
import Admin from './pages/admin';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/totalboard" element={<TotalBoard />} />
          <Route path="/personalboard" element={<PersonalBoard />} />
          <Route path="/exception" element={<Exception />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
