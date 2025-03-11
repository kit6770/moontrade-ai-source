import { BASE_PATH, TWITTER_TYPE_LIST } from "@/lib/constants"
import { SmartMoneyIcon } from "@/lib/icons"
import { formatAddress, timeAgo } from "@/lib/utils"
import { TradeInfo, TwitterFeedInfo } from "@/types"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import useSWRMutation from "swr/mutation"
import { getPlatformInfo } from "@/lib/getPlatformInfo"
import Loader from "@/components/Loader"
import { BaseTooltip } from "@/components/BaseTooltip"
import TwitterItem, {
  QuoteTwitterItem,
  ReplyTwitterItem,
} from "@/components/TwitterItem"
import TabSetItem from "@/components/TabSetItem"
import {
  X as XIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Clear as CloseIcon,
} from "@mui/icons-material"
import { CopyText, SummaryCopyRight } from "@/components/Common"
import { useSelectedFilter, useSelectedKOL } from "@/hooks/useKOL"

const DATA_TYPE_LIST = [
  {
    key: "smartmoney",
    name: "Smart Money",
    icon: <SmartMoneyIcon />,
  },
  {
    key: "twitter",
    name: "X(Twitter)",
    icon: <XIcon />,
  },
]

export default function SideContent() {
  const isMobile = getPlatformInfo()?.isMobile

  const { selected, selectedInfo } = useSelectedKOL("ai")
  const { dataType, setDataType } = useSelectedFilter("ai")

  const [highlighted, setHighlighted] = useState<boolean>(false)

  // const { trigger: summaryTrigger, data: summaryData } = useSWRMutation<SummaryInfo>(`api:/trending_tokens/summary`)

  // useEffect(()=>{
  //   if (selected) {
  //     summaryTrigger({
  //       method: 'POST',
  //       body: JSON.stringify({
  //         token_address: selected,
  //       }),
  //     })
  //   }
  // }, [selected])

  useEffect(() => {
    if (dataType === null) {
      setDataType("smartmoney")
    }
  }, [dataType])

  useEffect(() => {
    setHighlighted(true)
    setTimeout(() => {
      setHighlighted(false)
    }, 1000)
  }, [selected])

  return (
    <aside
      className={classNames(
        "flex flex-none flex-col justify-between md:w-[452px] rounded-[20px] shadow-md border-[1px] border-dashed bg-white overflow-auto hide-scrollbar",
        selected ? "border-[#555F32]" : "border-[transparent]"
      )}
      style={{
        height: isMobile ? "h-full" : `calc(100vh - 155px)`,
        boxShadow: highlighted ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "none",
        animation: highlighted ? "scaleUp 500ms ease forwards" : "none",
      }}
    >
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-[8px] bg-[#C8FF00] rounded-[20px] px-[16px] py-[12px]">
          <div className="flex flex-row items-center gap-[10px]">
            {isMobile && (
              <button
                className="text-black rounded-full w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  window.history.back()
                }}
              >
                <ArrowBackIosNewIcon className="w-[24px] h-[24px]" />
              </button>
            )}
            <h4 className="text-[20px] font-semibold">AI Summary</h4>
          </div>
          {selected && selectedInfo?.description !== "" ? (
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px]">{selectedInfo?.description}</p>
              <SummaryCopyRight />
            </div>
          ) : (
            <div className="text-[16px]">We are still analyzing...</div>
          )}
        </div>
        <div className="flex flex-col rounded-[20px] px-[16px] ">
          <div className="flex flex-row gap-[10px] sticky top-0 bg-white pt-[16px] z-[3] ">
            {DATA_TYPE_LIST?.map((item) => {
              return (
                <BaseTooltip key={item?.key} title={item?.name} placement="top">
                  <div
                    onClick={(e) => {
                      setDataType(item?.key)
                      e.preventDefault()
                    }}
                  >
                    <TabSetItem
                      name="data-type-tab"
                      value={item?.key}
                      icon={
                        <div className="h-[36px] flex items-center">
                          {item?.icon}
                        </div>
                      }
                      defaultChecked={dataType === item?.key}
                    />
                  </div>
                </BaseTooltip>
              )
            })}
          </div>
          {dataType === "smartmoney" && <TradeListContent />}
          {dataType === "twitter" && <TwitterListContent />}
        </div>
      </div>
      <div className="w-full px-[16px] leading-[48px]">
        <div className="text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]">
          {/* Learn more */}
        </div>
      </div>

      <div
        id="modal"
        className="fixed inset-0 bg-black bg-opacity-50 hidden justify-center items-center z-[5]"
      >
        <div className="max-w-3xl mx-auto bg-transparent rounded-lg flex flex-col gap-[16px]">
          <div className="flex justify-end mt-[50px]">
            <button
              className=" text-white bg-gray-800 rounded-full w-[24px] h-[24px] flex items-center justify-center hover:opacity-50"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
          <img
            id="modal-image"
            src={undefined}
            alt="Big Image"
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </aside>
  )
}

