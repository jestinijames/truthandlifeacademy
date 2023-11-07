/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {useMemo, useState} from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import PageLayout from "@/components/ui/page-layout";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {getStrapiMedia} from "@/utils/api-helpers";
import {RenderIcon} from "@/utils/render-icon";

interface WhatWeTeachProps {
  data: any;
}

export default function WhatWeTeach({data}: WhatWeTeachProps) {
  const coverImage = getStrapiMedia(data.picture.data.attributes.url) as string;

  const tabList = useMemo(() => Object.keys(data.beliefs), [data.beliefs]);

  const [activeTab, setActiveTab] = useState(tabList[0]);
  const activeTabIndex = useMemo(
    () => tabList.indexOf(activeTab),
    [activeTab, tabList]
  );

  const tabsContent = useMemo(
    () =>
      Object.values(tabList).map((tab: any, i) => (
        <TabsContent key={i} value={tabList[i]}>
          <Markdown
            children={data[data.beliefs[tab].pointer]}
            remarkPlugins={[remarkGfm]}
          />
        </TabsContent>
      )),
    [data, tabList]
  );

  return (
    <div>
      <PageLayout heading="What We Teach" imageCoverUrl={coverImage}>
        <div className="container relative pt-6 container-sm:pt-10 pb-16 container-lg:pt-20 container-lg:pb-28">
          <div className="p-5 mx-auto bg-white rounded-xl container-sm:rounded-3xl container-lg:rounded-[40px] shadow-lg container-sm:p-10 container-lg:p-16 ">
            <div>
              <Tabs defaultValue={tabList[0]} onValueChange={setActiveTab}>
                <div className="flex flex-col space-y-8 container-xl:space-y-0 container-xl:flex-row">
                  {/* Sidebar */}

                  <div className="flex-shrink-0 max-w-xl container-xl:w-80 container-xl:pe-8">
                    <TabsList className="text-base space-y-1 text-neutral-700 ">
                      {tabList.map((tab, i) => (
                        <TabsTrigger
                          key={i}
                          value={tab}
                          className={`px-6 py-3 font-medium rounded-full flex items-center
                          
                          ${
                            i === activeTabIndex
                              ? " bg-neutral-100 text-neutral-900"
                              : "hover:text-neutral-800 hover:bg-neutral-100 "
                          }  `}
                        >
                          <RenderIcon
                            text={data.beliefs[tab].title}
                            className="w-8 me-2 text-lg"
                          />
                          <span> {data.beliefs[tab].title}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <div className="border-t border-neutral-500  container-md:hidden" />
                  {/* Content */}
                  <div className="flex-1">
                    <div className="rounded-xl container-md:border container-md:border-neutral-100  container-md:p-6">
                      <div className="wwt-content prose container-lg:prose-lg !max-w-screen-md mx-auto ">
                        {tabsContent}
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
