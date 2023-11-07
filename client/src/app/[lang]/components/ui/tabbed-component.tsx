/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useMemo, useState} from "react";

import {FaArrowLeftLong, FaArrowRightLong, FaRegStar} from "react-icons/fa6";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface Tab {
  label: string;
  content: React.ReactNode;
  name: string;
  icon?: any;
}

interface TabbedProps {
  tabs: Record<string, Tab>;
  tabsToRender?: string[];
}

export function TabbedComponent({tabs, tabsToRender}: TabbedProps) {
  const tabList = tabsToRender ?? Object.keys(tabs);
  const maxTabs = tabList.length - 1;

  const [activeTab, setActiveTab] = useState(tabList[0]);

  const activeTabIndex = useMemo(
    () => tabList.indexOf(activeTab),
    [activeTab, tabList]
  );

  const tabsContent = useMemo(
    () =>
      Object.values(tabs).map((tab, i) => (
        <TabsContent key={i} value={tabList[i]}>
          {tab.content}
        </TabsContent>
      )),
    [tabList, tabs]
  );

  return (
    <Card>
      <Tabs defaultValue={tabList[0]} asChild onValueChange={setActiveTab}>
        <CardHeader>
          <CardTitle>Our Beliefs from scripture</CardTitle>
          <TabsList
            className="flex max-w-fit items-center justify-start overflow-x-auto"
            aria-label="Tabs list header"
            aria-description="Use the left and right arrow keys to navigate between tabs. Press the tab key to move to the next tab. Press the shift and tab keys together to move to the previous tab."
          >
            {tabList.map((tab) => {
              const Icon = tabs[tab].icon ?? FaRegStar;

              return (
                <TabsTrigger key={tab} value={tab} className="">
                  <Icon className="mr-2 h-4 w-4" />
                  {tabs[tab].label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <CardDescription>
            Select a tab to view the content for that tab.
          </CardDescription>
        </CardHeader>
        <CardContent>{tabsContent}</CardContent>
        <CardFooter>
          <TabsList className="flex w-full flex-row justify-end gap-x-4 border-0 bg-transparent">
            {activeTabIndex !== 0 && (
              <TabsTrigger
                value={
                  activeTabIndex === 0
                    ? tabList[0]
                    : tabList[activeTabIndex - 1]
                }
                asChild
              >
                <Button type="button" variant="secondary">
                  <span className="sr-only">Previous page</span>
                  <FaArrowLeftLong className="mr-2" />
                  Previous
                </Button>
              </TabsTrigger>
            )}
            {activeTabIndex !== maxTabs && (
              <TabsTrigger
                value={
                  activeTabIndex === maxTabs
                    ? tabList[tabList.length - 1]
                    : tabList[activeTabIndex + 1]
                }
                asChild
              >
                <Button type="button">
                  Next
                  <FaArrowRightLong className="ml-2" />
                  <span className="sr-only">Next page</span>
                </Button>
              </TabsTrigger>
            )}
          </TabsList>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
