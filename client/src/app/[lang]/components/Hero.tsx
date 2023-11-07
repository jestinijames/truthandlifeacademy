/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {useCallback, useContext} from "react";

import {MenuContext} from "@/context/menu.context";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import AnimatedText from "@/components/ui/animated-text";
import {Button} from "@/components/ui/button";
import LayoutContainer from "@/components/ui/layout-container";

import {getStrapiMedia} from "@/utils/api-helpers";
import {RenderIcon} from "@/utils/render-icon";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: any;
  id: string;
  attributes: {
    url: string;
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({data}: HeroProps) {
  const curvedTextimgUrl = getStrapiMedia(data.picture.data[1].attributes.url);
  const bibleCrossimgUrl = getStrapiMedia(
    data.picture.data[3].attributes.url
  ) as any;

  //  const matches = useMediaQuery(1200);

  return (
    <div className="flex items-center text-white w-full min-h-screen">
      <ParticleContainer />
      <LayoutContainer className="pt-0 md:pt-16 sm:p-8">
        <div className="flex items-center justify-between w-full lg:flex-col">
          <div className="w-1/2 md:w-full">
            <Image
              alt="bibleCross"
              src={bibleCrossimgUrl}
              className="w-full h-auto lg:hidden md:inline-block md:w-full"
              width={737}
              height={678}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              priority
            />
          </div>
          <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
            <AnimatedText
              text={data.title}
              className="!text-6xl !text-left
            xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl
            "
            />
            <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
              {data.description}
            </p>
            <div className="flex items-center self-start mt-2 lg:self-center">
              <Button className="flex items-center bg-black text-white p-2.5 px-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-dark md:p-2 md:px-4 md:text-base">
                Watch Latest Podcast
                <span className="sr-only">Watch Latest Podcast</span>
                <RenderIcon text="stackpop" className="w-6 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </LayoutContainer>
      <CoursesRegister curvedTextimgUrl={curvedTextimgUrl} />
    </div>
  );
}

function ParticleContainer() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className=" w-full h-full absolute mix-blend-color-dodge"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {enable: false},
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 120,
        interactivity: {
          resize: true,
          modes: {
            push: {
              quantity: 90,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#e68e2e",
          },
          links: {
            color: "#f5d393",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 1,
              max: 5,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

function CoursesRegister({curvedTextimgUrl}: {curvedTextimgUrl: any}) {
  const MotionLink = motion(Link);
  const {state} = useContext(MenuContext);
  return (
    <div
      className={`fixed left-4 bottom-4 flex flex-col items-center justify-center md:right-8 sm:right-0  overflow-hidden md:bottom-auto md:left-auto md:top-0 md:absolute z-20
      ${state.toggleMenu ? "hidden" : ""}
      
      `}
    >
      <div className="w-48 h-auto flex items-center justify-center relative md:w-24">
        <Image
          src={curvedTextimgUrl}
          width={200}
          height={200}
          alt="register-button"
          className="animate-spin-slow w-full h-full max-w-[200px] max-h-[200px]"
        />
        <MotionLink
          href="/courses"
          className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-white shadow-md border border-solid border-dark w-20 h-20 rounded-full font-semibold hover:bg-white hover:text-dark transition-all duration-300 md:w-12 md:h-12 md:text-[10px]"
          whileHover={{
            backgroundColor: [
              "#121212",
              "rgba(131,58,180,1)",
              "rgba(253,29,29,1)",
              "rgba(252,176,69,1)",
              "rgba(131,58,180,1)",
              "#121212",
            ],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
          }}
        >
          Explore
        </MotionLink>
      </div>
    </div>
  );
}
