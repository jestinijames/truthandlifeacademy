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

import {formatDate, getStrapiMedia} from "@/utils/api-helpers";
import {cn} from "@/utils/tailwind-helpers";
import {Heading3, Paragraph} from "@/utils/typography";

interface Tag {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<object>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
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
    Tag: {
      data: {
        attributes: {
          name: string;
          slug: string;
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

export default function ArticlesList({
  data: articles,
  tags,
  setSelectedTag,
  children,
}: {
  data: Article[];
  tags: Tag[];
  setSelectedTag: any;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleTagSelect(
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedTag(tag);
  }

  function HandleArticleSelect(article: string) {
    setValue(article);
    setOpen(false);
    const cleanURLString = article.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    router.push(`/articles/article/${cleanURLString}`);
  }

  const allArticles = useMemo(() => {
    return articles.map((article) => ({
      value: article.attributes.slug,
      label: article.attributes.title ? article.attributes.title : "N/A",
    }));
  }, [articles]);

  return (
    <>
      {/* Articles List Container */}
      <div className="container py-16 container-lg:py-28 space-y-16 container-lg:space-y-28">
        <div className="relative py-16">
          <div className="absolute inset-y-0 w-screen container-xl:max-w-[1340px] container-2xl:max-w-[1536px] left-1/2 transform -translate-x-1/2 container-xl:rounded-[40px] z-0 bg-neutral-100 ">
            <span className="sr-only hidden">bg</span>
          </div>
          {/* This is the filter toolbar */}
          <div className="mt-16 flex flex-col container-sm:items-center container-sm:justify-between container-sm:flex-row">
            {/* Categories and Tags */}
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-dark hover:ring-3 hover:bg-white flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  ">
                        <span className="sr-only">Other Tags</span>
                        <div>
                          <span className="hidden container-sm:inline">
                            Other
                          </span>{" "}
                          Tags
                        </div>
                        <LuChevronsUpDown className="w-4 h-4 ms-2 -me-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="inline-block w-full my-5 overflow-hidden text-left align-middle transition-all   border border-black border-opacity-5 shadow-xl rounded-2xl container-sm:my-8  text-neutral-900  max-w-[768px] opacity-100 scale-100 bg-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {/* Header */}
                      <div className="py-4 px-6 text-center relative border-b border-neutral-100  container-md:py-5">
                        <Heading3 className="text-base font-semibold text-neutral-900 container-lg:text-xl  mx-10">
                          Discover other tags
                        </Heading3>
                      </div>
                      <div className="py-4 px-6 container-md:py-5">
                        <div className="flex flex-wrap ">
                          <Button
                            type="button"
                            className="inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600  py-2 px-3 rounded-lg container-md:py-2.5 container-md:px-4  me-2 mb-2"
                            onClick={(event) => {
                              handleTagSelect(event, "");
                            }}
                          >
                            All
                            <span className="text-xs font-normal">
                              {" "}
                              ({tags.length})
                            </span>
                          </Button>
                          {tags.map((tag: Tag, index: number) => {
                            if (tag.attributes.articles.data.length === 0)
                              return null;

                            return (
                              <Button
                                key={index}
                                type="button"
                                className="inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600  py-2 px-3 rounded-lg container-md:py-2.5 container-md:px-4  me-2 mb-2"
                                onClick={(event) => {
                                  handleTagSelect(event, tag.attributes.name);
                                }}
                              >
                                {tag.attributes.name}
                                <span className="text-xs font-normal">
                                  {" "}
                                  ({tag.attributes.articles.data.length})
                                </span>
                              </Button>
                            );
                          })}
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
                            ? allArticles.find(
                                (art) => art.label.toLowerCase() === value
                              )?.label
                            : "Select Article..."}
                          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  text-sm text-dark bg-light">
                        <Command>
                          <CommandInput placeholder="Search articles..." />
                          <CommandEmpty>No article found.</CommandEmpty>
                          <CommandGroup>
                            {allArticles.map((article) => (
                              <CommandItem
                                key={article.value}
                                onSelect={(currentValue) => {
                                  currentValue === value
                                    ? HandleArticleSelect("")
                                    : HandleArticleSelect(currentValue);
                                }}
                              >
                                <LuCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === article.label.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {article.label}
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
          {/* Articles list */}
          <div className="grid container-sm:grid-cols-2 container-lg:grid-cols-3 container-xl:grid-cols-4 gap-6 container-md:gap-8 mt-8 container-lg:mt-10">
            {articles.map((article) => {
              const imageUrl = getStrapiMedia(
                article.attributes.cover.data.attributes.url
              );
              const authorsBio = article.attributes.authorsBio.data.attributes;
              const avatarUrl = getStrapiMedia(
                authorsBio.avatar.data.attributes.url
              );

              return (
                <div
                  key={article.id}
                  className="relative flex flex-col group rounded-3xl overflow-hidden bg-white h-full"
                >
                  <div className="block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 aspect-w-4 aspect-h-3">
                    <div>
                      <div className="relative w-full h-full">
                        {imageUrl && (
                          <img
                            alt="articleCover"
                            className=" object-cover w-full h-full rounded-3xl  "
                            src={imageUrl}
                          />
                        )}
                        <Link
                          className="block absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
                          href={`/articles/article/${article.attributes.slug}`}
                        />
                      </div>
                    </div>
                  </div>
                  <Link
                    className="absolute inset-0"
                    href={`/articles/article/${article.attributes.slug}`}
                  />
                  <div className="p-4 flex flex-col space-y-3">
                    <div className="inline-flex items-center flex-wrap text-neutral-800  leading-none text-xs">
                      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white ">
                          {avatarUrl && (
                            <img
                              alt="author"
                              className="absolute inset-0 w-full h-full object-cover"
                              src={avatarUrl}
                            />
                          )}

                          <span className="wil-avatar__name">F</span>
                        </div>
                        <span className="block text-neutral-700 hover:text-black  font-medium">
                          {article.attributes.authorsBio.data.attributes.name}
                        </span>
                      </div>
                      <span className="text-neutral-500  mx-[6px] font-medium">
                        ·
                      </span>
                      <span className="text-neutral-500  font-normal">
                        {formatDate(article.attributes.publishedAt)}
                      </span>
                    </div>
                    <h3 className=" block text-base font-semibold text-neutral-900 ">
                      <span
                        className="line-clamp-2"
                        title={article.attributes.title}
                      >
                        {article.attributes.title}
                      </span>
                    </h3>
                    <Paragraph className="block text-sm text-neutral-500 ">
                      {article.attributes.description}
                    </Paragraph>
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
