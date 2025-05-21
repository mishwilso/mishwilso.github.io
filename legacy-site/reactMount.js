import React from 'react';
import { createRoot } from 'react-dom/client';

export function mountReactApp(targetEl, Component) {
  if (!targetEl) return;
  const root = createRoot(targetEl);
  root.render(<Component />);
}
