import React from "react";

const Goals = ({ goals }) => {
  return (
    <div>
      {goals.map((goal, index) => {
        return <h4 key={index}>{goal.name}</h4>;
      })}
    </div>
  );
};

export default Goals;
