// src/components/Desktop/StartMenu.tsx
// ... this is the little start menu!! :]

import React, { useEffect, useRef } from 'react';

interface StartMenuProps {
  onLaunch: (title: string) => void;
  onShutdown: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onLaunch, onShutdown }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // kinda janky — detects clicks outside the start menu to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        // close logic lives in parent. maybe should move here??
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // fake "Programs" submenu
  const programsSub = [
    { label: 'Portfolio', key: 'portfolio' },
    { label: 'Credit', key: 'credit' },
  ];

  const stripeLetters = ['M', 'i', 's', 'h', 'O', 'S']; // unused for now??

  return (
    <div className="start-menu" ref={menuRef}>
      {/* the stripe with that weird mishOS branding :] */}
      <div className="start-menu__stripe">
        <span
          className="start-menu__stripe-text"
          style={{
            fontFamily: 'Millennium',
            fontWeight: 'bold',
            letterSpacing: '0.25em',
          }}
        >
          <span style={{ color: 'black' }}>MishOS</span>
          <span style={{ color: 'white' }}>95</span>
        </span>
      </div>

      {/* actual menu list */}
      <div className="start-menu__menu">
        {/* programs folder with hover submenu!! */}
        <div className="start-menu__item has-submenu">
          <img
            className="start-menu__icon"
            src="/img/startmenu/Programs.png"
            alt="Programs"
          />
          <span className="start-menu__item-text">Programs</span>
          <div className="start-menu__submenu">
            {programsSub.map(({ label, key }) => (
              <div
                key={key}
                className="start-menu__submenu-item"
                onClick={() => onLaunch(key)}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* resume shortcut just vibes here */}
        <div className="start-menu__item" onClick={() => onLaunch('resume')}>
          <img
            className="start-menu__icon"
            src="/img/desktop/TextFile.png"
            alt="Resume"
          />
          <span className="start-menu__item-text">Resume</span>
        </div>

        {/* big awkward spacer. not elegant but it works :| */}
        <div style={{ height: '130px' }} />

        {/* separator, so it looks official */}
        <div className="start-menu__separator" />

        {/* the dramatic shutdown option (doesn't do anything yet lol) */}
        <div className="start-menu__item" onClick={onShutdown}>
          <img
            className="start-menu__icon"
            src="/img/startmenu/Shutdown.png"
            alt="Shut Down"
          />
          <span className="start-menu__item-text">Shut Down…</span>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
