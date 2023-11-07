/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type React from "react";

import Image from "next/image";
import Link from "next/link";

import {formatDate} from "@/utils/api-helpers";
import {Heading1} from "@/utils/typography";

export default function ArticlePageLayout({
  children,
  heading,
  imageCoverUrl,
  publishedAt,
  authorName,
  authorImgUrl,
}: {
  children: React.ReactNode;
  imageCoverUrl: any;
  heading: string;
  publishedAt: string;
  authorName: string;
  authorImgUrl: any;
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
            <div className="max-w-[768px]">
              <div>
                <div className="space-y-5">
                  <div className="flex flex-wrap space-x-2">
                    <Link
                      className="transition-colors hover:text-white duration-300  inline-flex py-1 rounded-full font-medium text-xs !px-3 text-red-800 bg-red-100 hover:bg-red-800"
                      href="/articles"
                    >
                      Articles Home
                    </Link>
                  </div>
                  <Heading1 className="text-light font-semibold !text-3xl container-md:!text-4xl container-md:!leading-[120%] container-lg:!text-5xl max-w-4xl ">
                    {heading}
                  </Heading1>
                  <div className="w-full border-b border-neutral-200 " />
                  <div className="flex flex-col container-sm:flex-row justify-between container-sm:items-end space-y-5 container-sm:space-y-0 container-sm:space-x-5 rtl:space-x-reverse">
                    <div className="flex items-center flex-wrap text-neutral-200 text-left  text-sm leading-none flex-shrink-0">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full shadow-inner h-10 w-10 container-sm:h-11 container-sm:w-11 text-xl ring-1 ring-white ">
                          <img
                            alt={authorName}
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="absolute inset-0 w-full h-full object-cover"
                            sizes="100px"
                            src={authorImgUrl}
                          />
                        </div>
                      </div>
                      <div className="ms-3">
                        <div className="flex items-center">
                          <span className="block font-semibold">
                            {authorName}
                          </span>
                        </div>
                        <div className="text-xs mt-[6px]">
                          <span className="text-neutral-300">
                            {formatDate(publishedAt)}
                          </span>
                          <span className="mx-2 font-semibold">·</span>
                          <span className="text-neutral-300">2 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
