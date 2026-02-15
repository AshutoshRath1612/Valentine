
"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(()=> {
    setIsPlaying(true);
    audioRef.current?.play();
  },[])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Fallback for browser auto-play restrictions
          console.log("User interaction required for audio play");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/music/Blue-Yung-Kai.mp3"
        loop
      />
      <Button
        onClick={togglePlay}
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full shadow-2xl bg-accent text-accent-foreground border-primary/20 hover:scale-110 transition-transform"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Music className="h-6 w-6 animate-pulse" />
        ) : (
          <Music2 className="h-6 w-6" />
        )}
      </Button>
      {isPlaying && (
        <span className="absolute -top-12 right-0 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-accent whitespace-nowrap animate-bounce">
          Now Playing Soft Melodies
        </span>
      )}
    </div>
  );
}
