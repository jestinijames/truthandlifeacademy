/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {useCallback, useEffect, useState} from "react";

import Article from "@/views/article-list";

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

export default function ArticlesPage({params}: {params: {lang: string}}) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [cover, setCover] = useState<any>("");
  const [isLoading, setLoading] = useState(true);

  const fetchTags = useCallback(
    async (start: number, limit: number) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = "/tags";
        const urlParamsObject = {
          populate: "*",
          pagination: {
            start: start,
            limit: limit,
          },
        };
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const response = await fetchAPI(path, urlParamsObject, options);
        setTags(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setTags]
  );

  const fetchCoverImage = useCallback(
    async (lang: string) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = "/global";
        const options = {headers: {Authorization: `Bearer ${token}`}};
        const urlParamsObject = {
          populate: ["articleCover"],
          locale: lang,
        };
        const response = await fetchAPI(path, urlParamsObject, options);
        const {articleCover} = response.data.attributes;
        const articleCoverUrl = getStrapiMedia(
          articleCover.data.attributes.url
        );
        setCover(articleCoverUrl);
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
        const path = `/articles`;
        const sortOrder = "asc";
        const urlParamsObject = filter
          ? {
              sort: {createdAt: sortOrder},
              populate: {
                cover: {fields: ["url"]},
                tag: {populate: "*"},
                authorsBio: {
                  populate: "*",
                },
              },
              filters: {
                tag: {
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
                tag: {populate: "*"},
                authorsBio: {
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

  function loadMoreArticles(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(
      nextPosts,
      Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
      selectedTag
    );
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT), selectedTag);
    fetchCoverImage(params.lang);
    fetchTags(0, 40);
  }, [selectedTag, fetchData, params.lang, fetchTags, fetchCoverImage]);

  if (isLoading) return <Loader />;

  return (
    <PageLayout heading="Articles" imageCoverUrl={cover}>
      <Article data={data} tags={tags} setSelectedTag={setSelectedTag}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex flex-col mt-12 container-lg:mt-16 space-y-5 container-sm:space-y-0 container-sm:space-x-3 rtl:space-x-reverse container-sm:flex-row container-sm:justify-between container-sm:items-center">
            <Button
              type="button"
              className="text-dark hover:ring-3 hover:bg-white flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  "
              onClick={loadMoreArticles}
            >
              <span>Load more articles...</span>
            </Button>
          </div>
        )}
      </Article>
    </PageLayout>
  );
}
