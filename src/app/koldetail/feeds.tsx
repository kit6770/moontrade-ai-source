import Loader from "@/components/Loader";
import TabSetItem from "@/components/TabSetItem";
import TwitterItem, {
  QuoteTwitterItem,
  ReplyTwitterItem,
} from "@/components/TwitterItem";
import { TwitterFeedInfo } from "@/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

const TWITTER_TYPE_LIST = [
  { value: "top", name: "TOP" },
  { value: "latest", name: "Latest" },
];

export default function Feeds() {
  const { trigger: twitterTrigger, isMutating } = useSWRMutation<
    TwitterFeedInfo[]
  >(`api:/trending_tokens/twitter_tweets`);

  const [pageNo, setPageNo] = useState<number>(1);
  const [category, setCategory] = useState<string>("top");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [twitterData, setTwitterData] = useState<TwitterFeedInfo[]>([]);

  const getTwitterList = () => {
    twitterTrigger({
      method: "POST",
      body: JSON.stringify({
        // token_address: tokenAddress,
        category,
        offset: pageNo - 1,
        limit: 50,
      }),
    }).then((list) => {
      if (list && list.length > 0) {
        const newData = twitterData.concat(list || []);
        setTwitterData(newData);
        setPageNo(pageNo + 1);
        setHasMore(newData?.length < 10 * pageNo ? false : true);
      } else {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    setTwitterData([]);
    setPageNo(1);
    setHasMore(false);
    if (category) {
      getTwitterList();
    }
  }, [category]);

  return (
    <div className="w-full flex flex-col">
      <div className="text-[14px]">Last updated: 1月14日 10:01</div>
      <div className="flex flex-row items-center gap-[10px] py-[10px] sticky top-[22px] bg-white z-[3]">
        {TWITTER_TYPE_LIST?.map((item) => {
          return (
            <TabSetItem
              key={item?.value}
              name="twitter-sort-tab"
              value={item?.value}
              defaultChecked={category === item?.value}
              icon={
                <div
                  className={classNames(
                    "text-[16px] font-bold text-[#666]",
                    category === item?.value && "text-black"
                  )}
                >
                  {item?.name}
                </div>
              }
              onChange={() => setCategory(item?.value)}
            />
          );
        })}
      </div>
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
      {hasMore && twitterData?.length > 0 && (
        <div
          className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]"
          onClick={getTwitterList}
        >
          Learn more
        </div>
      )}
    </div>
  );
}
