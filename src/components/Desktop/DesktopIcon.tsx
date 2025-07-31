// src/components/Desktop/DesktopIcon.tsx
// renders one icon on the desktop. draggable. double-clickable. classic!!

import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';

import React, { useRef, useState } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  launchId: string;
  onLaunch: (id: string) => void;
  x: number;
  y: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  launchId,
  x,
  y,
  onLaunch,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // someday: maybe persist icon position in localStorage :)
  // React.useEffect(() => {
  //   const saved = localStorage.getItem(`desktop-icon-${label}`);
  //   if (saved) {
  //     setPosition(JSON.parse(saved));
  //   }
  // }, []);

  // when click starts, remember where you clicked
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.stopPropagation(); // otherwise stuff behind might get clicked too
  };

  // drag logic — updates icon position as mouse moves
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    setPosition({ x: newX, y: newY });
  };

  // once mouse is up, stop dragging
  const onMouseUp = () => {
    setDragging(false);
    // could save final position here? feels like overkill for now :|
    // localStorage.setItem(`desktop-icon-${label}`, JSON.stringify(position));
  };

  // wire up drag events globally while dragging
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
      onDoubleClick={() => onLaunch(launchId)} // fire up the app!!
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
