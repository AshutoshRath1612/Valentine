"use client";

import { Heart } from "lucide-react";

export function BigLoveLetter() {
  return (
    <section className="relative py-24 px-4 bg-accent/10 overflow-hidden">
      {/* Background Heart Pattern - Warm Tones */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-6 md:grid-cols-10 gap-12 p-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <Heart 
              key={i} 
              className={`h-12 w-12 text-accent-foreground/30 ${i % 4 === 0 ? 'animate-pulse' : ''}`} 
              fill="currentColor"
              style={{
                transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random()})`,
                opacity: 0.1 + Math.random() * 0.3
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-[#fffcf5] backdrop-blur-lg p-8 md:p-20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-accent/30 relative">
          {/* Decorative "Seal" */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-[#fffcf5]">
            <Heart className="h-5 w-5 text-accent-foreground" fill="currentColor" />
          </div>

          <div className="flex justify-between items-start mb-12">
            <div className="space-y-2">
              <p className="text-primary/40 font-bold uppercase tracking-[0.2em] text-[10px]">A Message From The Heart</p>
              <h2 className="text-4xl font-headline text-primary italic">My Pookie Baby,</h2>
            </div>
            <Heart className="h-10 w-10 text-destructive/20 animate-bounce" fill="none" strokeWidth={1} />
          </div>

          <div className="prose prose-lg text-primary/80 font-body italic leading-relaxed space-y-8 text-xl">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              I sat down to write this a dozen times, but words always seem to fall short of how I truly feel. 
              From the moment we first met, my world started spinning in a different, more beautiful direction.
            </p>
            <p>
              You are the quiet in my storm, the laughter in my mundane, and the melody in my silence. 
              The way you see the world makes me want to be a better person every single day. 
              I cherish every small moments we spend together whether it be meeting for some time or going somewhere to 
              or spend time. I love them all and I always want this to never end.
            </p>
            <p>
              You are someone with whom I am so real, infront of whom I can be comfortable, whether it being like a baby, to being happy,
              or emotional or being angry. And I love that you always stayed beside me no matter how I acted, how I behaved, or how I treated you.
              You are someone with a pure heart and trust me you look like a baby when you sleep. I love staring at you.
            </p>
            <p>
              Thank you for choosing me. Thank you for being you. No matter where life takes us, 
              my heart has found its home in you.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-primary/5 text-right">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-bold">Forever & Always,</p>
            <p className="text-4xl font-headline text-primary font-bold">Baby</p>
          </div>
        </div>
      </div>
    </section>
  );
}
