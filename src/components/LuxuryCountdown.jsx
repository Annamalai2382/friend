import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';

export const LuxuryCountdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    console.log("Current Countdown Step:", count);
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#07040a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3d08a',
        fontFamily: "'Cinzel', serif"
      }}
    >
      {/* Crown Icon */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid #f3d08a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(243, 208, 138, 0.6)',
          backgroundColor: 'rgba(20, 12, 28, 0.8)'
        }}>
          <Crown size={40} color="#f3d08a" />
        </div>
      </div>

      {/* Giant Countdown Text */}
      <div style={{
        position: 'relative',
        width: '220px',
        height: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '2px dashed rgba(243, 208, 138, 0.6)',
        boxShadow: '0 0 40px rgba(243, 208, 138, 0.4)'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: '130px',
              fontWeight: 900,
              color: '#f3d08a',
              textShadow: '0 0 35px #f3d08a, 0 0 70px #f3d08a',
              lineHeight: 1
            }}
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtitle Message */}
      <p style={{
        marginTop: '40px',
        fontSize: '14px',
        letterSpacing: '4px',
        color: '#e0a9af',
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }}>
        {count === 3 && 'Preparing Royal Wishes...'}
        {count === 2 && 'Igniting Celebration...'}
        {count === 1 && 'Get Ready For Magic...'}
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '240px',
        height: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '10px',
        marginTop: '25px',
        overflow: 'hidden',
        border: '1px solid rgba(243, 208, 138, 0.4)'
      }}>
        <div style={{
          width: `${((4 - count) / 3) * 100}%`,
          height: '100%',
          backgroundColor: '#f3d08a',
          boxShadow: '0 0 15px #f3d08a',
          transition: 'width 1s linear'
        }} />
      </div>
    </div>
  );
};
