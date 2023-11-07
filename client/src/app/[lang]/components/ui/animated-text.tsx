/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {motion} from "framer-motion";

import {quote, singleWord} from "@/utils/framer-motion-variants";

function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="w-full mx-auto py-2 flex flex-col items-center justify-center text-center overflow-hidden sm:py-0">
      <motion.h1
        variants={quote}
        initial="initial"
        animate="animate"
        className={`inline-block w-full text-white font-bold capitalize text-8xl text-center  ${className}`}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={word + "-" + index}
            variants={singleWord}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}

export default AnimatedText;
