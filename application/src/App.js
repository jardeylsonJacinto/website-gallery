import React, { useState } from 'react';

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