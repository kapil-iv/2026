import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-[#1a0b3d] via-[#3b0a6f] to-[#0f2027] 
                    text-white relative overflow-hidden">

      {/* soft glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-center space-y-8 px-6"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex justify-center text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]"
        >
          <Heart size={82} fill="currentColor" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Happy New Year 2026 🎆
        </h1>

        <p className="text-lg text-slate-200">
          New memories. New energy. New beginnings.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/newyear")}
          className="px-10 py-3 rounded-full font-bold
                     bg-gradient-to-r from-yellow-400 to-pink-500
                     text-black shadow-xl
                     hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
                     transition-all"
        >
          Enter the Moment ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
