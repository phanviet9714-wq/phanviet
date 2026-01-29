"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Intro() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /profiles after 3.5 seconds (allowing for animation)
    const timer = setTimeout(() => {
      router.push("/profiles");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, 1.5, 30], // Zoom in dramatically at the end
          opacity: [0, 1, 1, 0] // Fade in, stay, then fade out
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.1, 0.8, 1], // Timing of keyframes
          ease: "easeInOut"
        }}
        className="text-netflix-red font-bebas text-6xl md:text-9xl tracking-widest whitespace-nowrap"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        PHAN VIỆT
      </motion.div>
    </div>
  );
}
