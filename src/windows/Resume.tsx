import React, { useState } from 'react';
import type { WindowProps } from '../components/Desktop/Window98';


type AboutProps = Pick<WindowProps, 'onClose' | 'onMinimize' | 'onClick'>;

const About: React.FC<AboutProps> = ({ onClose, onMinimize, onClick }) => {

  return (
    <p>This is the Resume window!</p>
  );
};

export default About;
