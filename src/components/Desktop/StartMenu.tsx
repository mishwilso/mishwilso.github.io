import React, { useState, useEffect, useRef } from 'react';

import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';

interface StartMenuProps {
  onLaunch: (title: string) => void; // Optional future support
  onShutdown: () => void ;
}

const StartMenu: React.FC<StartMenuProps> = ({ onLaunch, onShutdown }) => {
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
              <div className="start-menu__item" onClick={onShutdown}>
                <span className="start-menu__item-text">Shut Down</span>
              </div>
            </div>
          </div>
    </>
  );
};

export default StartMenu;
