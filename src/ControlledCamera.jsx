// CameraController.jsx
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function CameraController({ focus }) {
  const controlsRef = useRef();
  const { camera, mouse } = useThree();
  const direction = useRef(1);
  const minAzimuthAngle = useRef(-Math.PI / 4);
  const maxAzimuthAngle = useRef(-Math.PI / 4);
  const angle = useRef(0);
  const targetZoomPos = [25, -10, 100]; // adjust to focus on your desk
  const [zooming, setZooming] = useState(false);
  const maxOffset = {
  x: 2, // max left/right from center
  y: 2  // max up/down from center
};

  useFrame(() => {
    const controls = controlsRef.current;

    if (!focus) {
      // Oscillate autoRotateSpeed back and forth
    //   angle.current += 0.0025 * direction.current;
    //   if (angle.current > 0.25 || angle.current < -0.25) direction.current *= -1;

      controls.autoRotate = true;
      const angle = controls.getAzimuthalAngle(); // current horizontal angle
      const min = minAzimuthAngle ?? -Infinity;
      const max = maxAzimuthAngle ?? Infinity;

      if (angle <= min || angle > max || angle == max) {
        direction.current *= -1;
      }

      controls.autoRotateSpeed = 0.5 * direction.current;
    } else {
      // Begin zooming in
      controls.autoRotate = false;
       const [tx, ty, tz] = targetZoomPos;

        // Smooth zoom in
        camera.position.lerp({ x: tx, y: ty, z: tz }, 0.05);

        // Parallax effect, clamped within allowed offset area
        const offsetX = THREE.MathUtils.clamp(mouse.x * maxOffset.x, -maxOffset.x, maxOffset.x);
        const offsetY = THREE.MathUtils.clamp(mouse.y * maxOffset.y, -maxOffset.y, maxOffset.y);

        camera.position.x += offsetX;
        camera.position.y += offsetY;

        if (controls) {
        controls.target.set(0, 35, 0);  // Look slightly above desk
        controls.update();
        }

        controls.minDistance = 10;

        
    }

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      enableRotate={!focus}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2.5}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      minDistance={150}
      maxDistance={300}
    />
  );
}
