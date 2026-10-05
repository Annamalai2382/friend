import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Music, Flame, Award, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveWishCards = ({ cakeImg, giftImg }) => {
  const [activeTab, setActiveTab] = useState('wish');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    // Trigger burst of gold confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f3d08a', '#e0a9af', '#ffffff', '#ffd700']
    });
  };

  const handleOpenGift = () => {
    setGiftOpened(true);
    confetti({
      particleCount: 150,
      spread: 100,
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
    <div className="w-full flex flex-col items-center">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center w-full max-w-xs glass-pill p-1.5 rounded-full mb-6 border border-[#f3d08a]/30 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 relative ${
                isActive ? 'text-[#07040a]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 shimmer-button rounded-full shadow-[0_0_15px_rgba(243,208,138,0.5)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">
                <Icon className="w-4 h-4" />
              </span>
              <span className="relative z-10 font-cinzel text-[9px] tracking-wider uppercase font-bold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="w-full min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* TAB 1: MAIN WISH */}
          {activeTab === 'wish' && (
            <motion.div
              key="tab-wish"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3d08a]/10 flex items-center justify-center border border-[#f3d08a]/30 mb-4">
                <Sparkles className="w-6 h-6 text-[#f3d08a] pulse-glow" />
              </div>

              <h3 className="font-cinzel text-xl font-bold gold-text mb-3 tracking-wide">
                A Royal Birthday Wish
              </h3>

              <p className="font-sans text-xs text-gray-200 leading-relaxed tracking-wide mb-6 opacity-95">
                May your day be filled with endless sparkle, joy, and unconditional magic. On this extraordinary occasion of October 17, 2026, may all your grandest dreams gracefully come true!
              </p>

              <div className="w-full grid grid-cols-2 gap-3 mt-2">
                <div className="glass-pill p-3 rounded-2xl flex flex-col items-center text-center border border-white/10">
                  <span className="font-script text-2xl text-[#f3d08a]">Infinite</span>
                  <span className="font-cinzel text-[10px] text-gray-300 uppercase tracking-widest mt-1">Joy & Health</span>
                </div>
                <div className="glass-pill p-3 rounded-2xl flex flex-col items-center text-center border border-white/10">
                  <span className="font-script text-2xl text-[#e0a9af]">Everlasting</span>
                  <span className="font-cinzel text-[10px] text-gray-300 uppercase tracking-widest mt-1">Success & Grace</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ROYAL CAKE */}
          {activeTab === 'cake' && (
            <motion.div
              key="tab-cake"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel rounded-3xl p-5 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="relative w-48 h-64 rounded-2xl overflow-hidden mb-4 border border-[#f3d08a]/40 shadow-2xl">
                <img src={cakeImg} alt="Luxury Birthday Cake" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07040a] via-transparent to-transparent opacity-80" />
                
                {/* Flame effect overlay */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={candlesBlown ? { scale: 0, opacity: 0 } : { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                      className="w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full blur-[1px] shadow-[0_0_12px_#f97316]"
                    />
                  ))}
                </div>
              </div>

              {!candlesBlown ? (
                <button
                  onClick={handleBlowCandles}
                  className="w-full py-3 rounded-2xl shimmer-button font-cinzel font-bold text-xs text-[#07040a] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#07040a]" /> Make a Wish & Blow Candles
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 glass-pill rounded-2xl w-full border border-green-400/40 text-green-300 text-xs font-cinzel tracking-wider"
                >
                  ✨ Wish Sent to the Universe! ✨
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 3: SURPRISE GIFT */}
          {activeTab === 'gift' && (
            <motion.div
              key="tab-gift"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel rounded-3xl p-5 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="relative w-48 h-60 rounded-2xl overflow-hidden mb-4 border border-[#e0a9af]/40 shadow-2xl">
                <img src={giftImg} alt="Luxury Gift Box" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07040a] via-transparent to-transparent opacity-70" />
              </div>

              {!giftOpened ? (
                <button
                  onClick={handleOpenGift}
                  className="w-full py-3 rounded-2xl shimmer-button font-cinzel font-bold text-xs text-[#07040a] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-[#07040a]" /> Tap to Unbox Surprise
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-pill rounded-2xl w-full border border-[#f3d08a]/40 flex flex-col items-center"
                >
                  <Award className="w-6 h-6 text-[#f3d08a] mb-1" />
                  <span className="font-cinzel text-xs font-bold gold-text uppercase tracking-widest">
                    VIP Birthday Access Unlocked
                  </span>
                  <p className="font-sans text-[11px] text-gray-300 mt-1">
                    Granted 365 days of unconditional happiness, luxury, and success!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 4: MEMORIES / VIBES */}
          {activeTab === 'reasons' && (
            <motion.div
              key="tab-reasons"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel rounded-3xl p-4 flex flex-col gap-3"
            >
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#f3d08a] text-center mb-1">
                The Royal Legacy
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                {memoryCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 glass-pill rounded-xl border border-white/10 text-left"
                  >
                    <span className="font-cinzel text-xs font-bold text-[#e0a9af] block mb-0.5">
                      ✦ {card.title}
                    </span>
                    <p className="font-sans text-[11px] text-gray-300">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
