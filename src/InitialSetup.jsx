// InitialSetup.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';


// Load and display the .glb 3D model
function ComputerModel({ onClick }) {
  // useGLTF loads the model once and caches it
  const gltf = useGLTF('/models/low_poly_computer_desk.glb');

  return (
    <primitive
      object={gltf.scene} // glTF scene is the root 3D object
      scale={0.5}          // scale it down if it's too big
      position={[0, -1, 0]} // position it nicely on the floor
      onClick={onClick}    // trigger transition on click
    />
  );
}

// Sets up the scene with lights, controls, and the model
function Scene({ onComputerClick }) {
  return (
    <>
      {/* Ambient light to make things visible */}
      <ambientLight intensity={0.5} />

      {/* Directional light like sunlight */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* The actual 3D model */}
      <ComputerModel onClick={onComputerClick} />

      {/* Let the user rotate around the model */}
      <OrbitControls />
    </>
  );
}

// Top-level wrapper that adds canvas, suspense fallback, etc.
export default function InitialSetup({ onEnterDesktop }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={<Html><div>Loading model...</div></Html>}>
          <Scene onComputerClick={onEnterDesktop} />
        </Suspense>
      </Canvas>
    </div>
  );
}
