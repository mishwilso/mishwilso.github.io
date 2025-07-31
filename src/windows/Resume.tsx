import React from 'react';
import type { WindowProps } from '../components/desktop/Window98';

type ResumeProps = Pick<WindowProps, 'onClose' | 'onMinimize' | 'onClick'>;

const Resume: React.FC<ResumeProps> = ({ onClick }) => {
  return (
    <div
      onMouseDown={onClick}
      style={{
        padding: 12,
        overflow: 'auto',
        height: '100%',
        boxSizing: 'border-box',
        fontFamily: 'Millennium',
        backgroundColor: '#f8f8f8',
      }}
    >
      {/* PDF Viewer */}
      <iframe
        src="/resume/Resume_Robo.pdf"
        title="Resume PDF"
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default Resume;
