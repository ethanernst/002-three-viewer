import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import styled from 'styled-components';

import Model from './Model';

const StyleContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;

  canvas {
    display: inherit !important;
    width: 100% !important;
    height: 100% !important;
    background-color: transparent;
    margin: 0%;
    padding: 0%;
  }
`;

function Viewer() {
  return (
    <StyleContainer>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
      ,
    </StyleContainer>
  );
}

export default Viewer;
