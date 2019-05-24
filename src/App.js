import React from 'react';
import './App.css';
import HealthForm from './HealthForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> Click on the bottom-right icon to use the ChatBot. </p>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <HealthForm />
    </div>
  );
}

export default App;
