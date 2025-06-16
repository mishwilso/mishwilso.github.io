import React, { useState, useEffect, useRef } from 'react';

import '../../assets/css/98.css'
import '../../assets/css/index.css';
import '../../assets/css/prog.css';

interface StartMenuProps {
  onLaunch: (title: string) => void; // Optional future support
}

const StartMenu: React.FC<StartMenuProps> = ({ onLaunch }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* <button
        className="start-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        Start
      </button> */}
      {open && (
  <div className="start-menu__container">
    <div className="start-menu">
      <div className="start-menu__stripe">
        <span className="start-menu__stripe-text">
          MISH&nbsp;<b>WILSON</b>
        </span>
      </div>
      <div className="start-menu__menu">
        <div className="start-menu__item" onClick={() => onLaunch('resume')}>
          <img className="start-menu__icon" src="/img/startmenu/Resume.png" alt="Resume" />
          <span className="start-menu__item-text">Resume</span>
        </div>
        {/* Add more items here */}
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default StartMenu;
