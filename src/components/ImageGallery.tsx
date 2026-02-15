
"use client";

import * as React from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function ImageGallery() {
  const images = Array.isArray(PlaceHolderImages) ? PlaceHolderImages : [];

  return (
    <section id="gallery" className="py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-20 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute -top-10 left-1/2 -translate-x-1/2"
        >
          <Heart className="h-32 w-32 text-primary" fill="currentColor" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-headline mb-4 text-primary relative z-10"
        >
          Our Moments
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground italic text-lg"
        >
          Captured in time, cherished forever.
        </motion.p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {images.length > 0 ? (
            images.map((image, index) => (
              <motion.div 
                key={image.id}
                initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -15, rotate: 0, scale: 1.05, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* Polaroid Frame */}
                <div className="bg-white p-4 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-primary/5">
                  <div className="relative aspect-square overflow-hidden bg-secondary/20">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Heart className="text-white h-12 w-12 fill-white animate-ping" />
                    </div>
                  </div>
                  
                  {/* Caption Area */}
                  <div className="mt-6 text-center">
                    <p className="font-body italic text-primary/80 text-lg tracking-tight">
                      {image.description}
                    </p>
                    <div className="mt-2 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                       <Heart className="h-3 w-3 text-accent fill-accent" />
                       <Heart className="h-3 w-3 text-accent fill-accent" />
                       <Heart className="h-3 w-3 text-accent fill-accent" />
                    </div>
                  </div>

                  {/* Decorative Tape */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-accent/30 backdrop-blur-sm -rotate-2 border border-white/20 shadow-sm" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-primary/10 rounded-3xl">
              <Heart className="h-12 w-12 mb-4 opacity-10" />
              <p>Capturing memories for our next adventure...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
