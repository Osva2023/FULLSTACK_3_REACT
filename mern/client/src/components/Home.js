// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Rocket Elevators</h1>
      <button onClick={() => navigate('/')}>Continue to Agent List</button>
      <button onClick={() => window.location.href = 'http://localhost:3000/'}>Continue to Agent List</button>
    </div>
  );
}

export default Home;