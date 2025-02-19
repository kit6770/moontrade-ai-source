"use client";

import SideContent from "./side-content";
import MainContent from "./main-content";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import useSWR from "swr";
import CatorgyItem from "@/components/CatorgyItem";

export default function Home() {
  const isMobile = getPlatformInfo()?.isMobile;
  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[20px]">
      <TabSet />
      <section className="flex flex-row justify-start items-start">
        <MainContent />
        {!isMobile ? <SideContent /> : null}
      </section>
    </div>
  );
}

function TabSet() {
  const { data: timeType } = useSWR("timeType");
  const { trigger: updateTimeType } = useSWRMutation<string>("timeType");

  useEffect(() => {
    if (timeType === null) {
      updateTimeType("5m");
    }
  }, [timeType]);

  return (
    <div className="flex flex-row justify-between gap-[19px] h-[48px] leading-[48px]">
      <div className="flex flex-auto flex-row justify-between items-stretch bg-white rounded-[12px] p-[4px] gap-[4px]">
        {["5m", "1h", "6h", "24h"]?.map((item) => (
          <CatorgyItem
            key={item}
            value={item}
            name={item}
            defaultChecked={timeType === item}
            onChange={(value) => updateTimeType(value)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center bg-[#F6F6F6] lg:w-[175px] px-[10px] rounded-[12px] opacity-50">
        <div className="w-full text-center text-[16px] text-black font-semibold opacity-50 cursor-not-allowed">
          Filter
        </div>
      </div>
    </div>
  );
}
