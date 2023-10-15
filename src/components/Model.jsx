import { useRef } from 'react';
import { WireframeGeometry, LineBasicMaterial } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Center } from '@react-three/drei';

import { useAtom } from 'jotai';
import { scale, wireframe } from '../store/settings';

function Model(props) {
  const meshRef = useRef();
  const viewport = useThree(state => state.viewport);

  const [wireframeToggle] = useAtom(wireframe);
  const [scaleAmount] = useAtom(scale);

  return (
    <Center
      onCentered={({ container, height }) =>
        container.scale.setScalar(viewport.height / (height * 5))
      }
    >
      <mesh {...props} ref={meshRef}>
        {!props.geometry && <boxGeometry args={[1, 1, 1]} />}
        {wireframeToggle ? (
          <meshStandardMaterial wireframe={true} color={0x000000} />
        ) : (
          <meshStandardMaterial color="#666666" />
        )}
      </mesh>
    </Center>
  );
}

export default Model;
