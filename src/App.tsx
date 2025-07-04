import { useState } from 'react';
import InitialSetup from './InitialSetup';
import NoiseOverlay from './NoiseOverlay';
import { Canvas } from '@react-three/fiber';
import React, { useEffect } from 'react';
import $ from 'jquery';


import Desktop98 from './components/Desktop/Desktop98';

function App() {
  const [enteredDesktop, setEnteredDesktop] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [inDesktopMode, setInDesktopMode] = useState(true); // when false, show InitialSetup

  const handleShutdown = () => {
    setInDesktopMode(false);
    setShowStartMenu(false);
  };

  return (
    <>
      {!enteredDesktop ? (
        <InitialSetup onEnterDesktop={() => setEnteredDesktop(true)} />
      ) : (
        <Desktop98 /> // ← this loads your Windows 98 React UI
      )}
    </>
  );
}


export default App;
