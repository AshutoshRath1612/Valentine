
"use client";

import { useState, useEffect } from "react";
import { Heart, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function SecurityGate({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const SECRET_WORD = "pookie baby"; 

  useEffect(() => {
    setIsMounted(true);
    const saved = sessionStorage.getItem("pookie_unlocked");
    if (saved === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase().trim() === SECRET_WORD) {
      setIsUnlocked(true);
      sessionStorage.setItem("pookie_unlocked", "true");
      setError(false);
    } else {
      setError(true);
      setPasscode("");
      setTimeout(() => setError(false), 500);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <motion.div 
            key="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-4 overflow-hidden"
          >
            {/* Background Decorative Hearts */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10"
              >
                <Heart className="h-20 w-20 text-primary/20" fill="currentColor" />
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10"
              >
                <Heart className="h-32 w-32 text-accent/30" fill="currentColor" />
              </motion.div>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: error ? [0, -10, 10, -10, 10, 0] : 0
              }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 100,
                x: { duration: 0.4 }
              }}
              className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-accent text-center"
            >
              <div className="mb-8 relative inline-block">
                <div className="bg-accent rounded-full p-6 shadow-inner">
                   {error ? (
                     <Lock className="h-12 w-12 text-destructive" />
                   ) : (
                     <motion.div
                       animate={{ scale: [1, 1.1, 1] }}
                       transition={{ repeat: Infinity, duration: 1.5 }}
                     >
                       <Heart className="h-12 w-12 text-accent-foreground" fill="currentColor" />
                     </motion.div>
                   )}
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                  Secure
                </div>
              </div>

              <h2 className="text-3xl font-headline font-bold text-primary mb-2 italic">
                Wait a second...
              </h2>
              <p className="text-muted-foreground mb-8 font-body">
                Only my favorite person can see what's inside. <br/>
                <span className="text-xs font-bold uppercase tracking-widest text-primary/40">Hint: What do I call you the most? ( all in lowercase and with spaces )</span>
              </p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="relative group">
                  <Input
                    type="password"
                    placeholder="Enter our secret word..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className={`text-center py-6 rounded-2xl border-2 focus:ring-accent transition-all ${error ? 'border-destructive' : 'border-accent/30 group-hover:border-accent'}`}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  Unlock My Heart <Unlock className="h-4 w-4" />
                </Button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-destructive font-bold text-sm"
                  >
                    Nice try, stranger! 🙅‍♂️
                  </motion.p>
                )}
              </AnimatePresence>
              
              <div className="mt-8 text-[10px] text-primary/30 font-bold uppercase tracking-[0.4em]">
                Pookie Security v1.1
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isUnlocked && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{children}</motion.div>}
    </>
  );
}
