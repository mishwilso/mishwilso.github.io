// src/windows/EmailClientContent.tsx
import React, { useState } from 'react';

const EmailClientContent: React.FC = () => {
  const [from, setFrom]       = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody]       = useState('');
  const [status, setStatus]   = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const allFilled = from.trim() !== '' && subject.trim() !== '' && body.trim() !== '';

  const handleSend = async () => {
    if (!allFilled) return;

    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xkgbpzrb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          subject,
          message: body,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setFrom('');
        setSubject('');
        setBody('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{
          padding: '4px',
          background: '#ccc',
          display: 'flex',
          gap: '4px',
        }}
      >
        <button disabled style={buttonStyle}>New</button>
        <button disabled style={buttonStyle}>Reply</button>
        <button disabled style={buttonStyle}>Forward</button>
        <button
          onClick={handleSend}
          disabled={!allFilled || status === 'sending'}
          style={buttonStyle}
        >
          Send
        </button>
      </div>

      {/* Envelope fields */}
      <div style={{ padding:'8px', flexShrink:0, fontSize:'12px' }}>
        <FieldRow label="To:">
          <input value="mishwilsonk@gmail.com" disabled style={inputStyle} />
        </FieldRow>
        <FieldRow label="From:">
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </FieldRow>
        <FieldRow label="Subject:">
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={inputStyle}
            placeholder="Subject"
          />
        </FieldRow>
      </div>

      {/* Message body */}
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        style={textareaStyle}
        placeholder="Type your message here..."
      />

      {/* Status bar */}
      <div style={{
          padding: '2px 4px',
          background: '#eee',
          fontSize: '10px',
          textAlign: 'right'
        }}
      >
        {status === 'sending' && 'Sending...'}
        {status === 'sent'    && 'Message sent.'}
        {status === 'error'   && 'Error sending.'}
      </div>
    </div>
  );
};

// Shared inline styles
const buttonStyle: React.CSSProperties = {
  padding: '2px 6px',
  fontSize: '12px',
  fontFamily: 'Millennium',
  background: '#ddd',
  border: '2px outset #fff',
  borderRight: '2px inset #808080',
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '12px',
  fontFamily: 'Millennium',
  padding: '2px',
  border: '1px solid #000',
  background: '#fff',
};

const textareaStyle: React.CSSProperties = {
  flex: 1,
  margin: '4px',
  fontSize: '12px',
  fontFamily: 'Millennium',
  padding: '4px',
  border: '1px solid #000',
  background: '#fff',
};

const FieldRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display:'flex', alignItems:'center', margin:'2px 0' }}>
    <strong style={{ width: '60px', fontFamily: 'Millennium-Bold' }}>{label}</strong>
    {children}
  </div>
);

export default EmailClientContent;
