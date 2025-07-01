import React, { useEffect, useState, useRef } from 'react';
import '../../assets/css/base.css';
import '../../assets/css/components.css';
import '../../assets/css/layout.css';
import '../../assets/css/themes.css';
import '../../assets/css/responsive.css';
import { soundManager } from '../../utils/SoundManager';

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
  onShowDesktop: () => void;
  onStartClick: () => void;
}

function generateCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(7).fill(null);
  let dayCounter = 1;

  // fill first week
  for (let i = first; i < 7; i++) {
    week[i] = dayCounter++;
  }
  weeks.push(week);

  // fill remaining weeks
  while (dayCounter <= daysInMonth) {
    week = Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }
  return weeks;
}

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onFocusWindow,
  onToggleMinimize,
  onLaunch,
  onShowDesktop,
  onStartClick,
}) => {
  const [time, setTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume]       = useState(0.01);    // 0.0 – 1.0
  const [muted, setMuted]         = useState(false);
  const volRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (showCalendar && !calRef.current?.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [showCalendar]);

  // calendar state
  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear]   = useState(now.getFullYear());
  const weeks = generateCalendar(calYear, calMonth);


  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (showVolume && !volRef.current?.contains(e.target as Node)) {
        setShowVolume(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [showVolume]);


  useEffect(() => {
    soundManager.setVolume(volume);
    soundManager.setMuted(muted);
  }, [volume, muted]);


  return (
    <div className="task-bar">
      {/* Start button */}
      <button id="start-btn" onClick={onStartClick}>
        <img src="/img/taskbar/Start.png" alt="Start" width="100%" height="100%" />
      </button>

      <div className="task-bar__divider" />

      {/* Quick Launch icons */}
      <img
        src="/img/taskbar/ShowDesktop.png"
        alt="Show Desktop"
        title="Show Desktop"
        className="task-bar__quick"
        onClick={onShowDesktop}
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
                style={{ marginRight: 4 }}
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
          alt="Calendar"
          title="Calendar"
          className="task-bar__tray__icon"
          onClick={() => setShowCalendar((v) => !v)}
        />
        <img
          src="/img/taskbar/Volume.png"
          alt="Volume"
          title="Volume"
          className="task-bar__tray__icon"
          onClick={() => setShowVolume((v) => !v)}
        />

        {/* Clock */}
        <span id="time">{time}</span>

        {/* Calender */}
        {showCalendar && (
          <div
            ref={calRef}
            style={{
              position: 'absolute',
              bottom: '100%',      // sits on top of taskbar
              right: 0,
              width: 200,
              background: '#C0C0C0',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #FFF inset, -2px -2px 0 #808080 inset',
              fontFamily: 'Millennium',
              fontSize: '12px',
              padding: '4px',
              zIndex: 1000
            }}
          >
            {/* Header with icon + title */}
            <div style={{
              background: 'linear-gradient(to right, rgb(55, 97, 157), rgb(149, 187, 240))',
              color: '#fff',
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              
            }}>
              <img src="/img/taskbar/TaskScheduler.png" alt="Date" width={16} height={16}/>
              <span style={{fontSize: '14px'}}>Date</span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              <select
                value={calMonth}
                onChange={e => setCalMonth(Number(e.target.value))}
                style={{ width: '90px',        // <-- shrink this down
                fontSize: '12px',
                fontFamily: 'Millennium' 
                }   }
              >
                {monthNames.map((m,i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>
              <input
                type="number"
                value={calYear}
                onChange={e => setCalYear(Number(e.target.value))}
                style={{ width: '90px', textAlign:'center' }}
              />
            </div>

            {/* Day-of-week header */}
            <div style={{
              display:'grid',
              gridTemplateColumns: 'repeat(7,1fr)',
              textAlign:'center',
              marginTop:'4px',
              color:'#555'
            }}>
              {['S','M','T','W','T','F','S'].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Dates grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns: 'repeat(7,1fr)',
              textAlign:'center',
              rowGap:'2px'
            }}>
              {weeks.flat().map((day, idx) => {
                const isToday =
                  day === now.getDate() &&
                  calMonth === now.getMonth() &&
                  calYear === now.getFullYear();
                return (
                  <div
                    key={idx}
                    style={{
                      padding:'2px',
                      background: isToday ? 'navy' : 'transparent',
                      color:    isToday ? '#fff'  : '#000'
                    }}
                  >
                    {day ?? ''}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* End of Calender */}

        {/* Volume panel */}
        {showVolume && (
          <div
            ref={volRef}
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '55px',       // adjust to sit above the icon
              width: '60px',
              background: '#C0C0C0',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #FFF inset, -2px -2px 0 #808080 inset',
              padding: '8px',
              fontFamily: 'MS Sans Serif',
              fontSize: '12px',
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: '55px', textAlign: 'center' }}>
              Volume
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              // height: '100px',      // height for the track length
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              // padding: '4px 2px',
              // boxSizing: 'border-box'
            }}>
              {/* Vertical slider */}
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setMuted(false);
                  setVolume(parseFloat(e.target.value));
                }}
                style={{
                  width: '100px',            // horizontal length
                  transform: 'rotate(-90deg)', // rotate into vertical
                  transformOrigin: '50% 50%',
                  margin: '0 0 12px',        // adjust spacing after rotation
                }}
              />
              {/* Mute checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginTop: '45px' }}>
                <input
                  type="checkbox"
                  checked={muted}
                  onChange={(e) => setMuted(e.target.checked)}
                />
                Mute
              </label>
            </div>
          </div>
        )}
        {/* End of Volumn */}


      </div>
    </div>
  );
};

export default Taskbar;
