import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Goal name"
      />
      <button type="submit">Add New Goal</button>
    </form>
  );
};

export default GoalForm;
