import { CallOnIcon, CopyIcon } from "@/lib/icons";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import TabSetItem from "./TabSetItem";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Loader from "./Loader";
import TwitterItem, { QuoteTwitterItem, ReplyTwitterItem } from "./TwitterItem";
import { TwitterFeedInfo } from "@/types";
import {
  X as XIcon,
  Check as CheckIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";

const DATA_TYPE_LIST = [
  {
    key: "calls",
    name: "Recent calls",
    icon: <CallOnIcon className="scale-[1.5] text-[#000]" />,
  },
  { key: "twitter", name: "X(Twitter)", icon: <XIcon /> },
];
export default function SelectedKOLSide({ type }: { type: "watch" | "kol" }) {
  const { data: KOLdataType } = useSWR(
    type === "watch" ? "watchKOLdataType" : "KOLdataType",
    { fallbackData: "calls" }
  );
  const { trigger: updateKOLDataType } = useSWRMutation<string>(
    type === "watch" ? "watchKOLdataType" : "KOLdataType"
  );

  return (
    <div className="flex flex-col rounded-[20px] px-[16px]">
      <div className="flex flex-row gap-[16px] sticky top-0 bg-white pt-[16px] z-[3]">
        {DATA_TYPE_LIST?.map((item) => {
          return (
            <TabSetItem
              key={item?.key}
              name="KOL-data-type-tab"
              value={item?.key}
              icon={
                <div className="h-[36px] flex items-center">{item?.icon}</div>
              }
              defaultChecked={KOLdataType === item?.key}
              onChange={() => {
                console.log("change to ", item?.key);
                updateKOLDataType(item?.key);
              }}
            />
          );
        })}
      </div>
      {KOLdataType === "calls" && <CallListContent />}
      {KOLdataType === "twitter" && <TwitterListContent />}
    </div>
  );
}

function TwitterListContent() {
  const tokenAddress = "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump";
  const { trigger: twitterTrigger, isMutating } = useSWRMutation<
    TwitterFeedInfo[]
  >(`api:/trending_tokens/twitter_tweets`);
  let interval: NodeJS.Timeout;

  // const [pageNo, setPageNo] = useState<number>(1)
  const [category, setCategory] = useState<string>("top");
  // const [hasMore, setHasMore] = useState<boolean>(true)
  const [twitterData, setTwitterData] = useState<TwitterFeedInfo[]>([]);

  const getTwitterList = () => {
    twitterTrigger({
      method: "POST",
      body: JSON.stringify({
        token_address: tokenAddress,
        category,
        offset: 0, //pageNo - 1,
        limit: 50,
      }),
    }).then((list) => {
      if (list && list.length > 0) {
        // const newData = twitterData.concat(list || [])
        const newData = list;
        setTwitterData(newData);
        // setPageNo(pageNo + 1)
        // setHasMore(newData?.length < (10*pageNo) ? false : true)
      } else {
        // setHasMore(false)
      }
    });
  };

  useEffect(() => {
    setTwitterData([]);
    // setPageNo(1)
    // setHasMore(false)
    if (tokenAddress && category) {
      getTwitterList();
      interval = setInterval(() => {
        getTwitterList();
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [tokenAddress, category]);

  return (
    <div className="w-full flex flex-col mt-[16px] relative z-[1]">
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
      {isMutating && <Loader />}
      {/* {hasMore && twitterData?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]" onClick={getTwitterList}>Learn more</div>} */}
    </div>
  );
}

function CallListContent() {
  return (
    <div className="w-full flex flex-col relative">
      <div
        className={classNames("w-full flex flex-col min-h-[200px] mt-[16px]")}
      >
        <CallItem />
        <CallItem />
        <CallItem />
        <CallItem />
        <CallItem />
      </div>
    </div>
  );
}

function CallItem() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col gap-[16px] border-b-[1px] py-[16px] border-[#DDDDDD]">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[40px] h-[40px] rounded-full bg-[gray]"></div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[16px] font-semibold">Watson</div>
              <div className="text-[12px] bg-[#E0F8EB] rounded-[6px] px-[4px] py-[2px]">
                Meme
              </div>
              <div>
                <LaunchIcon />
              </div>
            </div>
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[12px] text-[#666]">5VwjS...ump</div>
              {copied ? (
                <CheckIcon />
              ) : (
                <div
                  className="cursor-pointer text-black hover:text-[#C8FF00]"
                  onClick={(e) => {
                    // navigator.clipboard.writeText(props?.token_address)
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                    e.stopPropagation();
                  }}
                >
                  <CopyIcon />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="text-[16px] font-semibold">449.21M</div>
          <div className="text-[12px]">MarkCap</div>
        </div>
      </div>
      <div className="rounded-[8px] p-[12px] bg-[#F8F9F4] text-[12px] flex flex-col gap-[16px]">
        <div>Price (SOL)</div>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-col">
            <div>Call Time</div>
            <div>2024.09.06：</div>
            <div>0.01706</div>
          </div>
          <div className="flex flex-col">
            <div>Peak Time</div>
            <div>2024.09.06：</div>
            <div>0.05845</div>
          </div>
          <div className="flex flex-col">
            <div>Increase：</div>
            <div className="text-[#00B953] text-[14px] font-semibold">+21%</div>
          </div>
          <div className="flex flex-col">
            <div>Current Price</div>
            <div className="text-[14px] font-semibold">0.04678</div>
          </div>
        </div>
      </div>
      <div className="text-[12px] text-[#999]">
        Called at 2024.09.06 07:03 AM
      </div>
    </div>
  );
}
