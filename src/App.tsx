// App.tsx
// Entry point that toggles between initial setup and the desktop environment.

import { useState } from 'react';
import InitialSetup from './setup/InitialSetup';
import Desktop98 from './components/desktop/Desktop98';

function App() {
  const [enteredDesktop, setEnteredDesktop] = useState(false);

  return enteredDesktop ? (
    <Desktop98 />
  ) : (
    <InitialSetup onEnterDesktop={() => setEnteredDesktop(true)} />
  );
}

export default App;
