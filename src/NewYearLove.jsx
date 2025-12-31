import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, RotateCcw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from "react-router-dom";

const loveMessages = [
  "Closing the chapter on 2025... ",
  "It's been a year of growth, grit, and great company.",
  "Thank you for being a vital part of my journey.",
  "Your support turned hurdles into stepping stones...",
  "And your presence made the good days even better.",
  "Here's to a bold and bright 2026 ahead... ",
  "Let's make this year our most impactful yet! "
];

const FloatingHeart = ({ x, y, onComplete, id }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0, x, y }}
    animate={{ opacity: 0, scale: 1.5, y: y - 100, rotate: Math.random() * 90 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    onAnimationComplete={() => onComplete(id)}
    className="fixed pointer-events-none text-yellow-400/60 z-50"
  >
    <Heart fill="currentColor" size={22} />
  </motion.div>
);

const TypingText = ({ text }) => (
  <motion.div key={text} className="flex flex-wrap justify-center">
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
        className="text-white inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.div>
);

const NewYearLove = () => {
  const navigate = useNavigate();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [clicks, setClicks] = useState([]);

  // Mouse tilt effect (Conditional scale for mobile)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  // Reduced tilt range for better UX on smaller screens
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') handleNextMessage(e);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentMessageIndex, showFinalMessage]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleGlobalClick = (e) => {
    // Only show heart at click position if it's a touch or click
    const clickX = e.clientX || (e.touches && e.touches[0].clientX);
    const clickY = e.clientY || (e.touches && e.touches[0].clientY);
    setClicks(prev => [...prev, { id: Date.now(), x: clickX, y: clickY }]);
  };

  const removeHeart = (id) => setClicks(prev => prev.filter(h => h.id !== id));

  const handleNextMessage = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    if (currentMessageIndex < loveMessages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    } else {
      setShowFinalMessage(true);
      triggerFireworks();
    }
  };

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#8b5cf6', '#fbbf24']
      });
    }, 250);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleGlobalClick}
      className="min-h-screen w-full flex items-center justify-center overflow-hidden relative
                 bg-[#020617] text-slate-200 [perspective:1000px] sm:cursor-none select-none"
    >
      {/* Background Glows - Adjusted size for mobile */}
      <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[30%] bg-violet-900/20 blur-[80px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[30%] bg-cyan-900/20 blur-[80px] sm:blur-[120px] rounded-full" />

      {clicks.map(h => <FloatingHeart key={h.id} {...h} onComplete={removeHeart} />)}

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-lg px-4 sm:px-6"
      >
        <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl
                        border border-white/10 p-6 sm:p-10 text-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!showFinalMessage ? (
              <motion.div 
                key="step"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 sm:space-y-10"
              >
                <div>
                  <h1 className="text-[10px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-cyan-400 font-bold mb-2">2026</h1>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic">The New Era</h2>
                </div>

                <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 text-lg sm:text-2xl font-medium tracking-tight">
                  {currentMessageIndex >= 0 
                    ? <TypingText text={loveMessages[currentMessageIndex]} />
                    : <span className="text-slate-500 italic text-base sm:text-lg">Ready to begin?</span>
                  }
                </div>

                <button
                  onClick={handleNextMessage}
                  className="group relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-black font-extrabold uppercase tracking-tighter hover:bg-cyan-400 transition-all active:scale-90"
                >
                  <span className="text-sm sm:text-base">
                    {currentMessageIndex === -1 ? "Launch ✨" : `Next Step ${currentMessageIndex}/6`}
                  </span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="final"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 sm:space-y-8 py-4"
              >
                <div className="relative inline-block">
                    <Heart size={60} className="sm:size-[100px] text-yellow-400 animate-pulse" fill="currentColor" />
                    <div className="absolute inset-0 blur-2xl bg-yellow-400/30 -z-10" />
                </div>

                <h2 className="text-3xl sm:text-5xl font-black uppercase italic leading-none tracking-tighter">
                   Happy <span className="text-cyan-400">New Year</span><br/>
                   <span className="text-white">2026</span>
                </h2>

                <div className="flex flex-col gap-3 sm:gap-4 items-center">
                  <button
                    onClick={() => navigate("/memories")}
                    className="w-full max-w-[240px] sm:max-w-xs py-3 sm:py-4 rounded-xl bg-cyan-500 text-black font-bold uppercase tracking-widest hover:brightness-110 shadow-lg shadow-cyan-500/20 text-xs sm:text-sm"
                  >
                    Cherished Moments
                  </button>

                  <button
                    onClick={() => { setShowFinalMessage(false); setCurrentMessageIndex(-1); }}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest pt-2"
                  >
                    <RotateCcw size={12} /> Replay Experience
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NewYearLove;