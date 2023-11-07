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

import Podcast from "@/views/podcast-list";

import {Button} from "@/components/ui/button";
import Loader from "@/components/Loader";

import {fetchAPI} from "@/utils/fetch-api";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Podcasts() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (start: number, limit: number) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/podcasts`;
        const urlParamsObject = {
          sort: {createdAt: "desc"},
          populate: "*",
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

  function loadMorePodcasts(): void {
    const nextPodcasts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPodcasts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <Podcast data={data}>
      {meta!.pagination.start + meta!.pagination.limit <
        meta!.pagination.total && (
        <div className="flex flex-col mt-12 container-lg:mt-16 space-y-5 container-sm:space-y-0 container-sm:space-x-3 rtl:space-x-reverse container-sm:flex-row container-sm:justify-between container-sm:items-center">
          <Button
            type="button"
            className="text-dark flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent hover:bg-tla-accent hover:text-light bg-white  ring-1 ring-neutral-300 hover:ring-neutral-400  text-sm font-medium py-3 px-4 container-sm:py-3.5 container-sm:px-6  "
            onClick={loadMorePodcasts}
          >
            <span>Load more podcasts...</span>
          </Button>
        </div>
      )}
    </Podcast>
  );
}
