import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import AboutWindow from './windows/Credit';

export default function MonitorScreen() {
  const iframeRef = useRef();
  const rootRef = useRef(null); // Save root to allow re-render

  useEffect(() => {
    const iframe = iframeRef.current;

    const mountComponent = (componentName) => {
      const container = iframe.contentDocument?.querySelector('#react-host');
      if (container) {
        if (!rootRef.current) {
          rootRef.current = ReactDOM.createRoot(container);
        }
        if (componentName === 'AboutWindow') {
          rootRef.current.render(<AboutWindow />);
        }
      }
    };

    const onMessage = (event) => {
      if (event.data?.type === 'launch-react-component') {
        mountComponent(event.data.component);
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/legacy-site/index.html"
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Legacy OS"
    />
  );
}
