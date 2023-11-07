/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import WhatWeTeach from "@/views/what-we-teach";
import WhoWeAre from "@/views/who-we-are";

import Email from "@/components/Email";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.who":
      return <WhoWeAre key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.tabs":
      return <WhatWeTeach key={index} data={section} />;
    default:
      return null;
  }
}
