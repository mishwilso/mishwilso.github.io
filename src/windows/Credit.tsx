import React, { useState, useEffect, useRef } from 'react';

const ASCII_MISHOS = `
+=================================================================+
| _____ ______   ___  ________  ___  ___  ________  ________      |
||\\   _ \\  _   \\|\\  \\|\\   ____\\|\\  \\|\\  \\|\\   __  \\|\\   ____\\     |
|\\ \\  \\\\\\__\\ \\  \\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\ \\  \\|\\  \\ \\  \\___|_    |
| \\ \\  \\\\|__| \\  \\ \\  \\ \\_____  \\ \\   __  \\ \\  \\\\\\  \\ \\_____  \\   |
|  \\ \\  \\    \\ \\  \\ \\  \\|____|\\  \\ \\  \\ \\  \\ \\  \\\\\\  \\|____|\\  \\  |
|   \\ \\__\\    \\ \\__\\ \\__\\____\\_\\  \\ \\__\\ \\__\\ \\_______\\____\\_\\  \\ |
|    \\|__|     \\|__|\\|__|\\_________\\__|\\|__|\\|_______|\\__________\\|
|                       \\|_________|                  \\|_________||
|                                                                 |
+=================================================================+`;

const INITIAL_LINES = [
  '(c) Mish Corporation. All rights reserved.',
  ASCII_MISHOS,
  'Hello! Welcome to MishOS!',
  'Just as a disclaimer, this website is still a Work-In-Progress, so not all things are complete',
  'but feel free to look around a click things, just as a warning something might break? ',
  'This terminal acts as an info screen for my website. :) Like any good terminal:',
  'Type /help for commands.',
  '',
];

const HELP_LINES = [
  'Available commands:',
  '  /help    – show this list',
  '  /credits – show this credits screen',
  '  /contact – display contact info',
  '  /inspo   – what inspired this site',
  '  /clear   – clear the screen',
];

const Credit: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // initial banner
  useEffect(() => {
    setLines(INITIAL_LINES);
    inputRef.current?.focus();
  }, []);

  // auto-scroll on new lines
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let newLines = [...lines, `> ${cmd}`];

    switch (c) {
      case '/help':
        newLines = newLines.concat(HELP_LINES);
        break;
      case '/credits':
        newLines.push('(c) Mish Corporation. All rights reserved.');
        newLines.push('Created by Mish Wilson');
        break;
      case '/contact':
        newLines.push('Email: mishwilsonk@gmail.com');
        break;
      case '/inspo':
        newLines.push('Inspired by Henry Heffernan and the Window93 project.');
        break;
      case '/clear':
        newLines = [];
        break;
      default:
        newLines.push(`Unknown command: ${cmd}`);
    }
    newLines.push('');
    setLines(newLines);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div style={styles.terminal}>
      <div style={styles.output} ref={outputRef}>
        {lines.map((line, i) => {
          const isAscii = line === ASCII_MISHOS;
          return (
            <pre
              key={i}
              style={ isAscii ? styles.asciiLine : styles.line }
            >
              {line}
            </pre>
          );
        })}
      </div>
      <form onSubmit={onSubmit} style={styles.promptForm}>
        <span style={styles.prompt}>C:\Users\Stranger&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  terminal: {
    fontFamily: 'Millennium, monospace',
    fontSize: '15px',
    color: 'white',
    backgroundColor: 'black',
    padding: '16px',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  output: {
    flex: 1,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
  },
  line: {
    margin: 0,
    lineHeight: 0.5,             // tighter spacing
    color: 'white',
    backgroundColor: 'black',
    boxShadow: 'none',
    fontFamily: 'Millennium, monospace',
  },
  asciiLine: {
   margin: 0,
    lineHeight: 1.2,
    color: 'white',
    backgroundColor: 'black',
    boxShadow: 'none',
    fontFamily: 'Courier New, monospace',  // only ASCII art uses Courier New
  },
  promptForm: {
    display: 'flex',
    marginTop: '4px',
  },
  prompt: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    marginRight: '0.5ch',
  },
  input: {
    background: 'black',
    color: 'white',
    fontFamily: 'Millennium, monospace',
    fontSize: '15px',
    border: 'none',
    outline: 'none',
    width: '60%',
  },
};

export default Credit;
