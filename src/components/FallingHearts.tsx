
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type HeartItem = {
  id: number;
  left: string;
  duration: string;
  size: number;
  delay: string;
};

export function FallingHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      size: 16 + Math.random() * 32,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall opacity-0 text-primary/30"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            top: "-50px",
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
}
