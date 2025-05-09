import { useState } from 'react';
import InitialSetup from './InitialSetup';

function App() {
  const [enteredDesktop, setEnteredDesktop] = useState(false);

  return (
    <>
      {!enteredDesktop ? (
        <InitialSetup onEnterDesktop={() => setEnteredDesktop(true)} />
      ) : (
        <div className="retro-desktop">
          <h1>Welcome to the 90s!</h1>
        </div>
      )}
    </>
  );
}

export default App;
