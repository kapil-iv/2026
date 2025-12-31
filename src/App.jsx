import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import IntroPage from "./pages/IntroPages";
import NewYearLove from "./NewYearLove";
import MemoriesPage from "./pages/MemoriesPages";
import music from './assets/music/love.mp3'
import { Music, VolumeX } from 'lucide-react';

export default function App() {
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const toggleMusic = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  return (

    <>
    {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg hover:bg-white/50 transition-all z-50 text-rose-600 hover:scale-110 active:scale-95"
      >
        {isMusicPlaying ? <Music size={24} /> : <VolumeX size={24} />}
      </button>
      <audio ref={audioRef} src={music} loop />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/newyear" element={<NewYearLove />} />
        <Route path="/memories" element={<MemoriesPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
