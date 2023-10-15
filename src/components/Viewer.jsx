import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

import { useAtom } from 'jotai';
import { currentFile } from '../store/settings';

import styled from 'styled-components';

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import Model from './Model';

const StyleContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const getLoader = fileExtension => {
  switch (fileExtension) {
    case 'stl':
      return new STLLoader();
    // other types not working currently
    // case 'obj':
    //   return new OBJLoader();
    // case 'gltf':
    //   return new GLTFLoader();
    // case 'glb':
    //   return new GLTFLoader();
    // case 'fbx':
    //   return new FBXLoader();
    default:
      throw new Error('Filetype not supported');
  }
};

function Viewer() {
  const [uploadedFile] = useAtom(currentFile);
  const [loadedMesh, setLoadedMesh] = useState(null);

  const cameraRef = useRef();
  const cameraProperties = {
    position: [0, 10, 20],
    rotation: [-Math.PI / 6, 0, 0],
    fov: 30,
  };

  const parseUploadedFile = file => {
    const fileExtension = file.name.split('.').pop();

    const loader = getLoader(fileExtension);
    const reader = new FileReader();

    reader.onload = event => {
      const result = event.target.result;
      loader.load(result, geometry => {
        setLoadedMesh(geometry);
      });
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    uploadedFile && parseUploadedFile(uploadedFile);
  }, [uploadedFile]);

  return (
    <StyleContainer>
      <Canvas>
        <PerspectiveCamera ref={cameraRef} {...cameraProperties} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model geometry={loadedMesh} scale={2} />
        <OrbitControls />
      </Canvas>
    </StyleContainer>
  );
}

export default Viewer;
