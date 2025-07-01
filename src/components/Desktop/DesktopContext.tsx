// DesktopContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

type DesktopContextType = {
  launchWindow: (appKey: string) => void;
};

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

interface DesktopProviderProps {
  launchWindow: (appKey: string) => void;
  children: ReactNode;            // explicitly include children
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
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return ctx;
};
