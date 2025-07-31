// EnvironmentLoader.jsx
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as THREE from 'three';

export default function HDRIEnvironment({ url }) {
  const { scene, gl } = useThree();

  useEffect(() => {
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(url, (texture) => {
        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();

        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.environment = envMap;
        scene.background = envMap;

        texture.dispose();
        pmremGenerator.dispose();
      });
  }, [url, gl, scene]);

  return null;
}
