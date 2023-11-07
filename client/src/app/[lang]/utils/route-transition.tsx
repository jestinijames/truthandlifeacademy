"use client";

import type {PropsWithChildren} from "react";

import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";

// Dont delete
// function FrozenRouter(props: PropsWithChildren<object>) {
//   const context = useContext(LayoutRouterContext);
//   const frozen = useRef(context).current;

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {props.children}
//     </LayoutRouterContext.Provider>
//   );
// }

// variants
const transitionVariants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

const RouteTransition = (props: PropsWithChildren<object>) => {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        <motion.div key={pathname} className="h-full">
          <Transition />
          {props.children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

function Transition() {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#2e2257]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: 0.2,
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#3B2D71]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: 0.4,
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#4B3792]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: 0.6,
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

export default RouteTransition;
