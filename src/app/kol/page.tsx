"use client";

import CatorgyItem from "@/components/CatorgyItem";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import React from "react";
import KOLRankMainContent from "./main-content";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import KOLRankSideContent from "./side-content";
import { KOLInfo } from "@/types";
import Filter from "@/components/Filter";
import TimeFilter from "@/components/TimeFilter";

export default function KOLRank() {
  const isMobile = getPlatformInfo()?.isMobile;

  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[20px] relative">
      <TabSet />
      <section className="flex flex-row justify-start items-start">
        <KOLRankMainContent />
        {!isMobile ? <KOLRankSideContent /> : null}
      </section>
    </div>
  );
}

function TabSet() {
  const containerRef = useRef(null);
  const { data: kolCatorgy } = useSWR("kolCatorgy");
  const { trigger: updateKolCatorgy } = useSWRMutation<string>("kolCatorgy");
  const { trigger: updatesSelectedKOL } = useSWRMutation<string>("selectedKOL");
  const { trigger: updateSelectedKOLInfo } =
    useSWRMutation<KOLInfo>("selectedKOLInfo");

  const catorgyList = [
    { key: "All", value: "all" },
    { key: "Zoo", value: "zoo" },
    { key: "Art", value: "art" },
    { key: "AI", value: "ai" },
    { key: "Desci", value: "desci" },
    { key: "L1", value: "l1" },
  ];

  const timeList = [
    { value: "last7d", name: "Last 7 Days", simpleName: "Last 7D" },
    { value: "last30d", name: "Last 30 Days", simpleName: "Last 30D" },
  ];
  useEffect(() => {
    if (kolCatorgy === null) {
      updateKolCatorgy("all");
    }
  }, [kolCatorgy]);

  return (
    <div
      className="w-full flex flex-col items-center gap-[16px] relative"
      ref={containerRef}
    >
      <div className="w-full flex flex-row justify-between gap-[19px] h-[48px] leading-[48px]">
        <div className="flex flex-auto flex-row justify-between items-stretch bg-white rounded-[12px] p-[4px] gap-[4px]">
          {catorgyList?.map((item) => (
            <CatorgyItem
              key={item?.key}
              value={item?.value}
              name={item?.key}
              defaultChecked={kolCatorgy === item?.value}
              onChange={(value) => {
                updateKolCatorgy(value);
                updatesSelectedKOL(null);
                updateSelectedKOLInfo(null);
              }}
            />
          ))}
        </div>
        <TimeFilter timeList={timeList} type={"kol"} />
        <Filter containerRef={containerRef} />
      </div>
    </div>
  );
}