function TradeListContent() {
  const { selected } = useSelectedKOL("ai")
  // const [pageNo, setPageNo] = useState<number>(1)
  const [tradeList, setTradeList] = React.useState<TradeInfo[]>([])
  // const [hasMore, setHasMore] = useState<boolean>(false)

  const { trigger: tradeListTrigger, isMutating } = useSWRMutation<{
    trans_list: TradeInfo[]
  }>(
    `api:/ai/trending_tokens/token_last_trades?token_address=${selected}&trans_type=1&address_filter=1&page_no=1&page_size=50`
  )

  const getTradeList = () => {
    tradeListTrigger().then(({ trans_list: list }) => {
      if (list && list.length > 0) {
        // const newData = tradeList.concat(list || [])
        const newData = list
        setTradeList(newData)
        // setPageNo(pageNo + 1)
        // setHasMore(newData?.length < (10*pageNo) ? false : true)
      } else {
        // setHasMore(false)
      }
    })
  }

  React.useEffect(() => {
    setTradeList([])
    // setPageNo(1)
    // setHasMore(false)
    if (selected) {
      getTradeList()
      const interval = setInterval(() => {
        getTradeList()
      }, 300000)
      return () => clearInterval(interval)
    }
  }, [selected])

  return (
    <div className="w-full flex flex-col relative">
      <div
        className={classNames("w-full flex flex-col min-h-[200px] mt-[16px]")}
      >
        {tradeList?.map((item, index) => {
          return <TradeItem key={item?.tx_id + "_" + index} {...item} />
        })}
      </div>
      {isMutating && <Loader />}
      {/* {hasMore && tradeList?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] mb-[16px] cursor-pointer" onClick={getTradeList}>Learn more</div>} */}
    </div>
  )
}

function TradeItem(props: TradeInfo) {
  return (
    <div className="flex flex-col gap-[10px] py-[10px] border-b-[1px] border-[#F3F3F3]">
      <div className="flex flex-row gap-[4px] items-center">
        <img
          src={BASE_PATH + "/image/solana.png"}
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
        <div className="text-[24px]">
          <img
            src={BASE_PATH + "/image/green.png"}
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div className="text-[16px] font-semibold text-[#049046]">
          {formatAddress(props?.wallet_tag.address)}
        </div>
        <div className="text-[16px] font-semibold text-[#666666]">
          ({props?.wallet_tag.address?.slice(0, 3)})
        </div>
        <CopyText text={props?.wallet_tag.address} />
      </div>
      <div className="flex flex-row gap-[4px] items-center justify-between text-[14px] font-semibold ">
        <div className="text-[#666666] flex-1">
          Bought{" "}
          <span className="text-black font-medium">
            {props?.token_to_volume?.toLocaleString()}
          </span>{" "}
          for{" "}
          <span className="text-black font-medium">
            {props?.token_from_volume?.toLocaleString()}
          </span>{" "}
          {props?.price_token} (${props?.price?.toLocaleString()})
        </div>
        <div className="text-[#999]">
          {timeAgo(props?.data_time, false, true)}
        </div>
      </div>
    </div>
  )
}

function TwitterListContent() {
  const { selected } = useSelectedKOL("ai")
  const { trigger: twitterTrigger, isMutating } = useSWRMutation<
    TwitterFeedInfo[]
  >(`api:/ai/trending_tokens/twitter_tweets`)
  let interval: NodeJS.Timeout

  // const [pageNo, setPageNo] = useState<number>(1)
  const [category, setCategory] = useState<string>("top")
  // const [hasMore, setHasMore] = useState<boolean>(true)
  const [twitterData, setTwitterData] = useState<TwitterFeedInfo[]>([])

  const getTwitterList = () => {
    twitterTrigger({
      method: "POST",
      body: JSON.stringify({
        token_address: selected,
        category,
        offset: 0, //pageNo - 1,
        limit: 50,
      }),
    }).then((list) => {
      if (list && list.length > 0) {
        // const newData = twitterData.concat(list || [])
        const newData = list
        setTwitterData(newData)
        // setPageNo(pageNo + 1)
        // setHasMore(newData?.length < (10*pageNo) ? false : true)
      } else {
        // setHasMore(false)
      }
    })
  }

  useEffect(() => {
    setTwitterData([])
    // setPageNo(1)
    // setHasMore(false)
    if (selected && category) {
      getTwitterList()
      interval = setInterval(() => {
        getTwitterList()
      }, 300000)
      return () => clearInterval(interval)
    }
  }, [selected, category])

  console.log("twitterData", selected)

  return (
    <div className="w-full flex flex-col relative z-[1] mt-[10px]">
      <div className="flex flex-row items-center sticky top-[60px] gap-[12px] py-[10px] bg-white z-[3]">
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
                    "text-[14px] text-[#666]",
                    category === item?.value && "text-black"
                  )}
                >
                  {item?.name}
                </div>
              }
              onChange={() => setCategory(item?.value)}
            />
          )
        })}
      </div>
      <div className={classNames("flex flex-col gap-[8px] min-h-[160px]")}>
        {twitterData?.map((item, index) => {
          if (item?.related_tweets && item?.related_tweets?.length > 0) {
            if (item?.related_tweets?.length === 1) {
              if (item?.related_tweets?.[0]?.type === "replied_to") {
                return (
                  <ReplyTwitterItem key={item?.id + "_" + index} {...item} />
                )
              } else {
                return (
                  <QuoteTwitterItem key={item?.id + "_" + index} {...item} />
                )
              }
            } else {
              return <QuoteTwitterItem key={item?.id + "_" + index} {...item} />
            }
          } else {
            return <TwitterItem key={item?.id + "_" + index} {...item} />
          }
        })}
      </div>
      {isMutating && <Loader />}
      {/* {hasMore && twitterData?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]" onClick={getTwitterList}>Learn more</div>} */}
    </div>
  )
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("modal")
  modal?.classList.add("hidden")
}
