"use client";

import SideContent from "./side-content";
import MainContent from "./main-content";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import TabSet from "@/components/Tabset";
import React from "react";

export default function Home() {
  const isMobile = getPlatformInfo()?.isMobile;

  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[16px]">
      <TabSet type="ai" />
      <section className="flex flex-row justify-start items-start">
        <MainContent />
        {!isMobile ? <SideContent /> : <></>}
      </section>
    </div>
  );
}
