// StartMenu.tsx
import React, { useEffect, useRef } from 'react';

interface StartMenuProps {
  onLaunch: (title: string) => void;
  onShutdown: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onLaunch, onShutdown }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        // close logic in parent
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const programsSub = [
  { label: 'Portfolio', key: 'portfolio' },
  { label: 'Credit',    key: 'credit'    },
];

  const stripeLetters = ['M', 'i', 's', 'h', 'O', 'S'];

  return (
    <div className="start-menu" ref={menuRef}>
      {/* stripe with mixed-color text */}
      <div className="start-menu__stripe">
        <span
          className="start-menu__stripe-text"
          style={{ fontFamily: 'Millennium', fontWeight: 'bold', letterSpacing: '0.25em', }}
        >
          <span style={{ color: 'black' }}>MishOS</span>
          <span style={{ color: 'white' }}>95</span>
        </span>
      </div>

      {/* Single-column menu */}
      <div className="start-menu__menu">
        {/* Programs with hover submenu */}
        <div className="start-menu__item has-submenu">
          <img
            className="start-menu__icon"
            src="/img/startmenu/Programs.png"
            alt="Programs"
          />
          <span className="start-menu__item-text">Programs</span>
          <div className="start-menu__submenu">
            {programsSub.map(({ label, key }) => (
              <div key={key} className="start-menu__submenu-item" onClick={() => onLaunch(key)}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="start-menu__item" onClick={() => onLaunch('resume')}>
          <img
            className="start-menu__icon"
            src="/img/desktop/TextFile.png"
            alt="Resume"
          />
          <span className="start-menu__item-text">Resume</span>
        </div>

        {/* Spacer for gap */}
        {/* Big gap to fit 5 items */}
        <div style={{ height: '130px' }} />


        {/* Separator line */}
        <div className="start-menu__separator" />

        {/* Shut Down */}
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
