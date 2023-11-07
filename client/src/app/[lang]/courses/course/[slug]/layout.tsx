/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {Toaster} from "@/components/ui/toast";

import {fetchAPI} from "@/utils/fetch-api";

async function getCourseHeader(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/courses`;
  const urlParamsObject = {
    filters: {slug},
    populate: {
      cover: {fields: ["url"]},
      authors: {populate: "*"},
    },
  };
  const options = {headers: {Authorization: `Bearer ${token}`}};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export default async function layout({
  params,
  children,
}: {
  params: {slug: string};
  children: React.ReactNode;
}) {
  const {slug} = params;
  const data = await getCourseHeader(slug);
  if (data.data.length === 0) return <h2>no courses found</h2>;

  return (
    <>
      {children}

      <Toaster />
    </>
  );
}
