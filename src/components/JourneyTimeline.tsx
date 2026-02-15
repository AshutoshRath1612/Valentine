
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Coffee, MessageSquareHeart, Map, Gift, Infinity, Heart } from "lucide-react";
import timelineData from "@/app/lib/timeline-data.json";
import { motion } from "framer-motion";

const iconMap = {
  MessageSquareHeart: MessageSquareHeart,
  Coffee: Coffee,
  Map: Map,
  Gift: Gift,
  Infinity: Infinity,
};

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 px-4 bg-background overflow-hidden border-t border-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Heart className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse" fill="currentColor" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4"
          >
            Our Journey Together
          </motion.h2>
          <p className="text-muted-foreground italic">Every moment with you is a treasure.</p>
        </div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-auto md:mr-auto md:border-l-0 md:flex md:flex-col items-center">
          {timelineData.events.map((event, index) => {
            const IconComponent = iconMap[event.icon as keyof typeof iconMap] || Heart;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12 relative w-full md:flex items-center justify-between"
              >
                {/* Connector dot for desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary items-center justify-center z-10 shadow-lg border-4 border-background">
                  <IconComponent className="h-5 w-5 text-primary-foreground" />
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 shadow-md">
                  <IconComponent className="h-5 w-5 text-primary-foreground" />
                </div>

                {/* Desktop layout spacing */}
                <div className={`w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:order-last md:text-left'} pl-12 md:pl-0`}>
                  <Card className="border-none shadow-xl bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-colors">
                    <CardContent className="p-6">
                      <span className="text-sm font-bold text-primary/60 uppercase tracking-widest">{event.date}</span>
                      <h3 className="text-2xl font-headline font-bold text-primary mt-1 mb-2">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for desktop */}
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            );
          })}
          
          {/* Vertical line for desktop */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-primary/20 -translate-x-1/2 origin-top"
          ></motion.div>
        </div>
      </div>
    </section>
  );
}
