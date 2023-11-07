/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {useCallback, useEffect, useState} from "react";

import Course from "@/views/course-list";

import {Button} from "@/components/ui/button";
import PageLayout from "@/components/ui/page-layout";
import Loader from "@/components/Loader";

import {getStrapiMedia} from "@/utils/api-helpers";
import {fetchAPI} from "@/utils/fetch-api";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function CoursesPage({params}: {params: {lang: string}}) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cover, setCover] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchCategories = useCallback(
    async (start: number, limit: number) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = "/course-categories";
        const urlParamsObject = {
          populate: "*",
          pagination: {
            start: start,
            limit: limit,
          },
        };
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const response = await fetchAPI(path, urlParamsObject, options);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setCategories]
  );

  const fetchCoverImage = useCallback(
    async (lang: string) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = "/global";
        const options = {headers: {Authorization: `Bearer ${token}`}};
        const urlParamsObject = {
          populate: ["courseCover"],
          locale: lang,
        };
        const response = await fetchAPI(path, urlParamsObject, options);
        const {courseCover} = response.data.attributes;
        const courseCoverUrl = getStrapiMedia(courseCover.data.attributes.url);
        courseCoverUrl && setCover(courseCoverUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setCover]
  );

  const fetchData = useCallback(
    async (start: number, limit: number, filter?: string) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/courses`;
        const sortOrder = "asc";
        const urlParamsObject = filter
          ? {
              sort: {createdAt: sortOrder},
              populate: {
                cover: {fields: ["url"]},
                course_categories: {populate: "*"},
                authors: {
                  populate: "*",
                },
              },
              filters: {
                course_categories: {
                  name: filter,
                },
              },
              pagination: {
                start: start,
                limit: limit,
              },
            }
          : {
              sort: {createdAt: sortOrder},
              populate: {
                cover: {fields: ["url"]},
                course_categories: {populate: "*"},
                authors: {
                  populate: "*",
                },
              },
              pagination: {
                start: start,
                limit: limit,
              },
            };
        const options = {headers: {Authorization: `Bearer ${token}`}};
        const responseData = await fetchAPI(path, urlParamsObject, options);

        if (start === 0) {
          setData(responseData.data);
        } else {
          setData((prevData: any[]) => [...prevData, ...responseData.data]);
        }

        setMeta(responseData.meta);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setMeta, setData, setLoading]
  );

  function loadMoreCourses(): void {
    const nextCourses = meta!.pagination.start + meta!.pagination.limit;
    fetchData(
      nextCourses,
      Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
      selectedCategory
    );
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT), selectedCategory);
    fetchCoverImage(params.lang);
    fetchCategories(0, 10);
  }, [
    selectedCategory,
    fetchData,
    params.lang,
    fetchCategories,
    fetchCoverImage,
  ]);

  if (isLoading) return <Loader />;

  return (
    <PageLayout heading="Courses" imageCoverUrl={cover}>
      <Course
        data={data}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      >
        {meta &&
          meta.pagination.start + meta.pagination.limit <
            meta.pagination.total && (
            <div className="flex flex-col mt-12 container-lg:mt-16 space-y-5 container-sm:space-y-0 container-sm:space-x-3 rtl:space-x-reverse container-sm:flex-row container-sm:justify-between container-sm:items-center">
              <Button
                type="button"
                className="text-dark hover:ring-3 hover:bg-white flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  "
                onClick={loadMoreCourses}
              >
                <span>Load more Courses...</span>
              </Button>
            </div>
          )}
      </Course>
    </PageLayout>
  );
}
