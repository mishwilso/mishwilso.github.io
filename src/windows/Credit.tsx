import React, { useState, useRef, useEffect } from 'react';

const commands = {
  help: [
    "For more information on a specific command, type HELP command-name",
    "",
    "ASSOC      Displays or modifies file extension associations.",
    "ATTRIB     Displays or changes file attributes.",
    "BREAK      Sets or clears extended CTRL+C checking.",
    "BCDEDIT    Sets properties in boot database to control boot loading.",
    "CACLS      Displays or modifies access control lists (ACLs) of files.",
    "CALL       Calls one batch program from another.",
    "CD         Displays the name of or changes the current directory.",
    "CHCP       Displays or sets the active code page number.",
    "",
    "/welcome   Show the introduction message",
    "/why       Why I made this",
    "/inspo     Inspirations",
    "/contact   Contact info",
    "/credits   Credits & resources",
    "/secret    ???",
  ],
  welcome: [
    "Welcome to Mish's Desktop!",
    "",
    "This is a website inspired by old Windows desktops, combining a love for nostalgia and coding.",
    "This terminal acts as an info screen. Feel free to type in the following commands to learn things:",
  ],
  why: [
    "Why I Made This",
    "",
    "I wanted something fun and memorable. Everyone has a Squarespace or Notion.",
    "I wanted a Windows 98 interface with draggable windows and weird humor.",
  ],
  inspo: [
    "My Inspiration",
    "",
    "- Henry Heffernan’s portfolio",
    "- Windows 95/98 and MS Paint",
    "- Early CD-ROM games",
    "- Weird web nostalgia",
  ],
  contact: [
    "Contact Me",
    "",
    "- GitHub: https://github.com/pkage",
    "- LinkedIn: https://linkedin.com/in/patrick-kage",
    "- Email: patrick@ka.ge",
  ],
  credits: [
    "Credits",
    "",
    "- 98.css for styling inspiration",
    "- Framer Motion for animations",
    "- Old school icon packs",
    "- Henry’s site for UI inspiration",
  ],
  secret: [
    "ACCESSING HIDDEN FILE...",
    "",
    "Welcome, elite user.",
    "You've found the hidden terminal easter egg!",
    "Here lies the forbidden lore of this portfolio.",
    "[REDACTED]",
  ],
};

const Credit = () => {
  const [history, setHistory] = useState<string[][]>([
    [
      "Welcome to Mish's Desktop!",
      "",
      "This is a website inspired by old Windows desktops, combining a love for nostalgia and coding.",
      "This terminal acts as an info screen. Feel free to type in the following commands to learn things:",
      "",
      "/help - List all available commands",
      "/welcome - Intro to the site",
      "/why - Why I made this",
      "/inspo - Inspirations",
      "/contact - Contact info",
      "/credits - Credits & resources",
      "/secret - ???",
    ],
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = () => {
    const cmd = input.trim().replace('/', '');
    const output = commands[cmd as keyof typeof commands] || [`'${input}' is not recognized as a command.`];
    setHistory((prev) => [...prev, [`C:\\Users\\Stranger> ${input}`, '', ...output]]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      style={{
        fontFamily: 'Millennium, monospace',
        fontSize: '15px',
        color: 'white',
        backgroundColor: 'black',
        padding: '16px',
        height: '100%',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.75',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        Microsoft Windows [Version 10.0.26100.4349]<br/>
        <br/>
        (c) Microsoft Corporation. All rights reserved.<br/>
        <br/>
      C:\Users\Stranger&gt; <span style={{ opacity: 0.6 }}>Type <b>/help</b> for available commands</span>
      </div>

      {history.map((block, i) => (
        <div key={i} style={{ marginBottom: '24px' }}>
          {block.map((line, j) => (
            <div key={j}>{line}</div>
          ))}
        </div>
      ))}

      <div>
        <span>C:\Users\Stranger&gt; </span>
        <input
          style={{
            background: 'black',
            color: 'white',
            fontFamily: 'Millennium, monospace',
            fontSize: '15px',
            border: 'none',
            outline: 'none',
            width: '60%',
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand();
          }}
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Credit;
