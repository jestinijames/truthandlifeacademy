/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {useContext} from "react";

import {MenuContext} from "@/context/menu.context";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ContactModal from "@/components/contact-modal";

import {RenderIcon} from "@/utils/render-icon";
import {Heading3, Paragraph} from "@/utils/typography";

// icons

interface NavLink {
  spacing: boolean;
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  description: string;
}
export interface SocialLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface HeaderProps {
  topLeftImageUrl: any;
  navbarLogoUrl: any;
  links: Array<NavLink>;
  socialLinks: Array<SocialLink>;
  lang: string;
  children?: React.ReactNode;
}

function Header({
  topLeftImageUrl,
  navbarLogoUrl,
  links,
  socialLinks,
  lang,
}: HeaderProps) {
  return (
    <header
      className="
     text-white"
    >
      <TopImageURL topLeftImageUrl={topLeftImageUrl} />
      <TopNavBar
        navbarLogoUrl={navbarLogoUrl}
        links={links}
        lang={lang}
        socialLinks={socialLinks}
      />
      {/* <SideNavBar socialLinks={socialLinks} /> */}
    </header>
  );
}

export default Header;

function TopImageURL({topLeftImageUrl}: {topLeftImageUrl: any}) {
  return (
    <div
      className="absolute top-0 left-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-50"
      style={{backgroundImage: `url(${topLeftImageUrl})`}}
    >
      <Image
        src={topLeftImageUrl}
        alt="top-left-image"
        width={400}
        height={400}
      />
    </div>
  );
}

