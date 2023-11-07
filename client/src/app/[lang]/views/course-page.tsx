/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {useMemo, useState} from "react";

import {FaFileSignature, FaRegCheckSquare} from "react-icons/fa";
import {GiClockwork, GiPapers} from "react-icons/gi";
import {LiaCertificateSolid} from "react-icons/lia";
import {SiLevelsdotfyi} from "react-icons/si";
import {TbAtom2Filled, TbMessageLanguage} from "react-icons/tb";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {getStrapiMedia} from "@/utils/api-helpers";
import {Heading3, Heading4, Paragraph} from "@/utils/typography";

interface Content {
  title: string;
  description: string;
  cid: string;
  goals: string[];
  course_categories: any;
  authors: any;
}

interface FormTabs {
  [tab: string]: {
    name: string;
    label: string;
    content: any;
  };
}

export default function CoursePage({content}: {content: Content}) {
  const formTabs: FormTabs = useMemo(() => {
    return {
      overview: {
        name: "overview",
        label: "Overview",
        content: <Overview data={content} />,
      },
      instructors: {
        name: "instructors",
        label: "Instructors",
        content: <Instructors data={content} />,
      },
      information: {
        name: "information",
        label: "Information",
        content: <Information />,
      },
      curriculam: {
        name: "curriculam",
        label: "Curriculam",
        content: <Curriculam />,
      },
    };
  }, [content]);

  const tabList = useMemo(() => Object.keys(formTabs), [formTabs]);
  const [activeTab, setActiveTab] = useState(tabList[0]);

  const activeTabIndex = useMemo(
    () => tabList.indexOf(activeTab),
    [activeTab, tabList]
  );

  return (
    <div className="wwt-content container relative pt-6 container-sm:pt-10 pb-16 container-lg:pt-20 container-lg:pb-28">
      <div className="p-5 mx-auto bg-white rounded-xl container-sm:rounded-3xl container-lg:rounded-[40px] shadow-lg container-sm:p-10 container-lg:p-16 ">
        <div className="grid grid-cols-12 gap-[30px]">
          {/*Content  */}
          <div className="container-lg:col-span-12 col-span-12">
            <div>
              <div>
                <Tabs defaultValue={tabList[0]} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full p-1">
                    {tabList.map((tab, i) => (
                      <TabsTrigger key={tab} value={tab}>
                        <span
                          className={`flex justify-center py-4
                       ${
                         i === activeTabIndex &&
                         "bg-white rounded-full shadow text-indigo-900"
                       }
                      
                      `}
                        >
                          {formTabs[tab].label}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="flex-1">
                    <div className="rounded-xl   container-md:p-6">
                      <div className="wwt-content prose container-lg:prose-lg !max-w-screen-md mx-auto ">
                        {tabList.map((tab, i) => (
                          <TabsContent key={i} value={tabList[i]}>
                            {formTabs[tab].content}
                          </TabsContent>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview({data}: {data: Content}) {
  return (
    <>
      <div>
        <div>
          <Heading3 className=" text-2xl">Course Description</Heading3>
          <Paragraph className="mt-4">{data.description}</Paragraph>

          {/* Goals */}
          <div className="bg-[#F8F8F8] space-y-6 p-8 rounded-md my-8">
            <Heading4 className=" text-2xl">Goals</Heading4>
            <ul className=" grid container-sm:grid-cols-2 grid-cols-1 gap-6">
              {data.goals.map((goal, i) => (
                <li key={i} className=" flex space-x-3">
                  <div className="flex-none  relative top-1 ">
                    <FaRegCheckSquare />
                  </div>
                  <div className="flex-1">{goal}</div>
                </li>
              ))}
            </ul>
          </div>
          {/* Course Categories */}
          <div>
            <div className="grid container-lg:grid-cols-3 container-sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
              {data.course_categories.data.map((category: any, i: number) => (
                <div
                  key={i}
                  className=" bg-white  rounded px-5 py-[18px] flex shadow-xl space-x-[10px] items-center"
                >
                  <span className="flex-none  ">
                    <TbAtom2Filled
                      className="
                                            h-10 w-10 text-[#2cbcac]
                                          "
                    />
                  </span>
                  <div className="flex-1 text-black">
                    {category.attributes.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Instructors({data}: {data: Content}) {
  return (
    <>
      <div className="grid grid-cols-1 container-sm:grid-cols-2 container-lg:grid-cols-3 gap-6 container-md:gap-8 mt-8">
        {data.authors.data.map((author: any) => {
          const avatarUrl = getStrapiMedia(
            author.attributes.avatar.data.attributes.url
          );

          return (
            <div
              key={author.id}
              className="relative flex group items-center p-3 rounded-3xl border border-neutral-200 bg-white  h-full"
            >
              {/* Image */}
              <div className="w-1/4 flex-shrink-0">
                <div className="block h-0 aspect-w-1 aspect-h-1 relative rounded-full overflow-hidden shadow-lg">
                  {avatarUrl && (
                    <img
                      alt="author"
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="object-cover w-full h-full"
                      sizes="100px"
                      src={avatarUrl}
                    />
                  )}
                </div>
              </div>
              {/* Details */}
              <div className="flex flex-col flex-grow ms-4">
                <Heading4 className="nc-card-title block font-semibold text-sm sm:text-lg">
                  <span title={author.attributes.name}>
                    {author.attributes.name}
                  </span>
                </Heading4>
                <span className="text-xs text-neutral-500  mt-1 ">
                  {" "}
                  {author.attributes.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Information() {
  return (
    <>
      <div className="space-y-[30px]">
        <div className="bg-white  rounded-lg shadow-lg p-8 space-y-5 ">
          <ul className="list  ">
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <GiPapers className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Lectures</div>
              </div>
              <div className="flex-none">23</div>
            </li>
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <GiClockwork className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Duration</div>
              </div>
              <div className="flex-none">2Hr 36Minutes</div>
            </li>
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <FaFileSignature className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Enrolled</div>
              </div>
              <div className="flex-none">2k Students</div>
            </li>
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <SiLevelsdotfyi className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Course level</div>
              </div>
              <div className="flex-none">Intermediate</div>
            </li>
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <TbMessageLanguage className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Language</div>
              </div>
              <div className="flex-none">English</div>
            </li>
            <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex">
                <LiaCertificateSolid className="text-[#2cbcac] h-5 w-5" />
                <div className=" text-black font-semibold">Certificate</div>
              </div>
              <div className="flex-none">Yes</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function Curriculam() {
  return (
    <>
      <Heading4>Coming Soon</Heading4>
    </>
  );
}
