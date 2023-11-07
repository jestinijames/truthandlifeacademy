/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type React from "react";

import Image from "next/image";

import AnimatedText from "@/components/ui/animated-text";

export default function PageLayout({
  children,
  heading,
  imageCoverUrl,
}: {
  children: React.ReactNode;
  imageCoverUrl: any;
  heading: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-20">
      {/* Cover Image Container */}
      <div className="w-full px-2 container-x:max-w-[1536px] mx-auto">
        <div className="relative aspect-w-16 aspect-h-13 container-sm:aspect-h-9 container-lg:aspect-h-8 container-x:aspect-h-5 rounded-3xl container-md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="coverImage"
            src={imageCoverUrl}
            className="object-cover w-full  h-full rounded-3xl container-md:rounded-[40px]"
            width={1280}
            height={720}
            sizes="(max-width: 1280px) 100vw, 1536px"
            priority
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <AnimatedText
              text={heading}
              className=" inline-block align-middle !text-5xl  container-md:!text-7xl font-bold "
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
