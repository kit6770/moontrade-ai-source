import { CallOnIcon, LaunchIcon } from "@/lib/icons";
import TabSetItem from "./TabSetItem";
import classNames from "classnames";
import Loader from "./Loader";
import TwitterItem, { QuoteTwitterItem, ReplyTwitterItem } from "./TwitterItem";
import { KOLTokenInfo } from "@/types";
import { X as XIcon } from "@mui/icons-material";
import { CopyText } from "./Common";
import { formatAddress } from "@/lib/utils";
import dayjs from "dayjs";
import {
  useSelectedFilter,
  useSelectedKOL,
  useTwitterByUid,
} from "@/hooks/useKOL";
import { useEffect } from "react";
import { Chip } from "@mui/material";

const DATA_TYPE_LIST = [
  {
    key: "calls",
    name: "Recent calls",
    icon: <CallOnIcon className="scale-[1.5] text-[#000]" />,
  },
  { key: "twitter", name: "X(Twitter)", icon: <XIcon /> },
];
export default function SelectedKOLSide({ type }: { type: "watch" | "kol" }) {
  const { dataType, setDataType } = useSelectedFilter(type);

  useEffect(() => {
    if (dataType === null) {
      setDataType("calls");
    }
  }, [dataType]);

  return (
    <div className="flex-1 flex flex-col rounded-b-[20px] px-[16px] bg-white">
      <div className="flex flex-row gap-[16px] sticky top-0 py-[16px] bg-white z-[3]">
        {DATA_TYPE_LIST?.map((item) => {
          return (
            <div
              key={item?.key}
              onClick={() => {
                console.log("change to ", item?.key);
                setDataType(item?.key);
              }}
            >
              <TabSetItem
                name="KOL-data-type-tab"
                value={item?.key}
                icon={
                  <div className="h-[36px] flex items-center">{item?.icon}</div>
                }
                defaultChecked={dataType === item?.key}
              />
            </div>
          );
        })}
      </div>
      {dataType === "calls" && <CallListContent type={type} />}
      {dataType === "twitter" && <TwitterListContent type={type} />}
    </div>
  );
}

function TwitterListContent({ type }: { type: "watch" | "kol" }) {
  const { selectedInfo } = useSelectedKOL(type);
  const { data: twitterData, isLoading } = useTwitterByUid(
    selectedInfo?.user_id
  );

  return (
    <div className="w-full h-full bg-[white] flex flex-col relative z-[1]">
      <div className={classNames("flex flex-col gap-[16px] min-h-[160px]")}>
        {twitterData?.map((item) => {
          if (item?.related_tweets && item?.related_tweets?.length > 0) {
            if (item?.related_tweets?.length === 1) {
              if (item?.related_tweets?.[0]?.type === "replied_to") {
                return <ReplyTwitterItem key={item?.id} {...item} />;
              } else {
                return <QuoteTwitterItem key={item?.id} {...item} />;
              }
            } else {
              return <QuoteTwitterItem key={item?.id} {...item} />;
            }
          } else {
            return <TwitterItem key={item?.id} {...item} />;
          }
        })}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

function CallListContent({ type }: { type: "watch" | "kol" }) {
  const { selectedInfo } = useSelectedKOL(type);

  return (
    <div className="w-full flex flex-col relative">
      <div
        className={classNames("w-full flex flex-col gap-[16px] min-h-[200px]")}
      >
        {(selectedInfo?.token_info || [])?.map((item: KOLTokenInfo) => {
          return <CallItem key={item?.token_address} {...item} />;
        })}
      </div>
    </div>
  );
}

function CallItem(props: KOLTokenInfo) {
  return (
    <div className="flex flex-col gap-[16px] border-b-[1px] pb-[16px] border-[#DDDDDD] last:border-0">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[40px] h-[40px] rounded-full bg-[gray]">
            <img
              src={props?.logo}
              className="w-[40px] h-[40px] rounded-full"
              alt={props?.name}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[16px] font-semibold">{props?.name}</div>
              <Chip
                label="Meme"
                sx={{
                  height: "18px",
                  backgroundColor: "#E0F8EB",
                  "&.MuiChip-root": { borderRadius: "6px" },
                  "&.MuiChip-root .MuiChip-label": { padding: "2px 4px" },
                }}
              />
              <LaunchIcon />
            </div>
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[12px] text-[#666]">
                {formatAddress(props?.token_address)}
              </div>
              <CopyText text={""} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="text-[16px] font-semibold">449.21M</div>
          <div className="text-[12px]">MarkCap</div>
        </div>
      </div>
      <div className="rounded-[8px] p-[12px] bg-[#F8F9F4] text-[12px] flex flex-col gap-[16px]">
        <div className="flex flex-row items-center justify-between">
          <div>Price (SOL)</div>
          <div>
            Current Price: <span className="font-bold">0.04678</span>
          </div>
        </div>
        <div className="w-full flex flex-row gap-[10px]">
          <div className="flex-[2] flex flex-col">
            <div>Call Time</div>
            <div>{dayjs(props?.call_time).format("YYYY.MM.DD hh:mma")}: </div>
            <div className="text-[14px] font-bold">0.01706</div>
          </div>
          <div className="flex-[2] flex flex-col">
            <div>Peak Time</div>
            <div>2024.10.08 08:52am: </div>
            <div className="text-[14px] font-bold">0.05845</div>
          </div>
          <div className="flex-[1] flex flex-col">
            <div>Increase: </div>
            <div className="text-[#00B953] text-[14px] font-bold">+21%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
