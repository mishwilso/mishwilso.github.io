// MainCameraController.tsx
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MainCameraController() {
  const { camera, mouse } = useThree();

  // Base camera position
  const basePosition = new THREE.Vector3(0, 0, 2.5);
  const maxOffset = { x: 0.75, y: 0.5 }; // how far camera should drift

  useFrame(() => {
    // Calculate offset based on mouse movement
    const offsetX = THREE.MathUtils.clamp(mouse.x * maxOffset.x, -maxOffset.x, maxOffset.x);
    const offsetY = THREE.MathUtils.clamp(mouse.y * maxOffset.y, -maxOffset.y, maxOffset.y);
    const target = basePosition.clone().add(new THREE.Vector3(offsetX, offsetY, 0));

    // Smoothly move camera toward target
    camera.position.lerp(target, 0.005);
    camera.lookAt(0, 0, 0); // Always look at center
  });

  return null;
}
