import { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import LinkedParticles from './LinkedParticles';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 10000; // 10 saniye
    const interval = 100; // Her 100ms'de bir güncelleme
    const step = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          setShow(false);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
          }}
        >
          <LinkedParticles />
          <Box
            component="img"
            src="/pharmora-logo.png"
            alt="Pharmora Logo"
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 'auto',
              filter: 'brightness(0) invert(1)',
              animation: 'pulse 2s infinite',
              zIndex: 10000,
              '@keyframes pulse': {
                '0%': {
                  filter: 'brightness(0) invert(1) drop-shadow(0 0 25px rgba(76, 175, 80, 0.6))'
                },
                '50%': {
                  filter: 'brightness(0) invert(1) drop-shadow(0 0 30px rgba(76, 175, 80, 0.8))'
                },
                '100%': {
                  filter: 'brightness(0) invert(1) drop-shadow(0 0 25px rgba(76, 175, 80, 0.6))'
                }
              }
            }}
          />
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: 'fixed',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '4px',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4CAF50',
                filter: 'drop-shadow(0 0 15px rgba(76, 175, 80, 0.4))',
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
