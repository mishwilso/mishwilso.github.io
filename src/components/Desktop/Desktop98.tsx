import React, { useEffect, useRef, useState } from 'react';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Credit from '../../windows/Credit';
import Resume from '../../windows/Resume';
import PortfolioExplorer from '../../windows/PortolioExplorer';
import Window98 from './Window98';
import { DesktopProvider } from './DesktopContext';
import InternetExplorerContent from '../../windows/InternetExplorer';
import EmailClientContent from '../../windows/EmailClientContent';
import { soundManager } from '../../utils/SoundManager';

import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';

let audioCtx: AudioContext;
let masterGain: GainNode;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);
  }
}

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

const APPLICATIONS = {
  portfolio: {
    key: 'portfolio',
    name: 'Portfolio',
    shortcutIcon: '/img/desktop/MyComputer.png',
    component: PortfolioExplorer,
    widthRatio: 0.55,
    heightRatio: 0.85,
    bottomLeftText: 'Projects & Demos',
  },
  credit: {
    key: 'credit',
    name: 'Credit',
    shortcutIcon: '/img/desktop/BatchFile.png',
    component: Credit,
    widthRatio: 0.39,
    heightRatio: 0.6,
    bottomLeftText: 'Welcome to MishOS',
  },
  resume: {
    key: 'resume',
    name: 'Resume',
    shortcutIcon: '/img/desktop/TextFile.png',
    component: Resume,
    widthRatio: 0.3,
    heightRatio: 0.4,
    bottomLeftText: 'My Resume',
  },
  ie: {
  key: 'ie',
  name: 'Internet Explorer',
  shortcutIcon: '/img/taskbar/IESmall.png',
  component: InternetExplorerContent,   // you’ll create this
  widthRatio: 0.7,
  heightRatio: 0.7,
  bottomLeftText: 'Internet Explorer',
},
email: {
    key: 'email',
    name: 'Mail',
    shortcutIcon: '/img/taskbar/OutlookExpress.png',
    component: EmailClientContent,
    widthRatio: 0.6,
    heightRatio: 0.6,
    bottomLeftText: 'Mish Wilson Mail',
  },

};

const Desktop98: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Audio Stuff
  useEffect(() => {
    initAudio();
  }, [])

  // useEffect(() => {
  //   const handleFirstClick = () => soundManager.resumeContext();
  //   document.addEventListener('click', handleFirstClick);
  //   return () => {
  //     document.removeEventListener('click', handleFirstClick);
  //   };
  // }, []);

  useEffect(() => {
    const onMouseDown = () => soundManager.playClick();

    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);

    };
  }, []);

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

  


// Desktop98.tsx
const launchWindow = (appKey: string) => {
  const app = APPLICATIONS[appKey];
  if (!app) return;

  const id = crypto.randomUUID();
  const width = Math.round(app.widthRatio * window.innerWidth);
  const height = Math.round(app.heightRatio * window.innerHeight);

  // Reserve and assign the z-index in one go
  // 1) Add the window
  setWindows(prevWins => [
    ...prevWins,
    {
      id,
      title: app.name,
      component: React.createElement(app.component, {           
          onClose: () => closeWindow(id),
          onMinimize: () => minimizeWindow(id),
          onClick: () => focusWindow(id),
          launchWindow }),
      minimized: false,
      zIndex: zIndexCounter,        // use the current counter
      icon: app.shortcutIcon,
      maximized: false,
      width,
      height,
      bottomLeftText: app.bottomLeftText,
    },
  ]);

  // 2) Bump the counter
  setZIndexCounter(prev => prev + 1);
};




  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
  setZIndexCounter((prevZ) => {
    const newZ = prevZ;   // this is the next, unused z-index

    // Immediately update windows using that newZ
    setWindows((prevWins) =>
      prevWins.map((w) =>
        w.id === id
          ? { ...w, zIndex: newZ }
          : w
      )
    );

    // Return prevZ + 1 so the next call reserves a higher z-index
    return prevZ + 1;
  });
};

  const toggleMinimize = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  };

  const toggleMaximize = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  };

  
  const onShowDesktop = () => {
    const anyOpen = windows.some(w => !w.minimized);
    setWindows(prev => 
      prev.map(w => ({...w, minimized: anyOpen ? true: false}))

    );
  };



  // ─── auto-open Credits window on mount ───────────────────────
  useEffect(() => {
    launchWindow('credit');
  }, []);  // only runs once, when Desktop98 mounts


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
              y={32 + index * 150}
            />
          ))}
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
          onShowDesktop={onShowDesktop}
          onStartClick={() => setShowStartMenu((prev) => !prev)}
        />
        {showStartMenu && (
          <StartMenu
            onLaunch={launchWindow}
            onShutdown={() => {
              // do shutdown
            }}
          />
        )}
      </div>
    </DesktopProvider>
  );
};

export default Desktop98;
