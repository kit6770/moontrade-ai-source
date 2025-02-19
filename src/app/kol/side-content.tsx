import React from "react";
import useSWR from "swr";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import TopMention from "@/components/TopMention";
import FollowingTrend from "../../components/FollowingTrend";
import classNames from "classnames";
import SelectedKOLSide from "@/components/SelectedKOLSide";

export default function KOLRankSideContent() {
  const isMobile = getPlatformInfo()?.isMobile;
  const { data: selectedKOL } = useSWR("selectedKOL");
  const { data: selectedKOLInfo } = useSWR("selectedKOLInfo");

  return (
    <aside
      className={classNames(
        "flex flex-none flex-col justify-between md:w-[452px] rounded-[20px] shadow-md border-[2px] border-dashed overflow-hidden hover:overflow-auto",
        selectedKOL ? "border-[#555F32]" : "border-[transparent]"
      )}
      style={{
        height: isMobile ? "h-full" : `calc(100vh - 155px)`,
        background: "linear-gradient(360deg, #FFFFFF 67.91%, #F9FFE4 100%)",
        boxShadow: "0px 6px 0px 0px #C8FF00 inset",
      }}
    >
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex flex-col mt-[5px] gap-[10px] rounded-[20px] px-[16px] py-[12px]">
          <h4 className="text-[20px] font-semibold">
            {selectedKOL &&
            selectedKOLInfo &&
            JSON.parse(selectedKOLInfo) &&
            JSON.parse(selectedKOLInfo)?.name
              ? `${JSON.parse(selectedKOLInfo)?.name}‘s AI Summary`
              : "what‘s up today"}
          </h4>
          <div className="text-[16px] font-bold">
            Latest Buzz in the Past 24 Hours:
          </div>
          <div className="flex flex-col text-[14px]">
            The relationship between Tesla and OpenAI has sparked widespread
            discussion Meme coin ICOs on the Bitcoin network have attracted
          </div>
        </div>
        {!selectedKOL && (
          <div className="my-[10px] flex flex-col gap-[20px]">
            <TopMention />
            <FollowingTrend />
          </div>
        )}
        {selectedKOL && <SelectedKOLSide type="kol"/>}
      </div>
      {selectedKOL && <div className="w-full px-[16px] leading-[48px]">
        <div className="text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]">
          Learn more
        </div>
      </div>}
    </aside>
  );
}

