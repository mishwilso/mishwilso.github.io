import '../../assets/css/98.css'
import '../../assets/css/index.css';
import '../../assets/css/prog.css';

import React, { useRef, useState } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  launchId: string;
  onLaunch: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, launchId, onLaunch }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

    React.useEffect(() => {
    const saved = localStorage.getItem(`desktop-icon-${label}`);
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);
  
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.stopPropagation();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    setPosition({ x: newX, y: newY });
  };


  const onMouseUp = () => {
    setDragging(false);
    localStorage.setItem(`desktop-icon-${label}`, JSON.stringify(position));

  };

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={iconRef}
      className="desktop-icon"
      onDoubleClick={() => onLaunch(launchId)}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'pointer',
      }}
    >
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
};

export default DesktopIcon;
