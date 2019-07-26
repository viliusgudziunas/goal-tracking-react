import React, { useState, useEffect } from "react";
import Goals from "./components/Goals";
import GoalForm from "./components/GoalForm";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("/users/1").then(res =>
      res.json().then(data => {
        setGoals(data.goals);
      })
    );
  }, []);

  return (
    <div>
      <Goals goals={goals} />
      <GoalForm
        onNewGoal={goal => setGoals(currentGoals => [...currentGoals, goal])}
      />
    </div>
  );
}

export default App;
