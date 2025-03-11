"use client";

import React from "react";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import TabSet from "@/components/Tabset";
import classNames from "classnames";
import { useKOLList, useSelectedKOL } from "@/hooks/useKOL";
import Loader from "@/components/Loader";
import { KOLItem } from "./kol-item";
import KOLRankSideContent from "./kol-sider";

export default function KOLRank() {
  const isMobile = getPlatformInfo()?.isMobile;
  const { data: KOLList, isLoading } = useKOLList();
  const { setSelected, setSelectedInfo } = useSelectedKOL("kol");

  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[16px] relative">
      <TabSet type="kol" />
      <section className="flex flex-row justify-start items-start">
        <div
          className={classNames(
            "relative flex flex-auto flex-col gap-[10px] pb-[16px] md:pr-[16px] overflow-auto hide-scrollbar",
            isMobile
              ? "h-full"
              : ""
          )}
          style={{ height: `calc(100vh - 144px)` }}
        >
          {KOLList?.map((item, index) => {
            return (
              <div
                key={item?.user_id}
                className="relative"
                onClick={() => {
                  setSelected(item?.user_id);
                  setSelectedInfo(JSON.stringify(item));
                }}
              >
                <KOLItem {...item} index={index} />
              </div>
            );
          })}
          {isLoading && <Loader />}
        </div>
        {!isMobile ? <KOLRankSideContent type="kol" KOLList={KOLList} /> : null}
      </section>
    </div>
  );
}

