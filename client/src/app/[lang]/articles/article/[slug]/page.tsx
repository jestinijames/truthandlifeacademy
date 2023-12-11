/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

import ArticlePage from "@/views/article-page";
import type {Metadata} from "next";

import ArticlePageLayout from "@/components/ui/article-page-layout";

import {getStrapiMedia} from "@/utils/api-helpers";
import {fetchAPI} from "@/utils/fetch-api";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: {slug},
    populate: {
      cover: {fields: ["url"]},
      authorsBio: {populate: "*"},
      category: {fields: ["name"]},
      blocks: {populate: "*"},
    },
  };
  const options = {headers: {Authorization: `Bearer ${token}`}};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: {slug},
    populate: {seo: {populate: "*"}},
  };
  const options = {headers: {Authorization: `Bearer ${token}`}};
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: {slug: string};
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function ArticleRoute({params}: {params: {slug: string}}) {
  const {slug} = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no articles found</h2>;

  const {cover, title, authorsBio, publishedAt} = data.data[0].attributes;
  const coverUrl = getStrapiMedia(cover.data.attributes.url);
  const author = authorsBio.data.attributes;
  const authorImgUrl = getStrapiMedia(
    authorsBio.data.attributes.avatar.data.attributes.url
  );

  const content = data.data[0].attributes.blocks[0].content;
  return (
    <ArticlePageLayout
      heading={title}
      imageCoverUrl={coverUrl}
      publishedAt={publishedAt}
      authorName={author.name}
      authorImgUrl={authorImgUrl}
    >
      <ArticlePage content={content} />
    </ArticlePageLayout>
  );
}
