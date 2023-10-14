import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Model(props) {
  const meshRef = useRef();

  // rotate by delta every frame
  useFrame((_, delta) => (meshRef.current.rotation.y += delta));

  return (
    <mesh {...props} ref={meshRef}>
      {!props.geometry && <boxGeometry args={[1, 1, 1]} />}
      <meshBasicMaterial color="#006600" />
    </mesh>
  );
}

export default Model;
