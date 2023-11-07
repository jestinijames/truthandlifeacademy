/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type {Metadata} from "next";

import "@/globals.css";

import {MenuContextProvider} from "@/context/menu.context";
import {i18n} from "@/i18n-config";
import {Montserrat} from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import {getStrapiMedia, getStrapiURL} from "@/utils/api-helpers";
import {FALLBACK_SEO} from "@/utils/constants";
import {fetchAPI} from "@/utils/fetch-api";
import RouteTransition from "@/utils/route-transition";
import {ThemeProvider} from "@/utils/theme-provider";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = {headers: {Authorization: `Bearer ${token}`}};

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "topLeftImage",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "navbar.navbarLogo.plainLogo",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

const mont = Montserrat({subsets: ["latin"]});

export async function generateMetadata({
  params,
}: {
  params: {lang: string};
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const {metadata, favicon} = meta.data.attributes;
  const {url} = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {lang: string};
}) {
  const global = await getGlobal(params.lang);

  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) {
    return null;
  }

  const {navbar, footer, topLeftImage} = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  // Main background images
  const topLeftImageUrl = getStrapiMedia(topLeftImage.data.attributes.url);

  return (
    <html lang={params.lang}>
      <body className={mont.className}>
        <MenuContextProvider>
          <ThemeProvider defaultTheme="light">
            <RouteTransition>
              <Header
                topLeftImageUrl={topLeftImageUrl}
                navbarLogoUrl={navbarLogoUrl}
                links={navbar.links}
                socialLinks={footer.socialLinks}
                lang={params.lang}
              />
              <main className="w-full min-h-screen">{children}</main>
              <Footer logoText={footer.footerLogo.logoText} />
            </RouteTransition>
          </ThemeProvider>
        </MenuContextProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({lang: locale}));
}
