import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gift, FileText, X, Play, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

import { SparkleCanvas } from './components/SparkleCanvas';
import { LetterPage } from './components/LetterPage';

const giftImg = '/assets/gift.jpg';

export default function App() {
  const [count, setCount] = useState(3);
  const [isFinished, setIsFinished] = useState(false);
  
  // Video 1 (one.mp4) states
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlayingOne, setIsPlayingOne] = useState(false);
  
  // Video 2 (two.mp4) & Gift states
  const [showTwoVideo, setShowTwoVideo] = useState(false);
  const [twoVideoEnded, setTwoVideoEnded] = useState(false);
  const [isTwoMuted, setIsTwoMuted] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);

  const videoRef = useRef(null);
  const twoVideoRef = useRef(null);
  const hasInteractedRef = useRef(false);

  const launchGrandConfetti = () => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f3d08a', '#e0a9af', '#ffffff', '#ffd700', '#aa771c'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Play Video 1 directly on user tap with guaranteed audio
  const handlePlayVideoOne = () => {
    hasInteractedRef.current = true;
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play().then(() => {
        setIsPlayingOne(true);
      }).catch((err) => {
        console.log("Play error, retrying:", err);
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlayingOne(true);
      });
    }
  };

  const unmuteTwo = () => {
    if (twoVideoRef.current) {
      twoVideoRef.current.muted = false;
      twoVideoRef.current.volume = 1.0;
      if (twoVideoRef.current.currentTime < 4) {
        twoVideoRef.current.currentTime = 0;
      }
      twoVideoRef.current.play().catch(() => {});
      setIsTwoMuted(false);
    }
  };

  const startVideoOne = () => {
    hasInteractedRef.current = true;
    setShowVideo(true);
  };

  const startVideoTwo = () => {
    hasInteractedRef.current = true;
    setShowTwoVideo(true);
  };

  // STEP 1: 3-2-1 Countdown Timer
  useEffect(() => {
    if (count === 0) {
      setIsFinished(true);
      launchGrandConfetti();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [count]);

  // STEP 2: Wait on wish page, then start video 1 (one.mp4)
  useEffect(() => {
    if (isFinished && !showVideo && !videoEnded) {
      const videoTimer = setTimeout(() => {
        startVideoOne();
      }, 6000);

      return () => clearTimeout(videoTimer);
    }
  }, [isFinished, showVideo, videoEnded]);

  // Global user interaction listener to unmute video 2 if needed
  useEffect(() => {
    const handleUnlockAudio = () => {
      hasInteractedRef.current = true;

      if (twoVideoRef.current && isTwoMuted) {
        unmuteTwo();
      }
    };

    window.addEventListener('click', handleUnlockAudio);
    window.addEventListener('touchstart', handleUnlockAudio, { passive: true });
    window.addEventListener('keydown', handleUnlockAudio);

    return () => {
      window.removeEventListener('click', handleUnlockAudio);
      window.removeEventListener('touchstart', handleUnlockAudio);
      window.removeEventListener('keydown', handleUnlockAudio);
    };
  }, [isTwoMuted]);

  // STEP 3: Prime video 1 (one.mp4) ready for tap to play
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
    }
  }, [showVideo]);

  // STEP 4: Play video 2 (two.mp4) default unmuted
  useEffect(() => {
    if (showTwoVideo && twoVideoRef.current) {
      const playTwoVideo = async () => {
        const video = twoVideoRef.current;
        if (!video) return;

        video.muted = false;
        video.volume = 1.0;

        try {
          await video.play();
          setIsTwoMuted(false);
          return;
        } catch (err) {
          console.log("Browser blocked unmuted autoplay for two.mp4, playing muted until tap:", err);
          try {
            video.muted = true;
            setIsTwoMuted(true);
            await video.play();
          } catch (e) {
            console.log("Autoplay failed for two.mp4:", e);
          }
        }
      };

      playTwoVideo();
    }
  }, [showTwoVideo]);

  // Handle Video 1 (one.mp4) Ended
  const handleVideoEnded = () => {
    setShowVideo(false);
    setVideoEnded(true);
    launchGrandConfetti();
  };

  // Handle Video 2 (two.mp4) Ended
  const handleTwoVideoEnded = () => {
    setShowTwoVideo(false);
    setTwoVideoEnded(true);
    launchGrandConfetti();
  };

  // Handle Next button click from LetterPage
  const handleNextFromLetter = () => {
    startVideoTwo();
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#07040a',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* Background Floating Sparkles */}
      {!showVideo && !showTwoVideo && <SparkleCanvas />}

      {/* FULL SCREEN VIDEO 1 OVERLAY (one.mp4) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onClick={!isPlayingOne ? handlePlayVideoOne : undefined}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: !isPlayingOne ? 'pointer' : 'default'
            }}
          >
            {/* Tap anywhere on video to play with audio prompt */}
            <AnimatePresence>
              {!isPlayingOne && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 100001,
                    backgroundColor: 'rgba(7, 4, 10, 0.65)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '20px',
                    textAlign: 'center'
                  }}
                >
                  {/* Glowing Golden Play Button */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 30px rgba(243, 208, 138, 0.6)',
                        '0 0 60px rgba(243, 208, 138, 1)',
                        '0 0 30px rgba(243, 208, 138, 0.6)'
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px'
                    }}
                  >
                    <Play size={40} fill="#07040a" color="#07040a" style={{ marginLeft: '4px' }} />
                  </motion.div>

                  <h2
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '18px',
                      fontWeight: 'bold',
                      letterSpacing: '3px',
                      color: '#f3d08a',
                      textTransform: 'uppercase',
                      textShadow: '0 0 20px rgba(243, 208, 138, 0.9)',
                      margin: '0 0 10px 0'
                    }}
                  >
                    Tap Anywhere To Play
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      color: '#e0a9af',
                      letterSpacing: '1px',
                      margin: 0
                    }}
                  >
                    🔊 Tap to play with sound
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <video
              ref={videoRef}
              src="/one.mp4"
              playsInline
              preload="auto"
              controls={isPlayingOne}
              onEnded={handleVideoEnded}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN VIDEO 2 OVERLAY (two.mp4) */}
      <AnimatePresence>
        {showTwoVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onClick={() => {
              if (isTwoMuted) {
                unmuteTwo();
              }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isTwoMuted ? 'pointer' : 'default'
            }}
          >
            {/* Unmute prompt if browser started video muted */}
            {isTwoMuted && (
              <motion.button
                initial={{ scale: 0.85, opacity: 0, y: -20 }}
                animate={{ scale: [1, 1.08, 1], opacity: 1, y: 0 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                onClick={(e) => {
                  e.stopPropagation();
                  unmuteTwo();
                }}
                style={{
                  position: 'absolute',
                  top: '28px',
                  zIndex: 100001,
                  background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                  color: '#07040a',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  boxShadow: '0 0 35px rgba(243, 208, 138, 0.95), 0 10px 25px rgba(0,0,0,0.7)',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 'bold',
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <VolumeX size={18} color="#07040a" />
                Tap For Sound 🔊
              </motion.button>
            )}

            <video
              ref={twoVideoRef}
              src="/two.mp4"
              playsInline
              controls
              onEnded={handleTwoVideoEnded}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER LETTER PAGE WHEN VIDEO 1 ENDS (UNTIL VIDEO 2 STARTS) */}
      {videoEnded && !showTwoVideo && !twoVideoEnded && (
        <LetterPage onNext={handleNextFromLetter} />
      )}

      {/* AFTER VIDEO 2 ENDS -> SLOWLY APPEARING GIFT BOX */}
      {twoVideoEnded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <motion.div
            key="gift-box-view"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '360px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: 'auto'
            }}
          >
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '4px',
                color: '#f3d08a',
                fontFamily: "'Cinzel', serif",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}
            >
              ✨ A Final Surprise Awaits ✨
            </div>

            {/* Clickable Luxury Gift Box */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDocModal(true)}
              style={{
                position: 'relative',
                width: '210px',
                height: '260px',
                borderRadius: '28px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid rgba(243, 208, 138, 0.6)',
                boxShadow: '0 0 45px rgba(243, 208, 138, 0.5), 0 20px 40px rgba(0,0,0,0.8)'
              }}
            >
              <img src={giftImg} alt="Surprise Gift Box" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,4,10,0.88) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '9px 20px', borderRadius: '20px', background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)', color: '#07040a', fontWeight: 'bold', fontSize: '10px', fontFamily: "'Cinzel', serif", letterSpacing: '1.5px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(243, 208, 138, 0.6)' }}>
                  Tap to Open Gift 🎁
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* POPUP MODAL WINDOW FOR GIFT MESSAGE & DOC BUTTON */}
      <AnimatePresence>
        {showDocModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100000,
              backgroundColor: 'rgba(7, 4, 10, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '350px',
                padding: '32px 22px',
                borderRadius: '28px',
                background: 'rgba(20, 12, 28, 0.95)',
                border: '1px solid rgba(243, 208, 138, 0.5)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 50px rgba(243, 208, 138, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowDocModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(243, 208, 138, 0.12)',
                  border: '1px solid rgba(243, 208, 138, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <Gift size={28} color="#f3d08a" />
              </div>

              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '18px',
                  color: '#f3d08a',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  letterSpacing: '1px'
                }}
              >
               Thozhi
              </h2>

              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#dddddd',
                  marginBottom: '24px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                This book written by me from 2024 to 2026 aug 3, it holds all our friendship memories, if you like to read means now you can..
              </p>

              {/* Open Doc Button */}
              <a
                href="/Thozhi.docx"
                download="Thozhi.docx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '14px 0',
                  borderRadius: '25px',
                  background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                  color: '#07040a',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 25px rgba(243, 208, 138, 0.6)'
                }}
              >
                <FileText size={18} color="#07040a" /> Download (thozhi.docx)
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DEVICE CONTAINER BEFORE VIDEO 1 STARTS */}
      {!showVideo && !videoEnded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <AnimatePresence mode="wait">
            {!isFinished ? (
              /* STEP 1: COUNTDOWN */
              <motion.div
                key="countdown-view"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  margin: 'auto',
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity'
                }}
              >
                {/* Crown */}
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: '2px solid #f3d08a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    boxShadow: '0 0 25px rgba(243, 208, 138, 0.5)',
                    backgroundColor: 'rgba(20, 12, 28, 0.9)',
                    transform: 'translateZ(0)'
                  }}
                >
                  <Crown size={38} color="#f3d08a" />
                </div>

                {/* Ring */}
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '2px dashed #f3d08a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(243, 208, 138, 0.3)',
                    transform: 'translateZ(0)'
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{
                        fontSize: '110px',
                        fontWeight: 900,
                        color: '#f3d08a',
                        fontFamily: "'Cinzel', serif",
                        textShadow: '0 0 25px rgba(243, 208, 138, 0.8)',
                        lineHeight: 1,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity'
                      }}
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <p
                  style={{
                    marginTop: '35px',
                    fontSize: '11px',
                    letterSpacing: '3.5px',
                    color: '#e0a9af',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontFamily: "'Cinzel', serif"
                  }}
                >
                  {count === 3 && 'Preparing Royal Wishes...'}
                  {count === 2 && 'Igniting Celebration...'}
                  {count === 1 && 'Get Ready For Magic...'}
                </p>
              </motion.div>
            ) : (
              /* STEP 2: INITIAL WISH MESSAGE */
              <motion.div
                key="wish-message-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => startVideoOne()}
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  margin: 'auto',
                  cursor: 'pointer',
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '36px 20px',
                    borderRadius: '32px',
                    background: 'rgba(20, 12, 28, 0.92)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(243, 208, 138, 0.35)',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(243, 208, 138, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    transform: 'translateZ(0)'
                  }}
                >
                  <div style={{ marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: '1px solid rgba(243, 208, 138, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(243, 208, 138, 0.4)',
                        backgroundColor: 'rgba(243, 208, 138, 0.1)'
                      }}
                    >
                      <Crown size={30} color="#f3d08a" />
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '10px',
                      letterSpacing: '4px',
                      color: '#f3d08a',
                      fontFamily: "'Cinzel', serif",
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      marginBottom: '18px',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      border: '1px solid rgba(243, 208, 138, 0.35)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    OCTOBER 17, 2026
                  </div>

                  <h1
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: '40px',
                      color: '#e0a9af',
                      lineHeight: '1.3',
                      margin: '0',
                      textShadow: '0 0 25px rgba(224, 169, 175, 0.7), 0 0 50px rgba(224, 169, 175, 0.3)'
                    }}
                  >
                    Wishing you a Happiest Birthday di
                  </h1>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
