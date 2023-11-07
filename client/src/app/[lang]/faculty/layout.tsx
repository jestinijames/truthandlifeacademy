/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/ui/page-layout";

import {getStrapiMedia} from "@/utils/api-helpers";
import {fetchAPI} from "@/utils/fetch-api";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = {headers: {Authorization: `Bearer ${token}`}};

  const urlParamsObject = {
    populate: ["facultyCover"],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {lang: string};
}) {
  const global = await getGlobal(params.lang);
  const {facultyCover} = global.data.attributes;
  const facultyCoverUrl = getStrapiMedia(facultyCover.data.attributes.url);
  return (
    <div>
      <PageLayout heading="Faculty" imageCoverUrl={facultyCoverUrl}>
        {children}
      </PageLayout>
    </div>
  );
}
