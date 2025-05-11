// CameraInfoOverlay.jsx
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { useThree } from '@react-three/fiber';

export default function CameraInfoOverlay() {
  const { camera, controls } = useThree();
  const [info, setInfo] = useState({});

  useFrame(() => {
    setInfo({
      position: {
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
      },
      rotation: {
        x: camera.rotation.x.toFixed(2),
        y: camera.rotation.y.toFixed(2),
        z: camera.rotation.z.toFixed(2),
      },
      target: controls?.target
        ? {
            x: controls.target.x.toFixed(2),
            y: controls.target.y.toFixed(2),
            z: controls.target.z.toFixed(2),
          }
        : null,
    });
  });

  return (
    <Html position={[0, 2, 0]} center>
      <div
        style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '8px',
          fontSize: '12px',
          borderRadius: '6px',
          fontFamily: 'monospace',
        }}
      >
        <div>📍 <b>Camera Position</b></div>
        <div>{`x: ${info.position?.x}, y: ${info.position?.y}, z: ${info.position?.z}`}</div>
        <div>🌀 <b>Rotation (Euler)</b></div>
        <div>{`x: ${info.rotation?.x}, y: ${info.rotation?.y}, z: ${info.rotation?.z}`}</div>
        {info.target && (
          <>
            <div>🎯 <b>Orbit Target</b></div>
            <div>{`x: ${info.target.x}, y: ${info.target.y}, z: ${info.target.z}`}</div>
          </>
        )}
      </div>
    </Html>
  );
}
