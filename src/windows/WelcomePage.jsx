// File: WelcomePage.jsx
import React from 'react';

export default function WelcomePage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Welcome!</h1>
      <p>This is a React-powered welcome screen embedded in a Windows-style window.</p>
      <p>Click the buttons below to explore more apps.</p>
      <div style={{ marginTop: 16 }}>
        <button data-launch="react-about">Launch About</button>
        <button data-launch="resume">Launch Resume</button>
        <button data-launch="portfolio">Launch Portfolio</button>
      </div>
    </div>
  );
}