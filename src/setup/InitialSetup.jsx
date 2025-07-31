// InitialSetup.jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, SoftShadows, useTexture } from '@react-three/drei';
import React, { Suspense, useRef, useState, useEffect, useContext, createContext } from 'react';
import * as THREE from 'three';
import { LightWithHelper, Light, WindowDirectionalLight, DebugDirectionalLight} from './SceneLights';
import { useControls } from 'leva';
import MainCameraController from '../camera/ControlledCamera';
import { Environment, useProgress } from '@react-three/drei';
import MusicControlPanel from './MusicControlPanel'; // adjust path if needed

const DarkModeContext = createContext(false);

// THREE.ShadowMapType = THREE.PCFSoftShadowMap;

// Load and display the .glb 3D model
function ComputerModel() {
  // useGLTF loads the model once and caches it
  const gltf = useGLTF('/models/Mish_Office.glb');

    // Traverse the model and enable shadow casting for all mesh objects
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true; // optional, in case your model includes the desk/floor
      obj.material.side = 2; // make sure both sides render if needed
    }

    if (obj.material && obj.material.isMeshStandardMaterial) {
      obj.material.envMapIntensity = 1.5; // boost to see effect
      obj.material.needsUpdate = true;
    }
  });


  return (
    <primitive
      object={gltf.scene} // glTF scene is the root 3D object
      scale={1}          // scale it down if it's too big
      position={[3, -1.5, 0]} // position it nicely on the floor
    />
  );
}

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{
        width: '200px',
        background: '#111',
        borderRadius: '10px',
        padding: '10px',
        color: 'white',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '10px',
          background: '#444',
          borderRadius: '5px',
          overflow: 'hidden',
          marginBottom: '8px'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#4acaff',
            transition: 'width 0.3s ease'
          }} />
        </div>
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}


