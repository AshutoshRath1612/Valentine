
"use client";

import { useEffect, useState } from "react";

const messages = [
  "You are the best thing that ever happened to me.",
  "Every moment with you is a gift I cherish.",
  "Your love is the melody that fills my heart.",
  "Happy Anniversary, my dearest.",
  "Forever wouldn't be long enough with you.",
];

export function TypingMessage() {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMessage = messages[messageIndex];

      if (isDeleting) {
        setText(currentMessage.substring(0, text.length - 1));
        setSpeed(50);
      } else {
        setText(currentMessage.substring(0, text.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && text === currentMessage) {
        setIsDeleting(true);
        setSpeed(2000); // Pause at end
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setSpeed(500);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex, speed]);

  return (
    <div className="min-h-[3rem] text-center">
      <p className="text-xl md:text-3xl font-headline text-primary-foreground font-light italic">
        {text}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
