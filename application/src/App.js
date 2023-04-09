import React, { useState } from "react";

async function sendDescription() {
  try {
    const request = await fetch("http://localhost:4000/api", {
      method: "POST",
      body: JSON.stringify({
        prompt: description,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const res = await request.json();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
const App = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // calls the async function
    sendDescription();
    setDescription("");
    setLoading(true);
  };

  return (
    <div className="app">
      <h1>Website Idea Generator</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="description">Enter the description</label>
        <textarea
          name="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>GENERATE</button>
      </form>
    </div>
  );
};

export default App;
