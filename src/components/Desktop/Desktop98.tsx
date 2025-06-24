import React, { useEffect, useRef, useState } from 'react';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Credit from '../../windows/Credit';
import Resume from '../../windows/Resume';
import PortfolioExplorer from '../../windows/PortolioExplorer';
import Window98 from './Window98';

// import '../../assets/css/98.css';
// import '../../assets/css/index.css';
// import '../../assets/css/prog.css';

import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';

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
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

const scaleWidth = (px: number) => Math.round((px / BASE_WIDTH) * window.innerWidth);
const scaleHeight = (px: number) => Math.round((px / BASE_HEIGHT) * window.innerHeight);

const APPLICATIONS = {
  portfolio: {
    key: 'portfolio',
    name: 'Portfolio',
    shortcutIcon: '/img/desktop/MyComputer.png',
    component: PortfolioExplorer,
    get width() { return scaleWidth(900); },
    get height() { return scaleHeight(678); },
    bottomLeftText: 'Projects & Demos',
  },
  credit: {
    key: 'credit',
    name: 'Credit',
    shortcutIcon: '/img/desktop/BatchFile.png',
    component: Credit,
    get width() { return scaleWidth(750); },
    get height() { return scaleHeight(650); },
    bottomLeftText: 'Welcome to MishOS',
  },
  resume: {
    key: 'resume',
    name: 'Resume',
    shortcutIcon: '/img/desktop/TextFile.png',
    component: Resume,
    get width() { return scaleWidth(520); },
    get height() { return scaleHeight(430); },
    bottomLeftText: 'My Resume',
  },
};

const Desktop98: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);


  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpi = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight - 32;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * dpi;
        canvas.height = height * dpi;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const launchWindow = (appKey: string) => {
    const app = APPLICATIONS[appKey];
    if (!app) return;

    const id = crypto.randomUUID();

    // Recalculate sizes here using current window size
    const BASE_WIDTH = 1920;
    const BASE_HEIGHT = 1080;
    const scaleWidth = (px: number) => Math.round((px / BASE_WIDTH) * window.innerWidth);
    const scaleHeight = (px: number) => Math.round((px / BASE_HEIGHT) * window.innerHeight);

    setWindows((prev) => [
      ...prev,
      {
        id,
        title: app.name,
        component: React.createElement(app.component, {
          onClose: () => closeWindow(id),
          onMinimize: () => minimizeWindow(id),
          onClick: () => focusWindow(id),
        }),
        minimized: false,
        zIndex: zIndexCounter,
        icon: app.shortcutIcon,
        maximized: false,
        width: scaleWidth(app.width),
        height: scaleHeight(app.height),
        bottomLeftText: app.bottomLeftText,
      },
    ]);
    setZIndexCounter((z) => z + 1);
  };


  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: zIndexCounter } : w
      )
    );
    setZIndexCounter((z) => z + 1);
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
  };

  const toggleMaximize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    );
  };

  

  return (
    <div className="desktop-container">
      <canvas id="selections" ref={canvasRef} />

      <div className="desktop">
        {Object.entries(APPLICATIONS).map(([key, app], index) => {
          const spacing = 150; // vertical spacing between icons
          const topOffset = 32; // space below taskbar or padding
          const defaultX = 32;
          const defaultY = topOffset + index * spacing;

          return (
            <DesktopIcon
              key={key}
              icon={app.shortcutIcon}
              label={app.name}
              launchId={key}
              onLaunch={launchWindow}
              x={defaultX}
              y={defaultY}
            />
          );
        })}
      </div>

      <div className="window-host">
        {[...windows]
          .filter((w) => !w.minimized)
          .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
          .map((win) => (
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
        onStartClick={() => setShowStartMenu(prev => !prev)}
      />
      {showStartMenu && <StartMenu onLaunch={launchWindow} onShutdown={() => {/* do shutdown */}} />}

    </div>
  );
};

export default Desktop98;
