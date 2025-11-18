
/*
'use client';
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import VideoSlideshow from "./ui/VideoSlideShow";
import { videos } from "@/data/index";

export default function CinematicHero() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // define progress ranges for each section
  const section1Opacity = useTransform(scrollYProgress, [0.0, 0.25, 0.4], [1, 1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  return (
    <main ref={container} className="relative h-[300vh] w-full bg-neutral-50 overflow-hidden">
      <section className="sticky top-0 h-screen">
        <motion.div style={{ opacity: section1Opacity }} className="absolute inset-0">
          <VideoSlideshow videos={videos[0]} interval={16000} />
        </motion.div>

        <motion.div style={{ opacity: section2Opacity }} className="absolute inset-0">
          <VideoSlideshow videos={videos[1]} interval={16000} />
        </motion.div>

        <motion.div style={{ opacity: section3Opacity }} className="absolute inset-0">
          <VideoSlideshow videos={videos[2]} interval={16000} />
        </motion.div>
      </section>
    </main>
  );
}

*/
'use client';
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Lenis from 'lenis';
import VideoSlideshow from "./ui/VideoSlideShow";
import { videos } from '@/data/index'

export default function CinematicHero() {  
  const container = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    /*<main ref={container} className="fixed inset-0 min-h-fit w-full bg-neutral-50 overflow-x-hidden overflow-y-scroll">*/
    <main ref={container} className="relative min-h-fit w-full bg-neutral-50 overflow-x-hidden">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <Section3 scrollYProgress={scrollYProgress} />
    </main>
  );
}

type SectionProps = {
  scrollYProgress: MotionValue<number>;
};

const Section1 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  return (
    <motion.div style={{ scale }} className="sticky top-0 w-full h-[90vh] sm:h-[95vh]">
      <VideoSlideshow videos={videos[0]} interval={16000}/>  
    </motion.div >
  );
};

const Section2 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 0.7]);
  return (
    <motion.div style={{ scale }} className="relative w-full h-[90vh] sm:h-[95vh]">
      <VideoSlideshow videos={videos[1]} interval={16000}/>  
    </motion.div >
  );
};

const Section3 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  return (
    <motion.div style={{ scale }} className="relative w-full h-[90vh] sm:h-[95vh]">
      <VideoSlideshow videos={videos[2]} interval={16000}/>  
    </motion.div >
  );
};
