import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake,RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";
import img7 from "../assets/images/7.jpg";
import img8 from "../assets/images/8.jpg";

const memorySlides = [
  { img: img1, text: "Celebrating the moments that brought us together 🥂" },
  { img: img2, text: "Shared laughter and joy that made the year special 😂" },
  { img: img3, text: "Grateful for the support and teamwork 🤝" },
  { img: img4, text: "Creating memories that last a lifetime 📸" },
  { img: img5, text: "Cheers to more achievements in 2026 🚀" },
  { img: img6, text: "Thank you for being amazing friends and colleagues 🌟" },
  { img: img7, text: "Wishing you peace, love, and prosperity ✨" },
  { img: img8, text: "Happy New Year 2026!" }
];

const TypingText = ({ text }) => (
  <span>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.04 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

export default function MemoriesPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < memorySlides.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] 
                    flex items-center justify-center px-6 relative">

      {/* Back Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
        className="absolute top-4 left-4 px-4 py-2 
                   bg-yellow-400/20 backdrop-blur-md 
                   rounded-full shadow-lg 
                   hover:bg-yellow-400/40 transition-all 
                   z-50 text-yellow-300 
                   hover:scale-110 active:scale-95 font-semibold"
      >
        {"<"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md bg-white/10 backdrop-blur-2xl 
                   rounded-3xl p-6 shadow-2xl space-y-6 text-center 
                   border border-white/20"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex justify-center text-yellow-400"
        >
          <HeartHandshake size={52} />
        </motion.div>

        <h2 className="text-2xl font-bold text-yellow-300 tracking-wide">
          Cherished Moments
        </h2>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={memorySlides[index].img}
            src={memorySlides[index].img}
            alt="memory"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="w-full h-60 object-cover rounded-xl shadow-xl"
          />
        </AnimatePresence>

        {/* Typing Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={memorySlides[index].text}
            className="text-slate-200 font-medium text-lg min-h-[48px]"
          >
            <TypingText text={memorySlides[index].text} />
          </motion.p>
        </AnimatePresence>

       {/* Ending line */}
{index === memorySlides.length - 1 && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="mt-8 pt-8 border-t border-white/10 w-full flex flex-col items-center"
  >
    <motion.p
      className="text-xs uppercase tracking-[0.3em] text-yellow-500/60 font-black m-0"
    >
      Warmly Wishing
    </motion.p>
    
    <motion.h3 
      className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none mt-2"
    >
      Kapil
    </motion.h3>

    <motion.p
      className="text-sm text-cyan-400/80 pt-4 font-medium italic"
    >
      "And this is just the beginning…"
    </motion.p>

    {/* Navigation Button to Start */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      className="mt-10 group flex items-center gap-2 px-6 py-3 rounded-full 
                 bg-white text-black font-black uppercase text-xs tracking-widest 
                 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
    >
      Return to Home
      <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
    </motion.button>

    <p className="text-[10px] text-slate-600 uppercase tracking-[0.5em] mt-8 opacity-50">
      2026
    </p>
  </motion.div>
)}
      </motion.div>
    </div>
  );
}
