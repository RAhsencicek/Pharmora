import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MedicineBottle from '../3d/MedicineBottle';

export default function Hero() {
  return (
    <Box
      sx={{
        height: { xs: 300, md: 400 },
        width: '100%',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          background: 'transparent',
        }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          castShadow
        />
        <pointLight position={[-10, -10, -10]} />
        
        <MedicineBottle position={[0, 0, 0]} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={4}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </Box>
  );
}
