import React, { useEffect, useState } from 'react';
import './App.css';
import { Goals } from './components/Goals';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("/users/1").then(response => 
      response.json().then(data => {
        setGoals(data.goals);
      })
    );
  }, []);

  return (
    <div className="App">
      <Goals goals={goals}/>
    </div>
  );
}

export default App;
