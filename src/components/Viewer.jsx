import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

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
    case 'obj':
      return new OBJLoader();
    case 'gltf':
      return new GLTFLoader();
    case 'fbx':
      return new FBXLoader();
    default:
      throw new Error('Filetype not supported');
  }
};

function Viewer() {
  const [uploadedFile] = useAtom(currentFile);
  const [loadedMesh, setLoadedMesh] = useState(null);

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
        <ambientLight />
        <directionalLight intensity={0.5} />
        <Model geometry={loadedMesh} />
      </Canvas>
    </StyleContainer>
  );
}

export default Viewer;
