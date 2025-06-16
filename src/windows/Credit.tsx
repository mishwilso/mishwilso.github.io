import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowProps } from '../components/Desktop/Window98';


const pageData = [
  {
    title: 'Welcome',
    content: (
      <>
        <h2>Welcome!</h2>
        <p>
          This is my personal site — a nostalgic portfolio inspired by Windows 98.
          It's designed to feel like an old OS, but functions like a modern interactive resume.
        </p>
      </>
    ),
  },
  {
    title: 'Why I Made This',
    content: (
      <>
        <h2>Why I Made This</h2>
        <p>
          I wanted something fun and memorable. Everyone has a Squarespace or Notion. I wanted a Windows 98 interface with draggable windows and weird humor.
        </p>
      </>
    ),
  },
  {
    title: 'My Inspo',
    content: (
      <>
        <h2>My Inspiration</h2>
        <ul>
          <li>Henry Heffernan’s portfolio</li>
          <li>Windows 95/98 and MS Paint</li>
          <li>Early CD-ROM games</li>
          <li>Weird web nostalgia</li>
        </ul>
      </>
    ),
  },
  {
    title: 'My Info',
    content: (
      <>
        <h2>Contact Me</h2>
        <ul>
          <li><a href="https://github.com/pkage" target="_blank">GitHub</a></li>
          <li><a href="https://linkedin.com/in/patrick-kage" target="_blank">LinkedIn</a></li>
          <li><a href="mailto:patrick@ka.ge">Email</a></li>
        </ul>
      </>
    ),
  },
  {
    title: 'Credits & Resources',
    content: (
      <>
        <h2>Credits</h2>
        <ul>
          <li>98.css for styling inspiration</li>
          <li>Framer Motion for animations</li>
          <li>Old school icon packs</li>
          <li>Henry’s site for UI inspiration</li>
        </ul>
      </>
    ),
  },
];

type CreditProps = Pick<WindowProps, 'onClose' | 'onMinimize' | 'onClick'>;

const Credit: React.FC<CreditProps> = ({ onClose, onMinimize, onClick }) => {
  const [page, setPage] = useState(0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)' }}>
      <div style={{ flex: 1, padding: '10px', overflow: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {pageData[page].content}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px',
        borderTop: '1px solid #808080',
        backgroundColor: '#C0C0C0',
        boxShadow: 'inset 1px 1px white, inset -1px -1px #808080'
      }}>
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >◀ Back</button>
        <div style={{ alignSelf: 'center', fontSize: '12px' }}>{pageData[page].title}</div>
        <button
          onClick={() => setPage(p => Math.min(pageData.length - 1, p + 1))}
          disabled={page === pageData.length - 1}
        >Next ▶</button>
      </div>
    </div>
  );
};

export default Credit;
