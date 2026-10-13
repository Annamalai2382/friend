import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';

export const LuxuryCountdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#07040a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3d08a',
        fontFamily: "'Cinzel', serif",
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Crown Icon */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            border: '2px solid #f3d08a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(243, 208, 138, 0.5)',
            backgroundColor: 'rgba(20, 12, 28, 0.85)',
            transform: 'translateZ(0)'
          }}
        >
          <Crown size={38} color="#f3d08a" />
        </div>
      </div>

      {/* Giant Countdown Text in Ring */}
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '2px dashed rgba(243, 208, 138, 0.5)',
          boxShadow: '0 0 30px rgba(243, 208, 138, 0.3)',
          transform: 'translateZ(0)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              fontSize: '120px',
              fontWeight: 900,
              color: '#f3d08a',
              textShadow: '0 0 25px rgba(243, 208, 138, 0.8)',
              lineHeight: 1,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity'
            }}
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtitle Message */}
      <p
        style={{
          marginTop: '35px',
          fontSize: '12px',
          letterSpacing: '3.5px',
          color: '#e0a9af',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        {count === 3 && 'Preparing Royal Wishes...'}
        {count === 2 && 'Igniting Celebration...'}
        {count === 1 && 'Get Ready For Magic...'}
      </p>

      {/* GPU Accelerated Progress Bar */}
      <div
        style={{
          width: '220px',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          marginTop: '25px',
          overflow: 'hidden',
          border: '1px solid rgba(243, 208, 138, 0.3)'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f3d08a',
            boxShadow: '0 0 10px rgba(243, 208, 138, 0.6)',
            transformOrigin: 'left',
            transform: `scaleX(${Math.max(0, (4 - count) / 3)})`,
            transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
};
