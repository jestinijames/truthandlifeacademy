import type React from "react";

import Link from "next/link";
import {BsPatchCheck} from "react-icons/bs";
import {RiExpandRightFill} from "react-icons/ri";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import type {SocialLink} from "@/components/Header";

import {getStrapiMedia} from "@/utils/api-helpers";
import {RenderIcon} from "@/utils/render-icon";
import {Heading2, Heading3, Heading4, Paragraph} from "@/utils/typography";

interface Subject {
  id: number;
  achtitle: string;
  achdesc?: string;
}

interface Faculty {
  id: number;
  attributes: {
    name: string;
    email: string;
    description: string;
    role: string;
    subjects: string;
    subs: Subject[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    social: SocialLink[];
    avatar: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function FacultyList({
  children,
  data: faculties,
}: {
  children: React.ReactNode;
  data: Faculty[];
}) {
  return (
    // This is the faculty list
    <div className="relative py-16 container-lg:py-28">
      <div className="grid grid-cols-2 container-sm:grid-cols-3 container-lg:grid-cols-4 container-xl:grid-cols-5 gap-4 container-md:gap-8 ">
        {faculties.map((faculty) => {
          const imageUrl = getStrapiMedia(
            faculty.attributes.avatar.data.attributes.url
          );
          return (
            <div
              key={faculty.id}
              className=" flex flex-col items-center justify-center text-center px-3 py-5 container-sm:px-6 container-sm:py-7 rounded-3xl bg-white  "
            >
              {/* Image */}
              <div className="relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-20 h-20 text-2xl ring-1 ring-white ">
                {imageUrl && (
                  <img
                    alt="facultyImage"
                    className=" absolute inset-0 w-full h-full object-cover hover:scale-125 transition duration-500"
                    src={imageUrl}
                  />
                )}
              </div>
              {/* Title */}
              <div className="mt-3">
                <Heading2 className="text-sm container-sm:text-base font-medium">
                  <span className="clamp-1">{faculty.attributes.name}</span>
                </Heading2>
                <span className="block mt-1 text-sm text-neutral-500 ">
                  {faculty.attributes.role}
                </span>
              </div>
              {/* Modal to display faculty details */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="py-2 px-4 mt-4 bg-neutral-100  rounded-full flex items-center justify-center leading-none text-xs font-medium hover:bg-tla-accent transition duration-500 hover:text-light">
                    Expand
                    <span className="sr-only">Expand Dialog</span>
                    <RiExpandRightFill className="w-5 h-5 text-yellow-600 ms-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="container  bg-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 container-lg:p-8 rounded-3xl container-md:rounded-[40px] shadow-xl flex flex-col container-md:flex-row">
                  <div className="w-32 container-lg:w-40 flex-shrink-0 mt-12 container-sm:mt-0">
                    <div className="relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-20 h-20 text-xl container-lg:text-2xl container-lg:w-36 container-lg:h-36 ring-4 ring-white shadow-2xl z-0">
                      {imageUrl && (
                        <img
                          alt="facultyImageModal"
                          decoding="async"
                          data-nimg="fill"
                          className="object-cover"
                          sizes="100vw"
                          src={imageUrl}
                        />
                      )}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-5 container-md:pt-1 container-lg:ml-6 container-xl:ml-12 flex-grow">
                    <div className="w-full space-y-3.5 ">
                      <Heading2 className="inline-flex items-center text-2xl container-sm:text-3xl container-lg:text-4xl font-semibold">
                        <span>{faculty.attributes.name}</span>
                        <span className="ml-2">
                          <BsPatchCheck className="rounded-full w-6 h-6 container-sm:w-7 container-sm:h-7 container-xl:w-8 container-xl:h-8  bg-twitterBlue" />
                        </span>
                      </Heading2>
                      <Heading3 className="text-lg font-semibold text-neutral-700 ">
                        {faculty.attributes.role}
                      </Heading3>
                      <span className="block text-sm text-neutral-500 ">
                        {faculty.attributes.description}
                      </span>
                      {/* Subjects */}
                      <Heading4 className="text-lg font-semibold text-neutral-700 ">
                        Subjects
                      </Heading4>
                      <div className="grid grid-cols-2 container-lg:grid-cols-4 gap-2">
                        {faculty.attributes.subs.map((sub: Subject) => {
                          return (
                            <div
                              key={sub.id}
                              className={`bg-white border-t border-neutral-50  relative shadow-lg rounded-lg px-3 py-3 cursor-pointer flex container-sm:px-5 container-sm:py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 `}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <Paragraph className="font-medium line-clamp-1 text-neutral-900">
                                      {sub.achtitle}
                                    </Paragraph>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* Social */}
                      <nav className="flex space-x-3 text-2xl text-neutral-600 mt-5 ">
                        {faculty.attributes.social.map((link: SocialLink) => {
                          return (
                            <Link
                              key={link.id}
                              rel="noopener noreferrer"
                              href={link.url}
                              title={link.text}
                              target={link.newTab ? "_blank" : "_self"}
                              className="hover:text-tla-accent transition-all duration-500 block w-7 h-7"
                            >
                              <div>
                                <RenderIcon text={link.social} />
                              </div>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  </div>{" "}
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}
