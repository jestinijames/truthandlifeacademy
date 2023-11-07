/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {useMemo, useState} from "react";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {LuCheck, LuChevronsUpDown} from "react-icons/lu";

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

import {getStrapiMedia} from "@/utils/api-helpers";
import {cn} from "@/utils/tailwind-helpers";
import {Heading2, Heading3} from "@/utils/typography";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    course: {
      data: Array<object>;
    };
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface Course {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    goals: JSON;
    cid: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    course_categories: any;
    authors: {
      data: any;
    };
  };
}

export default function CourseList({
  data: courses,
  categories,
  setSelectedCategory,
  children,
}: {
  data: Course[];
  categories: Category[];
  setSelectedCategory: any;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleCategorySelect(
    event: React.MouseEvent<HTMLAnchorElement>,
    category: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedCategory(category);
  }

  function HandleCourseSelect(course: string) {
    setValue(course);
    setOpen(false);
    const cleanURLString = course.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    router.push(`/courses/course/${cleanURLString}`);
  }

  const allCourses = useMemo(() => {
    return courses.map((course) => ({
      value: course.attributes.slug,
      label: course.attributes.title ? course.attributes.title : "N/A",
    }));
  }, [courses]);

  const allImageUrl =
    categories[0] &&
    getStrapiMedia(categories[0].attributes.image.data.attributes.url);

  return (
    <>
      {/* Courses List Container */}
      <div className="container py-16 container-lg:py-28 space-y-16 container-lg:space-y-28">
        <div className="relative py-16">
          <div className="absolute inset-y-0 w-screen container-xl:max-w-[1340px] container-2xl:max-w-[1536px] left-1/2 transform -translate-x-1/2 container-xl:rounded-[40px] z-0 bg-neutral-100 ">
            <span className="sr-only hidden">bg</span>
          </div>
          {/* This is the filter toolbar */}
          <div className="mt-16 flex flex-col container-sm:items-center container-sm:justify-between container-sm:flex-row">
            {/* Categories */}
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-dark hover:ring-3 hover:bg-white flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  ">
                        <span className="sr-only">Other Categories</span>
                        <div>
                          <span className="hidden container-sm:inline">
                            Other
                          </span>{" "}
                          Categories
                        </div>
                        <LuChevronsUpDown className="w-4 h-4 ms-2 -me-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className=" max-w-[1280px] inline-block w-full my-5 overflow-hidden text-left align-middle transition-all bg-white border border-black border-opacity-5 shadow-xl rounded-2xl container-sm:my-8  text-neutral-900   opacity-100 scale-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {/* Header */}
                      <div className="py-4 px-6 text-center relative border-b border-neutral-100  container-md:py-5">
                        <Heading3 className="text-base font-semibold text-neutral-900 container-lg:text-xl  mx-10">
                          Discover other Categories
                        </Heading3>
                      </div>
                      {/* Body */}
                      <div className="py-4 px-6 container-md:py-5">
                        <div className="grid gap-6 container-sm:grid-cols-2 container-sm:py-2 container-md:gap-8 container-md:grid-cols-3 container-lg:grid-cols-4 container-xl:md:grid-cols-5">
                          <Link
                            href="#"
                            className="flex items-center "
                            onClick={(event) => {
                              handleCategorySelect(
                                event,
                                categories[0].attributes.slug
                              );
                            }}
                          >
                            <div className="relative flex-shrink-0 w-12 h-12 rounded-lg me-4 overflow-hidden">
                              {allImageUrl && (
                                <img
                                  alt={categories[0].attributes.name}
                                  className=" object-cover w-full h-full rounded-3xl  "
                                  src={allImageUrl}
                                />
                              )}
                            </div>
                            <div>
                              <Heading2 className="text-neutral-900  text-sm container-sm:text-base font-medium container-sm:font-semibold">
                                All
                              </Heading2>
                              {/* <span className="text-xs block mt-[2px] text-neutral-500 ">
                                ({categories.length}) Courses
                              </span> */}
                            </div>
                          </Link>
                          {categories.map(
                            (category: Category, index: number) => {
                              const imageUrl = getStrapiMedia(
                                category.attributes.image.data.attributes.url
                              );
                              return (
                                <Link
                                  key={index}
                                  href="#"
                                  className="flex items-center "
                                  onClick={(event) => {
                                    handleCategorySelect(
                                      event,
                                      categories[0].attributes.slug
                                    );
                                  }}
                                >
                                  <div className="relative flex-shrink-0 w-12 h-12 rounded-lg me-4 overflow-hidden">
                                    {imageUrl && (
                                      <img
                                        alt={category.attributes.name}
                                        className=" object-cover w-full h-full rounded-3xl  "
                                        src={imageUrl}
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <Heading2 className="text-neutral-900  text-sm container-sm:text-base font-medium container-sm:font-semibold">
                                      {category.attributes.name}
                                    </Heading2>
                                    {/* <span className="text-xs block mt-[2px] text-neutral-500 ">
                                      ({category.attributes.course.data.length}){" "}
                                      Courses
                                    </span> */}
                                  </div>
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            {/* Some Line */}
            <div className="block my-4 border-b w-full border-neutral-500 container-sm:hidden" />
            {/* Search By */}
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
                            ? allCourses.find(
                                (cou) => cou.label.toLowerCase() === value
                              )?.label
                            : "Select Course..."}
                          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  text-sm text-dark bg-light">
                        <Command>
                          <CommandInput placeholder="Search courses..." />
                          <CommandEmpty>No courses found.</CommandEmpty>
                          <CommandGroup>
                            {allCourses.map((cou) => (
                              <CommandItem
                                key={cou.value}
                                className="hover:bg-tla-accent hover:text-white hover:font-semibold"
                                onSelect={(currentValue) => {
                                  currentValue === value
                                    ? HandleCourseSelect("")
                                    : HandleCourseSelect(currentValue);
                                }}
                              >
                                <LuCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === cou.label.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {cou.label}
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
          {/* Courses list */}
          <div className="grid container-sm:grid-cols-2 container-lg:grid-cols-3 container-xl:grid-cols-4 gap-6 container-md:gap-8 mt-8 container-lg:mt-10">
            {courses.map((course) => {
              const imageUrl = getStrapiMedia(
                course.attributes.cover.data.attributes.url
              );

              const authors = course.attributes.authors;
              const categs = course.attributes.course_categories;
              return (
                <div
                  key={course.id}
                  className="relative flex flex-col group rounded-3xl overflow-hidden  h-full"
                >
                  <Link
                    href={`/courses/course/${course.attributes.slug}`}
                    className="flex items-start relative w-full aspect-w-5 aspect-h-5"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      {imageUrl && (
                        <img
                          alt="courseCover"
                          className=" object-cover w-full h-full rounded-3xl  "
                          src={imageUrl}
                          sizes="(max-width: 600px) 480px, 800px"
                        />
                      )}
                    </div>
                    <span
                      className="absolute inset-0 bg-black bg-opacity-40 
                     hover:bg-opacity-60 transition-colors duration-300
                    "
                    >
                      <div className=" absolute top-4 end-4" />
                    </span>
                  </Link>
                  {/* Categs */}
                  <div className="absolute top-4 inset-x-4 container-sm:top-5 container-sm:inset-x-5">
                    <div className="flex flex-wrap space-x-2">
                      {categs.data.map((categ: any) => {
                        return (
                          <span
                            key={categ.id}
                            className="m-1 transition-colors hover:text-white duration-300 inline-flex rounded-full font-medium text-xs px-3 py-[6px] text-blue-800 bg-blue-100 hover:bg-blue-800"
                          >
                            {categ.attributes.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {/* Text */}
                  <div className="absolute bottom-4 inset-x-4 container-sm:bottom-5 container-sm:inset-x-5 flex flex-col flex-grow">
                    <Heading2 className="block text-base font-semibold text-white">
                      <Link
                        className="line-clamp-2"
                        title={course.attributes.title}
                        href={`/courses/course/${course.attributes.slug}`}
                      >
                        {course.attributes.title}
                      </Link>
                    </Heading2>
                    <div className="p-2 container-sm:p-2.5 mt-4 container-sm:mt-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full flex items-center text-neutral-50 text-xs container-sm:text-sm font-medium">
                      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                        {authors.data.map((author: any) => {
                          const avatarUrl = getStrapiMedia(
                            author.attributes.avatar.data.attributes.url
                          );
                          return (
                            <div
                              key={author.id}
                              className="relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-2 ring-white"
                            >
                              {avatarUrl && (
                                <img
                                  alt="author"
                                  loading="lazy"
                                  decoding="async"
                                  data-nimg="fill"
                                  className="absolute inset-0 w-full h-full object-cover"
                                  sizes="100px"
                                  src={avatarUrl}
                                />
                              )}
                            </div>
                          );
                        })}
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
