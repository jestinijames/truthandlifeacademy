/* eslint-disable @typescript-eslint/no-unsafe-return */
import {fetchAPI} from "@/utils/fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = `/pages`;
  const urlParamsObject = {filters: {slug}, locale: lang, populate: "*"};
  const options = {headers: {Authorization: `Bearer ${token}`}};
  return await fetchAPI(path, urlParamsObject, options);
}
