import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Flame, Award, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveWishCards = ({ cakeImg, giftImg }) => {
  const [activeTab, setActiveTab] = useState('wish');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f3d08a', '#e0a9af', '#ffffff', '#ffd700']
    });
  };

  const handleOpenGift = () => {
    setGiftOpened(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e0a9af', '#f3d08a', '#c97e88']
    });
  };

  const tabs = [
    { id: 'wish', label: 'Wish', icon: Heart },
    { id: 'cake', label: 'Royal Cake', icon: Flame },
    { id: 'gift', label: 'Surprise', icon: Gift },
    { id: 'reasons', label: 'Memories', icon: Stars }
  ];

  const memoryCards = [
    { title: 'Pure Elegance', desc: 'Your grace and elegance shine brighter than any diamond.' },
    { title: 'Kind Heart', desc: 'Bringing endless warmth, happiness, and joy to everyone around.' },
    { title: 'Unstoppable Energy', desc: 'Inspiring everyone to dream bigger and reach higher.' },
    { title: 'Queen Energy', desc: 'Ruling every moment with confidence, wisdom, and beauty.' }
  ];

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'translateZ(0)'
      }}
    >
      <style>{`
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15, 1.25); opacity: 1; }
        }
        .flame-active {
          animation: flameFlicker 1.2s infinite ease-in-out;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '340px',
          padding: '5px',
          borderRadius: '30px',
          backgroundColor: 'rgba(20, 12, 28, 0.92)',
          border: '1px solid rgba(243, 208, 138, 0.3)',
          marginBottom: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
          transform: 'translateZ(0)'
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                position: 'relative',
                background: isActive
                  ? 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)'
                  : 'transparent',
                color: isActive ? '#07040a' : '#aaaaaa',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 0 15px rgba(243, 208, 138, 0.4)' : 'none',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <Icon size={16} />
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '9px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateZ(0)'
        }}
      >
        <AnimatePresence mode="wait">
          {/* TAB 1: MAIN WISH */}
          {activeTab === 'wish' && (
            <motion.div
              key="tab-wish"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                width: '100%',
                backgroundColor: 'rgba(20, 12, 28, 0.94)',
                borderRadius: '24px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(243, 208, 138, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(243, 208, 138, 0.1)',
                  border: '1px solid rgba(243, 208, 138, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <Sparkles size={22} color="#f3d08a" />
              </div>

              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#f3d08a',
                  marginBottom: '12px',
                  letterSpacing: '1px'
                }}
              >
                A Royal Birthday Wish
              </h3>

              <p
                style={{
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: '#e0e0e0',
                  marginBottom: '20px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                May your day be filled with endless sparkle, joy, and unconditional magic. On this extraordinary occasion of October 17, 2026, may all your grandest dreams gracefully come true!
              </p>

              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '12px 8px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '22px', color: '#f3d08a' }}>Infinite</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>Joy & Health</span>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '12px 8px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '22px', color: '#e0a9af' }}>Everlasting</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>Success & Grace</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ROYAL CAKE */}
          {activeTab === 'cake' && (
            <motion.div
              key="tab-cake"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                width: '100%',
                backgroundColor: 'rgba(20, 12, 28, 0.94)',
                borderRadius: '24px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(243, 208, 138, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '220px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid rgba(243, 208, 138, 0.4)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)'
                }}
              >
                <img src={cakeImg} alt="Luxury Birthday Cake" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,4,10,0.85) 0%, transparent 60%)' }} />

                {/* Pure CSS GPU Candle Flames */}
                {!candlesBlown && (
                  <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flame-active"
                        style={{
                          width: '10px',
                          height: '18px',
                          background: 'linear-gradient(to top, #ea580c, #fde047, #ffffff)',
                          borderRadius: '50%',
                          boxShadow: '0 0 10px #f97316',
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {!candlesBlown ? (
                <button
                  onClick={handleBlowCandles}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderRadius: '18px',
                    background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 'bold',
                    fontSize: '11px',
                    color: '#07040a',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(243, 208, 138, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Flame size={15} color="#07040a" /> Make a Wish & Blow Candles
                </button>
              ) : (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '18px',
                    width: '100%',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    color: '#86efac',
                    fontSize: '11px',
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: '1px',
                    textAlign: 'center'
                  }}
                >
                  ✨ Wish Sent to the Universe! ✨
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: SURPRISE GIFT */}
          {activeTab === 'gift' && (
            <motion.div
              key="tab-gift"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                width: '100%',
                backgroundColor: 'rgba(20, 12, 28, 0.94)',
                borderRadius: '24px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(243, 208, 138, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '220px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid rgba(224, 169, 175, 0.4)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)'
                }}
              >
                <img src={giftImg} alt="Luxury Gift Box" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,4,10,0.85) 0%, transparent 60%)' }} />
              </div>

              {!giftOpened ? (
                <button
                  onClick={handleOpenGift}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderRadius: '18px',
                    background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 'bold',
                    fontSize: '11px',
                    color: '#07040a',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(243, 208, 138, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Gift size={15} color="#07040a" /> Tap to Unbox Surprise
                </button>
              ) : (
                <div
                  style={{
                    padding: '14px 12px',
                    borderRadius: '18px',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(243, 208, 138, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Award size={22} color="#f3d08a" style={{ marginBottom: '6px' }} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 'bold', color: '#f3d08a', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    VIP Birthday Access Unlocked
                  </span>
                  <p style={{ fontSize: '11px', color: '#cccccc', marginTop: '4px', lineHeight: '1.4' }}>
                    Granted 365 days of unconditional happiness, luxury, and success!
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: MEMORIES */}
          {activeTab === 'reasons' && (
            <motion.div
              key="tab-reasons"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                width: '100%',
                backgroundColor: 'rgba(20, 12, 28, 0.94)',
                borderRadius: '24px',
                padding: '18px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                border: '1px solid rgba(243, 208, 138, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
            >
              <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f3d08a', textAlign: 'center', marginBottom: '4px' }}>
                The Royal Legacy
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                {memoryCards.map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 'bold', color: '#e0a9af', display: 'block', marginBottom: '2px' }}>
                      ✦ {card.title}
                    </span>
                    <p style={{ fontSize: '11px', color: '#cccccc', margin: 0, lineHeight: '1.4' }}>
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
