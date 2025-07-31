// SceneLights.jsx
import { useRef, useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import { useControls, folder  } from 'leva';
import { DirectionalLightHelper, CameraHelper  } from 'three';

import * as THREE from 'three';


export function LightWithHelper() {
  const light = useRef();

  const {intensity, distance, decay, position } = useControls('PointLight', {
    intensity: { value: 50, min: 0, max: 200, step: 1 },
    distance: { value: 100, min: 0, max: 200, step: 1 },
    decay: { value: 2, min: 0, max: 5, step: 0.1},
    position: {
      value: { x: 30, y: 82, z: 15 },
      step: 0.1,
      joystick: 'invertY'
    },
  });

  useHelper(light, PointLightHelper, 5, 'orange');

  return (
    <pointLight
      ref={light}
      intensity={intensity}
      distance={distance}
      decay={decay}
      position={[position.x, position.y, position.z]}
      castShadow
    />
  );
}

export function Light({ name, defaultPosition = { x: 30, y: 82, z: 15 }, intensityOverride, distanceOverride, decayOverride }) {
  const light = useRef();

  const {intensity, distance, decay, position } = useControls(name, {
    intensity: { value: intensityOverride ?? 51, min: 0, max: 200, step: 1 },
    distance: { value: distanceOverride, min: 0, max: 100, step: 1 },
    decay: { value: decayOverride, min: 0, max: 5, step: 0.1 },
    position: {
      value: defaultPosition,
      step: 0.1,
      joystick: 'invertY',
    },
  });

  const posArr = [position.x, position.y, position.z];

  useHelper(light, PointLightHelper, 'red');

  return (
    <pointLight
      ref={light}
      intensity={intensity}
      distance={distance}
      decay={decay}
      position={posArr}
      castShadow
    />
  );
}


export function WindowDirectionalLight() {
  const light = useRef();

  const { position, target } = useControls('Window Light', {
    position: { value: { x: 100, y: 100, z: 100 }, step: 1 },
    target: { value: { x: 0, y: 0, z: 0 }, step: 1 },
  });

  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(target.x, target.y, target.z);
      light.current.target.updateMatrixWorld();
    }
  }, [target]);

  useHelper(light, DirectionalLightHelper, 10, 'lightblue');

  return (
    <directionalLight
      ref={light}
      position={[position.x, position.y, position.z]}
      intensity={1}
      castShadow
      shadow-mapSize-width={1000000}
      shadow-mapSize-height={1000000}
    />
  );
}


export function ControlledDirectionalLight() {
  const lightRef = useRef();
  const targetRef = useRef(new THREE.Object3D()); // ✅ Initialized directly

  const {
    lightX, lightY, lightZ,
    targetX, targetY, targetZ,
    intensity,
    shadowBias,
    shadowRadius
  } = useControls('Sunlight', {
    lightX: { value: 80, min: -50, max: 100, step: 10 },
    lightY: { value: 20, min: -50, max: 100, step: 10 },
    lightZ: { value: 20, min: -50, max: 100, step: 10 },
    targetX: { value: -80, min: -100, max: 50, step: 10 },
    targetY: { value: -10, min: -50, max: 50, step: 10 },
    targetZ: { value: -10, min: -50, max: 50, step: 10 },
    intensity: { value: 1.2, min: 0, max: 10, step: 0.1 },
    shadowBias: { value: -0.0005, min: -0.01, max: 0.01, step: 0.0001 },
    shadowRadius: { value: 5, min: 1, max: 20, step: 1 }
  });

  useHelper(lightRef, THREE.DirectionalLightHelper, 5);

  // Assign light.target after ref is available
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  // Update target position dynamically
  useEffect(() => {
    targetRef.current.position.set(targetX, targetY, targetZ);
  }, [targetX, targetY, targetZ]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[lightX, lightY, lightZ]}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={0.1}
        shadow-camera-far={500}
        shadow-bias={shadowBias}
        shadow-radius={shadowRadius}
      />
      <primitive object={targetRef.current} />
    </>
  );
}

export function DebugDirectionalLight() {
  const lightRef = useRef();
  const camRef = useRef();

  // Fixed position and target for light
  const lightPosition = [71, 15, 40];
  const targetPosition = [-20, -4, -11];
  const intensity = 5.1;

  // useHelper(lightRef, DirectionalLightHelper, 5, 'yellow');
  // useHelper(camRef, CameraHelper, 'blue');

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target.position.set(...targetPosition);
      lightRef.current.target.updateMatrixWorld();
    }
  }, []);

  return (
    <directionalLight
      ref={lightRef}
      castShadow
      position={lightPosition}
      intensity={intensity}
      shadow-mapSize-width={1100}
      shadow-mapSize-height={1100}
    >
      <orthographicCamera
        ref={camRef}
        attach="shadow-camera"
        args={[-4, 4, 4, -4, 1, 200]} // Controls shadow size and bounds
      />
    </directionalLight>
  );
}