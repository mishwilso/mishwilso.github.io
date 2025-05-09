// src/InitialSetup.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense } from 'react';

function ComputerModel({ onClick }) {
  return (
    <mesh position={[0, 0, 0]} onClick={onClick}>
      <boxGeometry args={[2, 1.5, 1]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
}

function Scene({ onComputerClick }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <ComputerModel onClick={onComputerClick} />
      <OrbitControls />
    </>
  );
}

export default function InitialSetup({ onEnterDesktop }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={<Html><div>Loading...</div></Html>}>
          <Scene onComputerClick={onEnterDesktop} />
        </Suspense>
      </Canvas>
    </div>
  );
}
