// SceneLights.jsx
import { useRef, useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import { SpotLightHelper, DirectionalLightHelper, CameraHelper } from 'three';
import { useControls } from 'leva';

export function LightWithHelper() {
  const light = useRef();

  // Sliders for all spotlight props
  const { angle, penumbra, intensity, distance, decay, position } = useControls('Spotlight', {
    angle: { value: 0.93, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 0.50, min: 0, max: 1, step: 0.01 },
    intensity: { value: 51, min: 0, max: 200, step: 1 },
    distance: { value: 93, min: 0, max: 100, step: 1 },
    decay: { value: 0.9, min: 0, max: 5, step: 0.1 },
    position: {
      value: { x: 30, y: 82, z: 15 },
      step: 0.1,
      joystick: 'invertY' // lets you drag in Leva GUI
    },
  });

  useHelper(light, SpotLightHelper, 'teal');

  const positionArray = [position.x, position.y, position.z];

  return (
    <spotLight
      ref={light}
      angle={angle}
      penumbra={penumbra}
      intensity={intensity}
      distance={distance}
      decay={decay}
      position={positionArray}
      castShadow
    />
  );
}

export function DLightWithHelper() {
  const light = useRef();
  const shadow = useRef();



  const {position, target} = useControls('orthographicCamera', {
    position: {
      value: { x: 41, y: 53, z: 108 },
      step: 0.1,
      joystick: 'invertY' // lets you drag in Leva GUI
    },
    target: {
      value: { x: -62, y: -200, z: 38 },
      step: 0.1,
      joystick: 'invertY',
    },
  });

  const positionArray = [position.x, position.y, position.z];

    // 🧠 Add this block to make the light aim at the center (model)
    useEffect(() => {
      if (light.current) {
        light.current.target.position.set(target.x, target.y, target.z); // Target center
        light.current.target.updateMatrixWorld();   // Important!
      }
    }, [target]);

    useHelper(light, DirectionalLightHelper, 2, 'crimson');
   useHelper(shadow, CameraHelper);


  return (
    <directionalLight ref={light} position={positionArray} castShadow intensity={0.5}>
      <orthographicCamera 
      attach="shadow-camera" 
      ref={shadow} 
      top={200}
      right={200}/>
    </directionalLight>
  );
}
