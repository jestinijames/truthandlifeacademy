/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {Metadata} from "next";

import {FALLBACK_SEO} from "@/utils/constants";
import {getPageBySlug} from "@/utils/get-page-by-slug";
import {sectionRenderer} from "@/utils/section-renderer";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const page: any = await getPageBySlug(params.slug, params.lang);

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PageRoute({params}: Props) {
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;

  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
