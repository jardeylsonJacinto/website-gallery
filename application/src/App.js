import React, { useState } from 'react';

async function setDescription(){
  try{
    const request = await fetch('http://localhost:4000/api', {
      method: 'POST',
      body: JSON.stringify({
        prompt: description,
      }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const res = await request.json();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

const App = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ description });
    setDescription("");
  }

  return (
    <div className='app'>
      <h1>Website Idea Generator</h1>
      <form method='POST' onSubmit={handleSubmit}>
        <label htmlFor="description">Enter the description</label>
        <textarea 
          name="description"
          rows={6} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} />
          <button>GENERATE</button>
      </form>
    </div>
  )
}

export default App;