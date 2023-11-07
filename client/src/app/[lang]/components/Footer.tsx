"use client";

import Link from "next/link";

import LayoutContainer from "@/components/ui/layout-container";

export default function Footer({logoText}: {logoText: string | null}) {
  return (
    <footer className="w-full border-t-2 border-solid font-medium text-lg text-light border-light sm:text-base">
      <LayoutContainer className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span className="flex items-center lg:py-2">{logoText}</span>
        {/* <div className="flex items-center lg:py-2">{logoText}</div> */}
        <Link className="underline underline-offset-2" href="/contact">
          Contact Us
        </Link>
      </LayoutContainer>
    </footer>
  );
}
