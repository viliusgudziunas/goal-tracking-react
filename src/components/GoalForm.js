import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./styles/Components.css";

const GoalForm = ({ onNewGoal }) => {
  const [name, setName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const goal = { name };
    const response = await fetch("/goals/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goal)
    });
    if (response.ok) {
      onNewGoal(goal);
      setName("");
    }
  };

  return (
    <div className="div1">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Goal name"
        />
        <button type="submit">Add New Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
