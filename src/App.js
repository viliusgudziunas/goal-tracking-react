import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then(response => {
        console.log(response);
      });
  };

  const handleClick = e => {
    fetch("/users/1")
      .then(response => {
        console.log(response);
      })
      .then(response => {
        console.log(response);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        Email:
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
