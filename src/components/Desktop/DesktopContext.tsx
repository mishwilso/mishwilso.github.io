// src/components/Desktop/DesktopContext.tsx
// simple context to share launchWindow across components
// lets us launch apps without prop drilling!! so clean

import React, { createContext, useContext, ReactNode } from 'react';

// shape of the context — just one function for now
type DesktopContextType = {
  launchWindow: (appKey: string) => void;
};

// init context (will be undefined before provider wraps things)
const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

interface DesktopProviderProps {
  launchWindow: (appKey: string) => void;
  children: ReactNode; // everything inside Desktop98
}

export const DesktopProvider: React.FC<DesktopProviderProps> = ({
  launchWindow,
  children,
}) => (
  <DesktopContext.Provider value={{ launchWindow }}>
    {children}
  </DesktopContext.Provider>
);

export const useDesktop = (): DesktopContextType => {
  const ctx = useContext(DesktopContext);
  if (!ctx) {
    // this will crash if used outside provider :( watch out
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return ctx;
};
