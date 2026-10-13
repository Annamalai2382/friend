import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gift, FileText, X, VolumeX, Play } from 'lucide-react';
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
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  
  // Video 2 (two.mp4) & Gift states
  const [showTwoVideo, setShowTwoVideo] = useState(false);
  const [twoVideoEnded, setTwoVideoEnded] = useState(false);
  const [isTwoVideoMuted, setIsTwoVideoMuted] = useState(false);
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
        setShowVideo(true);
      }, 6000);

      return () => clearTimeout(videoTimer);
    }
  }, [isFinished, showVideo, videoEnded]);

  // Listen for any user interaction to unlock audio / unmute videos
  useEffect(() => {
    const handleUnlockAudio = () => {
      hasInteractedRef.current = true;
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsVideoMuted(false);
      }
      if (twoVideoRef.current) {
        twoVideoRef.current.muted = false;
        setIsTwoVideoMuted(false);
      }
    };

    window.addEventListener('click', handleUnlockAudio);
    window.addEventListener('touchstart', handleUnlockAudio);
    window.addEventListener('keydown', handleUnlockAudio);

    return () => {
      window.removeEventListener('click', handleUnlockAudio);
      window.removeEventListener('touchstart', handleUnlockAudio);
      window.removeEventListener('keydown', handleUnlockAudio);
    };
  }, []);

  // STEP 3: Play video 1 (one.mp4) automatically
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playVideo = async () => {
        const video = videoRef.current;
        if (!video) return;

        // Attempt 1: Try playing unmuted (succeeds if user clicked or browser allows)
        try {
          video.muted = false;
          await video.play();
          setIsVideoMuted(false);
          return;
        } catch (err) {
          console.log("Browser blocked unmuted autoplay for one.mp4, falling back to muted autoplay:", err);
        }

        // Attempt 2: Play muted (guaranteed to autoplay automatically in all browsers)
        try {
          video.muted = true;
          setIsVideoMuted(true);
          await video.play();
        } catch (e) {
          console.log("Autoplay failed completely:", e);
        }
      };

      playVideo();
    }
  }, [showVideo]);

  // STEP 4: Play video 2 (two.mp4) automatically when Next is clicked
  useEffect(() => {
    if (showTwoVideo && twoVideoRef.current) {
      const playTwoVideo = async () => {
        const video = twoVideoRef.current;
        if (!video) return;

        try {
          video.muted = false;
          await video.play();
          setIsTwoVideoMuted(false);
          return;
        } catch (err) {
          console.log("Browser blocked unmuted autoplay for two.mp4, playing muted until tap:", err);
          try {
            video.muted = true;
            setIsTwoVideoMuted(true);
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
    setShowTwoVideo(true);
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
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                setIsVideoMuted(false);
              }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <video
              ref={videoRef}
              src="/one.mp4"
              playsInline
              autoPlay
              controls
              onVolumeChange={() => {
                if (videoRef.current) {
                  setIsVideoMuted(videoRef.current.muted);
                }
              }}
              onEnded={handleVideoEnded}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Tap to Unmute Overlay Button if muted */}
            {isVideoMuted && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    setIsVideoMuted(false);
                  }
                }}
                style={{
                  position: 'absolute',
                  bottom: '90px',
                  zIndex: 100000,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(20, 12, 28, 0.88)',
                  border: '1.5px solid #f3d08a',
                  color: '#f3d08a',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 30px rgba(243, 208, 138, 0.6), 0 10px 25px rgba(0,0,0,0.8)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <VolumeX size={18} color="#f3d08a" /> Tap to Unmute 🔊
              </motion.button>
            )}
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
              if (twoVideoRef.current) {
                twoVideoRef.current.muted = false;
                setIsTwoVideoMuted(false);
              }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <video
              ref={twoVideoRef}
              src="/two.mp4"
              playsInline
              autoPlay
              controls
              onVolumeChange={() => {
                if (twoVideoRef.current) {
                  setIsTwoVideoMuted(twoVideoRef.current.muted);
                }
              }}
              onEnded={handleTwoVideoEnded}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Tap to Unmute Overlay Button if muted */}
            {isTwoVideoMuted && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (twoVideoRef.current) {
                    twoVideoRef.current.muted = false;
                    setIsTwoVideoMuted(false);
                  }
                }}
                style={{
                  position: 'absolute',
                  bottom: '90px',
                  zIndex: 100000,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(20, 12, 28, 0.88)',
                  border: '1.5px solid #f3d08a',
                  color: '#f3d08a',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 30px rgba(243, 208, 138, 0.6), 0 10px 25px rgba(0,0,0,0.8)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <VolumeX size={18} color="#f3d08a" /> Tap to Unmute 🔊
              </motion.button>
            )}
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
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
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
                    boxShadow: '0 0 35px rgba(243, 208, 138, 0.6)',
                    backgroundColor: 'rgba(20, 12, 28, 0.9)'
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
                    boxShadow: '0 0 40px rgba(243, 208, 138, 0.4)'
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={count}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 2.2, opacity: 0, filter: 'blur(8px)' }}
                      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                      style={{
                        fontSize: '110px',
                        fontWeight: 900,
                        color: '#f3d08a',
                        fontFamily: "'Cinzel', serif",
                        textShadow: '0 0 30px #f3d08a, 0 0 60px #f3d08a',
                        lineHeight: 1
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
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                onClick={() => setShowVideo(true)}
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  margin: 'auto',
                  cursor: 'pointer'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '36px 20px',
                    borderRadius: '32px',
                    background: 'rgba(20, 12, 28, 0.78)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(243, 208, 138, 0.35)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 0 40px rgba(243, 208, 138, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
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

                  {/* Play Celebration button / prompt */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                    style={{
                      marginTop: '22px',
                      padding: '9px 20px',
                      borderRadius: '20px',
                      background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
                      color: '#07040a',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      boxShadow: '0 0 20px rgba(243, 208, 138, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Play size={13} fill="#07040a" color="#07040a" /> Play Celebration ✨
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
