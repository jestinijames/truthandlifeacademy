/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import CoursePage from "@/views/course-page";
import type {Metadata} from "next";

import CoursePageLayout from "@/components/ui/course-page-layout";

import {getStrapiMedia} from "@/utils/api-helpers";
import {fetchAPI} from "@/utils/fetch-api";

async function getCourseBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/courses`;
  const urlParamsObject = {
    filters: {slug},
    populate: {
      cover: {fields: ["url"]},
      authors: {populate: "*"},
      course_categories: {fields: ["name"]},
      goals: {populate: "*"},
      cid: {populate: "*"},
    },
  };
  const options = {headers: {Authorization: `Bearer ${token}`}};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/courses`;
  const urlParamsObject = {
    filters: {slug},
    populate: {seo: {populate: "*"}},
  };
  const options = {headers: {Authorization: `Bearer ${token}`}};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

// DONT DELEEEEETTEE
// export async function generateMetadata({
//   params,
// }: {
//   params: {slug: string};
// }): Promise<Metadata> {
//   const meta = await getMetaData(params.slug);
//   const metadata = meta[0].attributes.seo;

//   return {
//     title: metadata.metaTitle,
//     description: metadata.metaDescription,
//   };
// }

export default async function CourseRoute({params}: {params: {slug: string}}) {
  const {slug} = params;
  const data = await getCourseBySlug(slug);
  if (data.data.length === 0) return <h2>No Courses Found</h2>;

  const {cover, title} = data.data[0].attributes;
  const coverUrl = getStrapiMedia(cover.data.attributes.url);

  const content = data.data[0].attributes;
  return (
    <CoursePageLayout heading={title} imageCoverUrl={coverUrl}>
      <CoursePage content={content} />
    </CoursePageLayout>
  );
}
