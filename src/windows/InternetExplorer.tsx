import React, { useState } from 'react';

const InternetExplorerContent: React.FC = () => {
  // Start with your target URL
  const [url, setUrl] = useState('https://pierrepapierciseaux.net/.skynet/');
  const [navUrl, setNavUrl] = useState(url);
  const [frameError, setFrameError] = useState(false);

  const go = () => {
    setFrameError(false);
    setUrl(navUrl);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          background: '#ddd',
          gap: '4px',
        }}
      >
        <input
          style={{ flex: 1 }}
          value={navUrl}
          onChange={e => setNavUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && go()}
        />
        <button onClick={go}>Go</button>
      </div>

      {/* Frame or error message */}
      {frameError ? (
        <div style={{ padding: '1rem', color: 'red' }}>
          Unable to embed that site. It probably disallows framing.
        </div>
      ) : (
        <iframe
          src={url}
          style={{ flex: 1, border: 0 }}
          title="Internet Explorer"
          onError={() => setFrameError(true)}
        />
      )}
    </div>
  );
};

export default InternetExplorerContent;
