import React, { useEffect, useState } from 'react';
import '../../assets/css/98.css'
import '../../assets/css/index.css';
import '../../assets/css/prog.css';

interface TaskbarProps {
  windows: {
    id: string;
    title: string;
    icon?: string;
    minimized?: boolean;
  }[];
  onFocusWindow: (id: string) => void;
  onToggleMinimize: (id: string) => void;
  onLaunch: (launchId: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onFocusWindow,
  onToggleMinimize,
  onLaunch,
}) => {
  const [time, setTime] = useState('');

  // Update time every second
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="task-bar">
      {/* Start button */}
      <button id="start-btn" onClick={() => onLaunch('start')}>
        <img src="/img/taskbar/Start.png" alt="Start" />
      </button>

      <div className="task-bar__divider" />

      {/* Quick Launch icons */}
      <img
        src="/img/taskbar/ShowDesktop.png"
        alt="Show Desktop"
        title="Show Desktop"
        className="task-bar__quick"
        onClick={() => onLaunch('desktop')}
      />
      <img
        src="/img/taskbar/IESmall.png"
        alt="Internet Explorer"
        title="Launch IE"
        className="task-bar__quick"
        onClick={() => onLaunch('ie')}
      />
      <img
        src="/img/taskbar/OutlookExpress.png"
        alt="Outlook"
        title="Launch Outlook"
        className="task-bar__quick"
        onClick={() => onLaunch('email')}
      />

      <div className="task-bar__divider" />

      {/* Taskbar window buttons */}
      <div className="task-bar__main">
        {windows.map((win) => (
          <div
            key={win.id}
            className={`task-bar__launch ${!win.minimized ? 'task-bar__launch--active' : ''}`}
            onClick={() => onToggleMinimize(win.id)}
            title={win.title}
          >
            {win.icon && (
              <img
                src={win.icon}
                alt=""
                style={{ width: 16, height: 16, marginRight: 4 }}
              />
            )}
            {win.title}
          </div>
        ))}
      </div>

      <div className="task-bar__divider" />

      {/* Tray + clock */}
      <div className="task-bar__tray">
        <img
          src="/img/taskbar/TaskScheduler.png"
          alt="Task Scheduler"
          title="Task Scheduler"
          className="task-bar__tray__icon"
        />
        <img
          src="/img/taskbar/Volume.png"
          alt="Volume"
          title="Volume"
          className="task-bar__tray__icon"
        />
        <span id="time">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
