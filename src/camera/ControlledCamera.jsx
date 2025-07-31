// MainCameraController.tsx
// slight mouse-following camera drift for subtle parallax effect
// camera stays centered on (0, 0, 0) but nudges based on mouse movement

import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MainCameraController() {
  const { camera, mouse } = useThree();

  // base camera position, stays centered behind scene
  const basePosition = new THREE.Vector3(0, 0, 2.5);

  // how far the camera is allowed to drift based on mouse
  // will tweak somemore, but looks pretty good for now!
  const maxOffset = { x: 0.75, y: 0.5 };

  useFrame(() => {
    // translate mouse [-1, 1] range into actual offset
    const offsetX = THREE.MathUtils.clamp(mouse.x * maxOffset.x, -maxOffset.x, maxOffset.x);
    const offsetY = THREE.MathUtils.clamp(mouse.y * maxOffset.y, -maxOffset.y, maxOffset.y);

    // new target position after adding the offset
    const target = basePosition.clone().add(new THREE.Vector3(offsetX, offsetY, 0));

    // move camera slightly toward that position every frame
    camera.position.lerp(target, 0.005);

    // camera always looks at center of scene
    camera.lookAt(0, 0, 0);
  });

  return null;
}