function TopNavBar({
  navbarLogoUrl,
  links,
  lang,
  socialLinks,
}: {
  navbarLogoUrl: any;
  links: Array<NavLink>;
  lang: string;
  socialLinks: Array<SocialLink>;
}) {
  const {state, dispatch} = useContext(MenuContext);

  const toggleMenu = () => {
    //setIsOpen(!isOpen);
    dispatch({type: "TOGGLE_MENU"});
  };

  return (
    <div className="w-full px-32 py-8  font-medium flex items-center justify-between relative z-10 lg:px-16 md:px-12 sm:px-8">
      <button
        className="flex-col items-center justify-center md:flex xl:flex  "
        onClick={toggleMenu}
      >
        <span
          className={`bg-light block h-0.5 w-6 transition-all duration-300 ease-out  rounded-sm ${
            state.toggleMenu ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        />
        <span
          className={`bg-light block h-0.5 w-6 transition-all duration-300 ease-out  rounded-sm my-0.5 ${
            state.toggleMenu ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-light block h-0.5 w-6 transition-all duration-300 ease-out  rounded-sm ${
            state.toggleMenu ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        />
      </button>

      <SideNavBar links={links} lang={lang} className="3xl:hidden" />
      {state.toggleMenu && (
        <MobileNavBar
          logo={navbarLogoUrl}
          links={links}
          lang={lang}
          socialLinks={socialLinks}
          toggleMenu={toggleMenu}
        />
      )}
      <div className="absolute left-[50%] top-2 translate-x-[-50%] ">
        <div className="flex flex-col items-center justify-center mt-2">
          <Link
            className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full border-transparent bg-white  p-3"
            href={"/"}
          >
            <Image
              src={navbarLogoUrl}
              width={228}
              height={40}
              alt="logo"
              priority={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileNavBar({
  logo,
  links,
  lang,
  socialLinks,
  toggleMenu,
}: {
  logo: any;
  links: Array<NavLink>;
  lang: string;
  socialLinks: Array<SocialLink>;
  toggleMenu: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = ({route}: {route: string}) => {
    toggleMenu();
    router.push(route);
  };

  return (
    <motion.div className="relative z-50">
      <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 opacity-100" />
      <div className="fixed inset-y-0 start-0 w-full max-w-sm overflow-y-auto z-50 opacity-100 translate-x-0">
        <div className="flex min-h-full">
          <div className="w-full max-w-sm overflow-hidden transition-all">
            <div className="overflow-y-auto w-full h-full py-2 transition transform shadow-lg ring-1  bg-white  divide-y-2 divide-neutral-100 ">
              {/* Intro, social links, search */}
              <div className="py-6 px-5">
                <Link className="inline-block  flex-shrink-0" href={"/"}>
                  <Image
                    src={logo}
                    width={228}
                    height={40}
                    alt="logo"
                    priority={true}
                  />
                </Link>
                <div className="flex flex-col mt-5 text-slate-600  text-sm">
                  <span>
                    Welcome to Truth and Life Academy, your sanctuary for
                    Christian education, nurturing faith, understanding, and
                    spiritual growth.
                  </span>
                  <div className="flex justify-between items-center mt-4">
                    <nav className="flex space-x-3 text-2xl text-neutral-600  ">
                      {socialLinks.map((link: SocialLink) => {
                        return (
                          <Link
                            key={link.id}
                            rel="noopener noreferrer"
                            href={link.url}
                            title={link.text}
                            className=" w-7 h-7 container-sm:w-8 container-sm:h-8 flex items-center justify-center rounded-full text-xl hover:bg-tla-accent hover:text-white transition-all duration-300
                            "
                          >
                            <div>
                              <RenderIcon
                                className="w-5 h-5"
                                text={link.social}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
                <span className="absolute end-2 top-2 p-1">
                  <Link
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700   hover:bg-neutral-100   focus:outline-none"
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <RenderIcon className="w-5 h-5 " text="CLOSE" />
                  </Link>
                </span>
                <div className="mt-5">
                  {/* Without Form */}
                  <div className="bg-slate-50 text-neutral-700  flex items-center space-x-1 rtl:space-x-reverse py-2 px-4 rounded-xl h-full">
                    <RenderIcon className="w-5 h-5" text="Search" />
                    <input
                      placeholder="Type and press enter"
                      className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
                      type="search"
                    />
                  </div>
                </div>
              </div>
              {/* Main Links */}
              <ul className="flex flex-col py-6 px-2 space-y-1 rtl:space-x-reverse">
                {links.map((link, index) => {
                  const url = link.url === "/" ? "" : "/" + link.url;
                  let linkUrl = "/" + lang + url;
                  linkUrl = linkUrl.replace(/\/\/+/g, "/");
                  return (
                    <li
                      key={index}
                      className={`${
                        pathname === linkUrl ? "text-tla-accent" : ""
                      } text-slate-900
            `}
                    >
                      <Button
                        className={`bg-white flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100  rounded-lg`}
                        onClick={() => {
                          handleRedirect({route: linkUrl});
                        }}
                      >
                        <span className="block w-full">{link.text}</span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SideNavBar({
  links,
  lang,
  className,
}: {
  links: Array<NavLink>;
  lang: string;
  className: string;
}) {
  const pathname = usePathname();
  return (
    <nav
      className={`flex flex-col items-center justify-center gap-y-4 fixed  bottom-0 mt-auto right-[2%] z-50 top-0  w-16 max-w-md h-screen ${className}`}
    >
      <div className="flex w-full flex-col items-center  justify-center gap-y-10   px-0  h-max py-8 bg-white/10 backdrop-blur-sm  text-xl rounded-full">
        {links.map((link: NavLink) => {
          const url = link.url === "/" ? "" : "/" + link.url;
          let linkUrl = "/" + lang + url;
          linkUrl = linkUrl.replace(/\/\/+/g, "/");
          return (
            <HoverCard key={link.id} openDelay={125} closeDelay={50}>
              <HoverCardTrigger asChild>
                <Link
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className={`relative flex items-center group hover:text-tla-accent transition-all duration-300 ${
                    pathname === linkUrl ? "text-tla-accent" : ""
                  }`}
                >
                  <div>
                    <RenderIcon text={link.text} />
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardPortal>
                <HoverCardContent className="max-w-sm bg-light" side="left">
                  <HoverCardArrow />
                  <Heading3 className="text-foreground text-dark">
                    {link.text}
                  </Heading3>
                  <Paragraph className="text-dark">
                    {link.description}
                  </Paragraph>
                </HoverCardContent>
              </HoverCardPortal>
            </HoverCard>
          );
        })}

        <ContactModal>
          <Button
            className={`relative flex items-center group hover:text-tla-accent transition-all duration-300`}
          >
            <div>
              <RenderIcon text="Contact" />
            </div>
          </Button>
        </ContactModal>
      </div>
    </nav>
  );
}

// function TopLayout({
//   navbarLogoUrl,
//   socialLinks,
// }: {
//   navbarLogoUrl: any;
//   socialLinks: Array<SocialLink>;
// }) {
//   return (
//     <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 py-8">
//           <Link href={"/"}>
//             <Image
//               src={navbarLogoUrl}
//               width={228}
//               height={40}
//               alt="logo"
//               priority={true}
//             />
//           </Link>
//           {/* Socials */}
//           <div className="flex items-center gap-x-5 text-lg">
//             {socialLinks.map((link: SocialLink) => {
//               return (
//                 <Link
//                   key={link.id}
//                   rel="noopener noreferrer"
//                   href={link.url}
//                   title={link.text}
//                   target={link.newTab ? "_blank" : "_self"}
//                   className="hover:text-tla-accent transition-all duration-300"
//                 >
//                   <RenderIcon text={link.social} />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
