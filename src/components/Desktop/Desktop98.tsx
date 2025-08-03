// src/components/Desktop/Desktop98.tsx
// main desktop logic!! handles launching apps, z-index layering, start menu, etc.
// uses APPLICATIONS config + window state. 

// imports and setup
import React, { useEffect, useRef, useState } from 'react';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window98 from './Window98';
import { DesktopProvider } from './DesktopContext';
import { APPLICATIONS } from '../../utils/appRegistry';
import { AppKey } from '../../utils/appRegistry';
import { soundManager } from '../../utils/SoundManager';

// base styles (kinda a lot lol- I should rework those)
import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';

// single source of truth for window data
interface WindowData {
  id: string;
  title: string;
  component: React.ReactNode;
  minimized: boolean;
  zIndex: number;
  icon?: string;
  maximized: boolean;
  width: number;
  height: number;
  bottomLeftText: string;
}

const Desktop98: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1); // starts at 1 so windows can layer
  const [showStartMenu, setShowStartMenu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // init audio context for soundManager to work (ios browsers need user gesture first)
  useEffect(() => {
    if (!window.AudioContext) return;
    const audioCtx = new AudioContext();
    const gain = audioCtx.createGain();
    gain.gain.value = 1;
    gain.connect(audioCtx.destination);
  }, []);

  // click = sound
  useEffect(() => {
    const onMouseDown = () => soundManager.playClick();
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  // canvas is full screen but offset for taskbar
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpi = window.devicePixelRatio || 1;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight - 32}px`;
        canvas.width = window.innerWidth * dpi;
        canvas.height = (window.innerHeight - 32) * dpi;
      }
    };
    resizeCanvas(); // run once
    window.addEventListener('resize', resizeCanvas); // rerun on window size change
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // launch a new window for the given app!!
  const launchWindow = (appKey: AppKey) => {
    const app = APPLICATIONS[appKey];
    if (!app) return; // fail silently :(

    const id = crypto.randomUUID(); // every window needs a unique id
    const width = Math.round(app.widthRatio * window.innerWidth);
    const height = Math.round(app.heightRatio * window.innerHeight);

    setWindows(prev => [
      ...prev,
      {
        id,
        title: app.name,
        component: React.createElement(app.component, {
          onClose: () => closeWindow(id),
          onMinimize: () => minimizeWindow(id),
          onClick: () => focusWindow(id),
          launchWindow // passed to child so it can launch siblings
        }),
        minimized: false,
        zIndex: zIndexCounter,
        icon: app.shortcutIcon,
        maximized: false,
        width,
        height,
        bottomLeftText: app.bottomLeftText,
      },
    ]);

    setZIndexCounter(prev => prev + 1); // make sure next window is higher
  };

  // window interactions (toggle, close, focus, etc)
  const minimizeWindow = (id: string) =>
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));

  const closeWindow = (id: string) =>
    setWindows(prev => prev.filter(w => w.id !== id));

  const toggleMinimize = (id: string) =>
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));

  const toggleMaximize = (id: string) =>
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));

  const focusWindow = (id: string) => {
    setZIndexCounter(prevZ => {
      setWindows(prevWins => prevWins.map(w => w.id === id ? { ...w, zIndex: prevZ } : w));
      return prevZ + 1;
    });
  };

  // minimize all if anything's open; restore if already minimized
  const onShowDesktop = () => {
    const anyOpen = windows.some(w => !w.minimized);
    setWindows(prev => prev.map(w => ({ ...w, minimized: anyOpen })));
  };

  // boot up credit window on load (could do splash screen here too)
  useEffect(() => {
    launchWindow('credit');
  }, []);

  return (
    <DesktopProvider launchWindow={launchWindow}>
      <div className="desktop-container">
        <canvas id="selections" ref={canvasRef} />

        <div className="desktop">
          {Object.entries(APPLICATIONS).map(([key, app], index) => (
            <DesktopIcon
              key={key}
              icon={app.shortcutIcon}
              label={app.name}
              launchId={key}
              onLaunch={launchWindow}
              x={32}
              y={32 + index * 100}
            />
          ))}
        </div>

        <div className="window-host">
          {[...windows]
            .filter(w => !w.minimized)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(win => (
              <Window98
                key={win.id}
                id={win.id}
                title={win.title}
                zIndex={win.zIndex}
                width={win.width}
                height={win.height}
                maximized={win.maximized}
                icon={win.icon}
                bottomLeftText={win.bottomLeftText}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => toggleMaximize(win.id)}
                onClose={() => closeWindow(win.id)}
                onClick={() => focusWindow(win.id)}
              >
                {win.component}
              </Window98>
            ))}
        </div>

        <Taskbar
          windows={windows}
          onFocusWindow={focusWindow}
          onToggleMinimize={toggleMinimize}
          onLaunch={launchWindow}
          onShowDesktop={onShowDesktop}
          onStartClick={() => setShowStartMenu(prev => !prev)}
        />

        {showStartMenu && (
          <StartMenu
            onLaunch={launchWindow}
            onShutdown={() => {
              // TODO: add shutdown modal or animation? Will do, if time permits :)
            }}
          />
        )}
      </div>
    </DesktopProvider>
  );
};

export default Desktop98;
