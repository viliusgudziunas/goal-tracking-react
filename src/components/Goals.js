import React from "react";
import "./styles/Components.css";
import { Container } from "react-bootstrap";
import Goal from "./Goal";

const Goals = ({ goals }) => {
  return (
    <Container className="Container1">
      {goals.map((goal, index) => {
        console.log(goal.name);
        return <Goal key={index} name={goal.name} />;
      })}
    </Container>
  );
};

export default Goals;
