/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import {useState} from "react";

import {BsPlayCircle} from "react-icons/bs";
import {LuCheck, LuChevronsUpDown} from "react-icons/lu";
import ReactPlayer from "react-player/youtube";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/combobox";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

import {formatDate, getStrapiMedia} from "@/utils/api-helpers";
import {cn} from "@/utils/tailwind-helpers";
import {Heading2} from "@/utils/typography";

interface Podcast {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    videoId: string;
    premier: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

const sortByOrder = [
  {
    value: "desc",
    label: "Newest",
  },
  {
    value: "asc",
    label: "Oldest",
  },
];

export default function PodcastList({
  children,
  data: podcasts,
}: {
  children: React.ReactNode;
  data: Podcast[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      {/* Podcast List Container */}
      <div className="container py-16 container-lg:py-28 space-y-16 container-lg:space-y-28">
        <div className="relative py-16">
          <div className="absolute inset-y-0 w-screen container-xl:max-w-[1340px] container-2xl:max-w-[1536px] left-1/2 transform -translate-x-1/2 container-xl:rounded-[40px] z-0 bg-neutral-100 ">
            <span className="sr-only hidden">bg</span>
          </div>
          {/* This is the filter toolbar */}
          <div className="mt-16 flex flex-col container-sm:items-center container-sm:justify-between container-sm:flex-row">
            {/* Sort By */}
            <div className="block my-4 border-b w-full border-neutral-500 container-sm:hidden" />
            <div className="flex justify-end">
              <div className="flex-shrink-0 ">
                <div className="relative">
                  <div>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="text-dark flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent  bg-white  ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  "
                        >
                          {value
                            ? sortByOrder.find(
                                (sorter) => sorter.label.toLowerCase() === value
                              )?.label
                            : "Select Order..."}
                          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  text-sm text-dark bg-light">
                        <Command>
                          <CommandInput placeholder="Search sort..." />
                          <CommandEmpty>No sort found.</CommandEmpty>
                          <CommandGroup>
                            {sortByOrder.map((group) => (
                              <CommandItem
                                key={group.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <LuCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === group.label.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {group.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* This is the podcast list */}
          <div className="grid container-sm:grid-cols-2 container-lg:grid-cols-3 gap-x-6 gap-y-8 container-md:gap-x-8 container-md:gap-y-10 mt-8 container-lg:mt-10">
            {podcasts.map((podcast) => {
              const imageUrl = getStrapiMedia(
                podcast.attributes.cover.data.attributes.url
              );

              return (
                <div key={podcast.id} className="relative flex flex-col h-full">
                  {/* Image */}
                  <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 container-sm:aspect-h-9 overflow-hidden z-0">
                    <div>
                      <div className="relative w-full h-full">
                        {imageUrl && (
                          <img
                            alt="presentation"
                            className=" w-full h-full object-cover "
                            src={imageUrl}
                          />
                        )}
                        <span className="absolute inset-0 flex items-center justify-center ">
                          <div className="hover:scale-105 transform cursor-pointer transition-transform">
                            {/* Modal to play video */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="bg-transparent hover:bg-transparent rounded-full flex items-center justify-center text-xl text-white ">
                                  <BsPlayCircle className="w-11 h-11 hover:scale-150  transform transition-transform" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-3xl container-sm:max-w-[700px] bg-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <ReactPlayer
                                  url={`https://www.youtube.com/watch?v=${podcast.attributes.videoId}`}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="space-y-2.5 mt-4 px-4">
                    <div className="inline-flex items-center flex-wrap text-neutral-200 leading-none text-xs">
                      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                        <div>
                          <Heading2 className="block font-semibold text-base text-dark">
                            <span className="line-clamp-1">
                              {podcast.attributes.title}
                            </span>
                          </Heading2>
                          <div className="flex mt-1.5">
                            <span className="text-neutral-400 font-normal">
                              {formatDate(podcast.attributes.premier)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
