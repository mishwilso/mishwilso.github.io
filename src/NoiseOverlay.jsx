// NoiseOverlay.jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  precision mediump float;
  const float PHI = 1.61803398874989484820459;
  uniform float u_time;
  void main() {
    vec2 xy = gl_FragCoord.xy;
    float r = fract(tan(distance(xy * PHI, xy) * (fract(u_time) + 1.0)) * xy.x);
    float g = fract(tan(distance(xy * PHI, xy) * (fract(u_time) + 2.0)) * xy.x);
    float b = fract(tan(distance(xy * PHI, xy) * (fract(u_time) + 3.0)) * xy.x);
    gl_FragColor = vec4(r, g, b, 0.1);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export default function NoiseOverlay() {
  const materialRef = useRef();
  useFrame(({ clock }) => {
    console.log(clock.getElapsedTime())
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{ u_time: { value: 0 } }}
      />
    </mesh>
  );
}