// Custom screen box with light emission, image, and pulsing hover effect
function BoxScreen({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(1);
  const texture = useTexture('./art/screen_display.jpg');
  const darkMode = useContext(DarkModeContext);

  const positionArray = [0.02, -0.13, 0.71];

  useFrame((state, delta) => {
    if (hovered) {
      setPulse((p) => 1 + Math.sin(state.clock.elapsedTime * 5) * 0.045);
    } else if (pulse !== 1) {
      setPulse(1);
    }
  });

  return (
    <group>
      {/* Only add glow light if dark mode is active */}
      {darkMode && (
        <pointLight
          intensity={hovered ? 2 : 0}
          color={'#aeeaff'}
          distance={1.5}
          decay={2}
          position={positionArray}
        />
      )}
      <mesh
        position={positionArray}
        scale={[pulse, pulse, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <boxGeometry args={[0.45, 0.35, 0.01]} />
        <meshStandardMaterial
          emissive={darkMode ? '#aeeaff' : 'black'}
          emissiveIntensity={darkMode ? 0.6 : 0}
        >
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
}


// Animated prompt that types "Click Monitor to Enter Desktop..."
function TypingPrompt() {
  const [text, setText] = useState('');
  const fullText = 'Click Monitor to Enter Desktop...';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(100, 100, 100, 0.6)',
          color: 'white',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          fontSize: '1.2rem',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          zIndex: 9999, // ⬅ Add this line
        }}
      >
            {text}
    </div>
  );
}


// Sets up the scene with lights, controls, and the model
function Scene({ onComputerClick }) {
  const darkMode = useContext(DarkModeContext);

  // Lamp is only visible in dark mode
  const lampPosition = [-0.9, -0.4, 0.4];

  return (
    <>
      <ambientLight intensity={0} />
      <DebugDirectionalLight />
      <directionalLight position={[5, 5, 5]} intensity={5} />

      {/* Lamp point light visible only in dark mode */}
      {darkMode && (
        <pointLight position={lampPosition} intensity={2} distance={5} decay={2} color={'#fff6cc'} castShadow />
      )}

      <ComputerModel />
      <BoxScreen onClick={onComputerClick} />
    </>
  );
}

function FadeOverlay({ progress }) {
  return (
    <Html fullscreen>
      <div
        style={{
          backgroundColor: 'black',
          opacity: progress,
          transition: 'none', 
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </Html>
  );
}

function TransitionCamera({ trigger, onComplete }) {
  const { camera } = useThree();
  const targetPos = new THREE.Vector3(0, -0.25, 1.5); // Final zoom position
  const [progress, setProgress] = useState(0);
  const [fadeProgress, setFadeProgress] = useState(0);
  const startRef = useRef(null);


  useFrame((_, delta) => {
    if (!trigger) return;
    if (!startRef.current) startRef.current = camera.position.clone();

    const newProgress = Math.min(progress + delta * 0.5, 1);
    setProgress(newProgress);

    // Interpolate camera
    camera.position.lerpVectors(startRef.current, targetPos, newProgress);
    camera.lookAt(0, 0, 0); // look at computer screen

    if (newProgress >= 1) {
      onComplete(); // switch to desktop once done
    }
  });

  return <FadeOverlay progress={progress} />; // fade matches zoom progress
}

// Top-level wrapper that adds canvas, suspense fallback, etc.
export default function InitialSetup({ onEnterDesktop }) {
  const [beginTransition, setBeginTransition] = useState(false);

  const [hasClicked, setHasClicked] = useState(false); // tracks if user clicked
  const audioRef: React.RefObject<HTMLAudioElement> = useRef(null);

  const [darkMode, setDarkMode] = useState(false);
  const exposure = darkMode ? 0.25 : 2;

  const [renderer, setRenderer]: seRef<THREE.WebGLRenderer> = useState(null);



  const handleUserStart = () => {
    setHasClicked(true);
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play().catch(console.error);
    }
  };

  const fadeOutAudio = () => {
  if (!audioRef.current) return;
  const audio = audioRef.current;
  const fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fadeInterval);
    }
  }, 100); // fade every 100ms
};

  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      window.removeEventListener('click', tryPlay);
    };
    window.addEventListener('click', tryPlay);
    return () => window.removeEventListener('click', tryPlay);
  }, []);


  useEffect(() => {
  if (renderer) {
    renderer.toneMappingExposure = darkMode ? 0.25 : 2;
  }
  }, [darkMode, renderer]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <audio ref={audioRef} loop style={{ display: 'none' }}>
        <source src="/audio/Office.mp3" type="audio/mpeg" />
      </audio>

      {!hasClicked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(8px)',
            background: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            fontSize: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            transition: 'opacity 0.5s ease',
            pointerEvents: 'auto',
          }}
          onClick={handleUserStart}
        >
          Click to Start
        </div>
      )}

      

      <MusicControlPanel   
      audioRef={audioRef}
      darkMode={darkMode}
      setDarkMode={setDarkMode} 
      />
      {hasClicked && <TypingPrompt />}

        <Canvas
          shadows
          camera={{ fov: 40 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.LinearSRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = darkMode ? 0.25 : 2; // set initial exposure
            setRenderer(gl); // save renderer so we can update it later
          }}
        >

          <DarkModeContext.Provider value={darkMode}>
        <Suspense fallback={<Html><div>Loading...</div></Html>}>
          <Environment files="/hdri/courtyard_1k.exr" background={false} />
          {/* <ambientLight intensity={0} />
          <DebugDirectionalLight />
          <ComputerModel />
          <BoxScreen
            onClick={() => {
              setBeginTransition(true);
              fadeOutAudio();
            }}
          />*/}
          <Scene onComputerClick={() => {
              setBeginTransition(true);
              fadeOutAudio();
            }} /> 
        </Suspense>

        {beginTransition && (
          <TransitionCamera
            trigger={beginTransition}
            onComplete={onEnterDesktop}
          />
        )}
        <MainCameraController />
        </DarkModeContext.Provider>
      </Canvas>
    </div>
  );
}