// InitialSetup.jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, SoftShadows } from '@react-three/drei';
import { Suspense, useRef, useState  } from 'react';
import * as THREE from 'three';
import { LightWithHelper, DLightWithHelper } from './SceneLights';
import { useControls } from 'leva';
import CameraInfoOverlay from './CameraInfoOverlay';
import ControlledCamera from './ControlledCamera';




// Load and display the .glb 3D model
function ComputerModel({onClick}) {
  // useGLTF loads the model once and caches it
  const gltf = useGLTF('/models/Mish_Office.glb');

    // Traverse the model and enable shadow casting for all mesh objects
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true; // optional, in case your model includes the desk/floor
      obj.material.side = 2; // make sure both sides render if needed
    }
  });


  return (
    <primitive
     onClick={onClick}
      object={gltf.scene} // glTF scene is the root 3D object
      scale={0.5}          // scale it down if it's too big
      position={[0, 0, 0]} // position it nicely on the floor
    />
  );
}

// Add a vertical gradient backdrop
function GradientBackdrop() {
  const backdropRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (backdropRef.current) {
      backdropRef.current.quaternion.copy(camera.quaternion); // always face camera
    }
  });

  return (
    <mesh ref={backdropRef} position={[0, -50, -100]}>
      <planeGeometry args={[500, 500]} />
      <shaderMaterial
        attach="material"
        args={[{
          uniforms: {
            color1: { value: new THREE.Color('#e0e0e0') },
            color2: { value: new THREE.Color('#b0b0b0') },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform vec3 color1;
            uniform vec3 color2;
            void main() {
              gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
          `,
        }]} />
    </mesh>
  );
}

function BoxScreen ( { onClick}){
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const {position} = useControls('Box', {
    position: {
      value: { x: -2, y: 49, z: 20 },
      step: 0.1,
      joystick: 'invertY' // lets you drag in Leva GUI
        }
    });

    const positionArray = [position.x, position.y, position.z];

    return (
        <mesh position={positionArray}
        onClick={onClick}
        >
        <boxGeometry args={[15, 11, 1]} />
        <axesHelper args={[10]} />
        <shadowMaterial transparent opacity={0.25} />
        </mesh>
    )
}

function OscillatingOrbitControls(props) {
  const controlsRef = useRef();
  const direction = useRef(1);

  useFrame(() => {
    const controls = controlsRef.current;
    if (controls) {
      const angle = controls.getAzimuthalAngle(); // current horizontal angle
      const min = props.minAzimuthAngle ?? -Infinity;
      const max = props.maxAzimuthAngle ?? Infinity;

      if (angle <= min || angle > max || angle == max) {
        direction.current *= -1;
      }

      controls.autoRotateSpeed = 0.5 * direction.current;
    }
  });

  return <OrbitControls ref={controlsRef} autoRotate {...props} />;
}

// Sets up the scene with lights, controls, and the model
function Scene({ onComputerClick }) {


const [focusDesk, setFocusDesk] = useState(false);

  return (
    <>
      {/* Ambient light to make things visible */}
      <ambientLight intensity={0.5} />
      {/* <LightWithHelper /> */}
      <DLightWithHelper />
      <directionalLight
        position={[5, 10, 5]}
        castShadow
        intensity={0.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        />
      {/* Directional light like sunlight */}
      {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}

      {/* The actual 3D model */}
      <ComputerModel onClick={() => setFocusDesk(true)} />
        {/* <CameraInfoOverlay /> */}
      {/* Let the user rotate around the model */}
      
      {/* <OscillatingOrbitControls
        enableZoom={true}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={150}
        maxDistance={300}
        /> */}
      {/* <fog attach="fog" args={['#dcdcdc', 100, 1000]} /> */}
    <BoxScreen onClick={onComputerClick}/>
      <GradientBackdrop />
      <ControlledCamera focus={focusDesk} />
    </>
  );
}


// Top-level wrapper that adds canvas, suspense fallback, etc.
export default function InitialSetup({ onEnterDesktop }) {



  const {position} = useControls('mainCamera', {
    position: {
      value: { x: -65, y: 131, z: 201 },
      step: 0.1,
      joystick: 'invertY' // lets you drag in Leva GUI
    }
  });

  const positionArray = [position.x, position.y, position.z];
  
  
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ backgroundColor: 'grey'}} shadows camera={{ position: positionArray, fov: 40 }}>
        {/* <fog attach="fog" args={['#white', 100, 200]} /> */}
        <Suspense fallback={<Html><div>Loading model...</div></Html>}>
          <Scene onComputerClick={onEnterDesktop} />
        </Suspense>
        <mesh rotation={[-Math.PI/2, 0 , 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <shadowMaterial transparent opacity={0.25} />
        </mesh>  
      </Canvas>
    </div>
  );
}