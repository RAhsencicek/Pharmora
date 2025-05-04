import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function MedicineBottle(props) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
      <meshStandardMaterial color="#1976d2" metalness={0.6} roughness={0.2} />

      {/* Bottle Cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
      </mesh>

      {/* Pharmora Text */}
      <Text
        position={[0, 0, 0.52]}
        fontSize={0.15}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        PHARMORA
      </Text>
    </mesh>
  );
}
