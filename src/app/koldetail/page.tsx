"use client";

import {
  CopyText,
  LinkTelegram,
  SearchOnX,
  SummaryCopyRight,
  TagList,
} from "@/components/Common";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { KOLDataInfo } from "../kol/main-content";
import { SummaryIcon } from "@/lib/icons";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import Feeds from "./feeds";

const StyledTabs = styled(
  (props: {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    "aria-label": string;
    children: React.ReactNode;
  }) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
        sx: { height: 4, borderRadius: 4, transform: "translateY(-5px)" },
      }}
    />
  )
)({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#000",
  },
});

const StyledTab = styled((props: { label: string }) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: "20px",
  fontSize: "16px",
  color: "#666",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: "600",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#000",
  },
}));

export default function Koldetail() {
  const [activetTab, setActivetTab] = React.useState<number>(0);

  const data = [
    {
      id: "data-0",
      x1: 329.39,
      x2: 391.29,
      y1: 443.28,
      y2: 153.9,
    },
    {
      id: "data-1",
      x1: 96.94,
      x2: 139.6,
      y1: 110.5,
      y2: 217.8,
    },
    {
      id: "data-2",
      x1: 336.35,
      x2: 282.34,
      y1: 175.23,
      y2: 286.32,
    },
    {
      id: "data-3",
      x1: 159.44,
      x2: 384.85,
      y1: 195.97,
      y2: 325.12,
    },
    {
      id: "data-4",
      x1: 188.86,
      x2: 182.27,
      y1: 351.77,
      y2: 144.58,
    },
    {
      id: "data-5",
      x1: 143.86,
      x2: 360.22,
      y1: 43.253,
      y2: 146.51,
    },
    {
      id: "data-6",
      x1: 202.02,
      x2: 209.5,
      y1: 376.34,
      y2: 309.69,
    },
    {
      id: "data-7",
      x1: 384.41,
      x2: 258.93,
      y1: 31.514,
      y2: 236.38,
    },
    {
      id: "data-8",
      x1: 256.76,
      x2: 70.571,
      y1: 231.31,
      y2: 440.72,
    },
    {
      id: "data-9",
      x1: 143.79,
      x2: 419.02,
      y1: 108.04,
      y2: 20.29,
    },
    {
      id: "data-10",
      x1: 103.48,
      x2: 15.886,
      y1: 321.77,
      y2: 484.17,
    },
    {
      id: "data-11",
      x1: 272.39,
      x2: 189.03,
      y1: 120.18,
      y2: 54.962,
    },
    {
      id: "data-12",
      x1: 23.57,
      x2: 456.4,
      y1: 366.2,
      y2: 418.5,
    },
    {
      id: "data-13",
      x1: 219.73,
      x2: 235.96,
      y1: 451.45,
      y2: 181.32,
    },
    {
      id: "data-14",
      x1: 54.99,
      x2: 434.5,
      y1: 294.8,
      y2: 440.9,
    },
    {
      id: "data-15",
      x1: 134.13,
      x2: 383.8,
      y1: 121.83,
      y2: 273.52,
    },
    {
      id: "data-16",
      x1: 12.7,
      x2: 270.8,
      y1: 287.7,
      y2: 346.7,
    },
    {
      id: "data-17",
      x1: 176.51,
      x2: 119.17,
      y1: 134.06,
      y2: 74.528,
    },
    {
      id: "data-18",
      x1: 65.05,
      x2: 78.93,
      y1: 104.5,
      y2: 150.9,
    },
    {
      id: "data-19",
      x1: 162.25,
      x2: 63.707,
      y1: 413.07,
      y2: 26.483,
    },
    {
      id: "data-20",
      x1: 68.88,
      x2: 150.8,
      y1: 74.68,
      y2: 333.2,
    },
    {
      id: "data-21",
      x1: 95.29,
      x2: 329.1,
      y1: 360.6,
      y2: 422.0,
    },
    {
      id: "data-22",
      x1: 390.62,
      x2: 10.01,
      y1: 330.72,
      y2: 488.06,
    },
  ];

  return (
    <div className="h-screen flex flex-col lg:w-[960px] px-[10px] mx-auto gap-[16px] pt-[20px] overflow-auto">
      <div className="flex flex-row items-center gap-[8px]">
        <div className="w-[20px] h-[20px] rounded-full border-[1px] border-[#000] flex items-center justify-center">
          <ArrowBackIosNewOutlinedIcon sx={{ width: "12px", height: "12px" }} />
        </div>
        <div className="text-[20px] font-semibold text-[#000]">Back</div>
      </div>
      {/* basci info */}
      <div className="flex flex-col gap-[16px] p-[16px] border-[1px] border-[#F1F1F1] rounded-[20px] bg-[white]">
        <div className="flex flex-row items-center gap-[8px]">
          <div className="w-[80px] h-[80px] rounded-full bg-[gray]"></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-[6px] text-[#000]">
              <div className="text-[32px] font-bold">Devon</div>
              <div className="">Ultra Sigma · 5VwjS...ump</div>
              <CopyText text={""} />
              <SearchOnX text="" />
              <LinkTelegram link="" />
            </div>
            <div className="flex flex-row items-center gap-[6px] text-[12px] font-semibold text-[#000]">
              <div className="bg-[#E1F3FF] rounded-[6px] p-[6px]">
                Feeds: 289{" "}
                <span className="text-[#00B953] text-[14px]">+26</span>
              </div>
              <TagList tag={['Zoo','Agent','Sci','NFT']} className="h-[30px]"/>
            </div>
          </div>
        </div>
        {/* data info */}
        <KOLDataInfo />
        {/* chart */}
        <ScatterChart
          width={920}
          height={190}
          series={[
            {
              label: "Series A",
              data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
            },
            {
              label: "Series B",
              data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
            },
          ]}
        />
        <hr className="border-[#E4EAC7]" />
        {/* AI Summary */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row items-center gap-[10px]">
            <SummaryIcon />
            <div className="text-[20px] font-semibold text-[#000]">
              AI Summary
            </div>
          </div>
          <div className="text-[14px]">
            按照周期喊meme，几乎是喊完一直涨，并且会持续跟进。
            会列出他认为有潜力的meme榜单，做数据分析，标出涨幅市值等。质量很高，一般喊单时间是在底部，推文简洁，广告很少，推荐的代币跌幅也很低，非常稳，新手老手都推荐。
          </div>
          <SummaryCopyRight />
        </div>
      </div>
      {/* list */}
      <div className="flex flex-col gap-[16px] p-[16px] border-[1px] border-[#F1F1F1] rounded-[20px] bg-[white] relative z-[1]">
        <div className="sticky top-[-20px] bg-white z-[3]">
          <StyledTabs
            value={activetTab}
            onChange={(event, newValue) => setActivetTab(newValue)}
            aria-label="styled tabs example"
          >
            <StyledTab label="Top Mention (63)" />
            <StyledTab label="Feeds" />
          </StyledTabs>
        </div>
        {activetTab === 0 && <div></div>}
        {activetTab === 1 && <Feeds />}
      </div>
    </div>
  );
}
