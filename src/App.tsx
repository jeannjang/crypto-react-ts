import { useState } from "react";
import React from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Welcome, ${value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          type="text"
          placeholder="Username"
          onChange={onChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default App;
