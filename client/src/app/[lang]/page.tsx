/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import LangRedirect from "@/components/LangRedirect";

import {getPageBySlug} from "@/utils/get-page-by-slug";
import {sectionRenderer} from "@/utils/section-renderer";

export default async function RootRoute({params}: {params: {lang: string}}) {
  try {
    const page = await getPageBySlug("home", params.lang);
    if (page.error && page.error.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );

    if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) =>
      sectionRenderer(section, index)
    );
  } catch (error: any) {
    window.alert("Missing or invalid credentials");
  }
}
