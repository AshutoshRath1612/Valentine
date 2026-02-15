import { FallingHearts } from "@/components/FallingHearts";
import { TypingMessage } from "@/components/TypingMessage";
import { ImageGallery } from "@/components/ImageGallery";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { BigLoveLetter } from "@/components/BigLoveLetter";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Toaster } from "@/components/ui/toaster";
import { Heart } from "lucide-react";
import Link from "next/link";
import { SecurityGate } from "@/components/SecurityGate";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SecurityGate>
      <FallingHearts />
      <MusicPlayer />
      <Toaster />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background px-4 overflow-hidden">
        <div className="absolute top-8 left-8 flex items-center gap-2 z-10">
          <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          <span className="text-2xl font-headline font-bold text-primary">Pookie</span>
        </div>
        
        <nav className="absolute top-8 right-8 hidden md:flex gap-8 z-10 text-sm font-medium text-primary">
          <Link href="#journey" className="hover:text-accent-foreground transition-colors">Our Journey</Link>
          <Link href="#gallery" className="hover:text-accent-foreground transition-colors">Our Moments</Link>
          <Link href="#about" className="hover:text-accent-foreground transition-colors">Our Story</Link>
        </nav>

        <div className="z-10 text-center max-w-3xl">
          <div className="mb-8 inline-block p-4 rounded-full bg-accent/30 backdrop-blur-sm animate-bounce">
            <Heart className="h-8 w-8 text-accent-foreground" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-primary mb-8 tracking-tight">
            Forever & Always
          </h1>
          
          <div className="bg-primary/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
            <TypingMessage />
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="#journey"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              See Our Journey
            </Link>
            <Link 
              href="#gallery"
              className="bg-white text-primary border border-primary/20 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              View Our Moments
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <Link href="#journey" className="text-primary/50 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
            <div className="h-8 w-[1px] bg-primary/30"></div>
          </Link>
        </div>
      </section>

      {/* Timeline Section */}
      <JourneyTimeline />

      {/* Gallery Section */}
      <ImageGallery />

      {/* Featured Big Love Letter Section */}
      <BigLoveLetter />

      {/* About / Final Section */}
      <section id="about" className="py-24 px-4 bg-background flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl bg-secondary p-12 rounded-[3rem] shadow-inner border border-primary/5">
          <Heart className="h-12 w-12 text-primary mx-auto mb-6 opacity-40" fill="none" />
          <h2 className="text-4xl font-headline text-primary mb-6 italic">To many more years...</h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-body">
            "Love does not consist in gazing at each other, but in looking outward together in the same direction."
          </p>
          <div className="mt-12 text-primary/40 font-bold uppercase tracking-[0.3em] text-sm">
            💞 Our story officially began in 2023.
          </div>
        </div>
      </section>
    </SecurityGate>
      {/* Footer */}
      <footer className="py-8 border-t border-primary/10 text-center bg-secondary/20">
        <p className="text-sm text-primary/60 font-medium">
          Made with love & <Heart className="inline h-3 w-3 mx-1 text-primary" fill="currentColor" /> for Pookie
        </p>
      </footer>
    </main>
  );
}
