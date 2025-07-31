import React, { useState, useRef, useEffect } from 'react';

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}  

const MusicControlPanel: React.FC<Props> = ({ audioRef, darkMode, setDarkMode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      right: 20,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(6px)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '10px',
      fontSize: '14px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '220px'
    }}>
      <div><strong>🎵 Background Audio</strong></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>On/Off:</span>
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? '🔇 Off' : '🔊 On'}
        </button>
      </div>

      <div>
        Volume:
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>


      <div><strong>🖌 Theme</strong></div>
        <button onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
    </div>
  );
};

export default MusicControlPanel;
