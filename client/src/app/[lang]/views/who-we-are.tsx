/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {useRef} from "react";

import {getStrapiMedia} from "@//utils/api-helpers";
import {motion, useScroll} from "framer-motion";

import AnimatedNumbers from "@/components/ui/animated-numbers";
import PageLayout from "@/components/ui/page-layout";

interface WhoWeAreProps {
  data: any;
}

interface Achievement {
  title: string;
  count: string;
}

interface Competence {
  title: string;
  description: string;
}

export default function WhoWeAre({data}: WhoWeAreProps) {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const coverImage = getStrapiMedia(
    data.picture.data[1].attributes.url
  ) as string;
  const bioImage = getStrapiMedia(
    data.picture.data[0].attributes.url
  ) as string;

  return (
    <div>
      <PageLayout heading="Who We Are" imageCoverUrl={coverImage}>
        <div className="container py-16 container-lg:py-28 space-y-16 container-lg:space-y-28">
          <div className="relative py-16">
            <div className="absolute inset-y-0 w-screen container-xl:max-w-[1340px] container-2xl:max-w-[1536px] left-1/2 transform -translate-x-1/2 container-xl:rounded-[40px] z-0 bg-neutral-100 ">
              <span className="sr-only hidden">bg</span>
            </div>
            <div className="relative">
              {/* header */}

              <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2  md:col-span-8">
                  <h2 className="text-2xl container-md:text-3xl container-lg:text-4xl font-semibold">
                    BIO
                  </h2>
                  <span className="mt-2 container-md:mt-3 font-normal block text-base container-sm:text-xl text-neutral-500 ">
                    {data.bio}
                  </span>
                </div>
                <div className="relative col-span-3 h-max rounded-2xl border-2 border-solid border-dark  bg-light p-8  xl:col-span-4 md:col-span-8 md:order-1 ">
                  <div className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%]  rounded-[2rem] rounded-br-3xl  bg-dark   " />
                  <img
                    src={bioImage}
                    alt="cover"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
                <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row  xl:items-center md:order-3">
                  {data.achievements.map(
                    (achievement: Achievement, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-end justify-center xl:items-center"
                        >
                          <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                            <AnimatedNumbers val={achievement.count} /> +
                          </span>
                          <h2 className="mb-4 text-xl font-medium capitalize   xl:text-center md:text-lg sm:text-base xs:text-sm">
                            {achievement.title}
                          </h2>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* Core competencies */}
              <div className="my-32">
                <h2 className="text-2xl container-md:text-3xl container-lg:text-4xl font-semibold">
                  Core Competencies
                </h2>

                <div ref={ref} className="relative mx-auto mt-5 w-full">
                  <motion.div
                    className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-tla-primary  origin-top   dark:shadow-3xl"
                    style={{
                      scaleY: scrollYProgress,
                    }}
                  />

                  <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
                    {data.competencies.map(
                      (competence: Competence, index: number) => {
                        return (
                          <li
                            ref={ref2}
                            key={index}
                            className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
                          >
                            <ListIcon reference={ref2} />
                            <motion.div
                              initial={{y: 50}}
                              whileInView={{y: 0}}
                              transition={{
                                duration: 0.5,
                                type: "spring",
                              }}
                            >
                              <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg text-dark">
                                {competence.title}
                              </h3>
                              <p className="font-medium w-full md:text-sm text-dark">
                                {competence.description}
                              </p>
                            </motion.div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

function ListIcon({reference}: {reference: any}) {
  const {scrollYProgress} = useScroll({
    target: reference,
    offset: ["center end", "center center"],
  });
  return (
    <figure className="absolute left-0 stroke-tla-accent">
      <svg
        className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
        width="75"
        height="75"
        viewBox="0 0 100 100"
      >
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-primary stroke-1 fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="stroke-1 fill-dark animate-pulse"
        />
      </svg>
    </figure>
  );
}
