import { BASE_PATH, TWITTER_TYPE_LIST } from "@/lib/constants";
import { CommentIcon, LikeIcon, LogoIcon, ShareIcon, SmartMoneyIcon, TwitterIcon, TwitterVIcon } from "@/lib/icons";
import { formatAddress, formatNumber, timeAgo } from "@/lib/utils";
import { SummaryInfo, TradeInfo, TwitterFeedInfo } from "@/types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import Loader from "./loader";
import useSWR from "swr";

const DATA_TYPE_LIST = [{
  key: 'smartmoney',
  name: 'Smart Money',
  icon: <SmartMoneyIcon/>
}, {
  key: 'twitter',
  name: 'X(Twitter)',
  icon: <TwitterIcon/>
}]

export default function SideContent() {
  const { data: selectedToken } = useSWR('selectedToken')
  
  const [dataType, setDataType] = useState<string>('smartmoney')

  const { trigger: summaryTrigger, data: summaryData } = useSWRMutation<SummaryInfo>(`api:/trending_tokens/summary`)

  useEffect(()=>{
    if (selectedToken) {
      summaryTrigger({
        method: 'POST',
        body: JSON.stringify({
          token_address: selectedToken,
        }),
      })
    }
  }, [selectedToken])

  return (
    <aside className="flex flex-none flex-col gap-[16px] w-[452px] rounded-[20px] shadow-md">
      <div className="flex flex-col gap-[8px] bg-[#C8FF00] rounded-[20px] px-[16px] py-[12px]">
        <h4 className="text-[20px] font-semibold">AI Summary</h4>
        <p className="text-[16px]">
          {summaryData?.content}
        </p>
        <div className="flex flex-row rounded-[6px] bg-[#EEFFB0] items-center">
          <div className="flex flex-row px-[16px] py-[8px] items-center gap-[4px]">
            <div className="flex w-[16px] h-[16px] rounded-full bg-black items-center justify-center"><LogoIcon/></div>
            <div className="text-[16px] font-semibold">PeerX</div>
          </div>
          <div className="text-[12px]">{summaryData?.source}</div>
        </div>
      </div>

      <div className="flex flex-col gap-[8px] rounded-[20px] px-[16px]">
        <div className="flex flex-row gap-[16px]">
          {DATA_TYPE_LIST?.map(item=>{
            return <div className="relative inline-block group" key={item?.key} >
                <TabSetItem name="data-type-tab" value={item?.key} icon={<div className="h-[36px] flex items-center">{item?.icon}</div>} defaultChecked={dataType===item?.key} onChange={()=>{
                setDataType(item?.key)
              }}/>
              {/* tooltip */}
              <div className="whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-[14px] px-2 py-1 rounded-[6px]">
                {item?.name}
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-black border-l-transparent border-r-transparent"></div>
              </div>
            </div>
          })}
        </div>
        {dataType==='smartmoney' && <TradeListContent/>}
        {dataType==='twitter' && <TwitterListContent/>}
      </div>
    </aside>
  );
}

function TabSetItem({ value, name, icon, defaultChecked = false, onChange }: { value: string, name: string, icon?: React.JSX.Element, defaultChecked?: boolean, onChange?: React.ChangeEventHandler<HTMLInputElement>}) {
  return <label className="cursor-pointer flex justify-stretch items-center">
    <input type="radio" className='peer hidden' name={name} value={value} defaultChecked={defaultChecked} onChange={onChange}/>
    <div className={
      classNames(
        'bg-[#F9F9F9] rounded-[6px] px-[20px] py-[4px]',
        'peer-checked:text-[#000000] peer-checked:bg-[#C8FF00]',
        "hover:bg-white hover:text-[#000000]"
      )
    }>
      {icon}
    </div>
  </label>
}

function TradeListContent() {
  const { data: tokenAddress } = useSWR('selectedToken')
  const [pageNo, setPageNo] = useState<number>(1)
  const [tradeList, setTradeList] = React.useState<TradeInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)

  const { trigger: tradeListTrigger, isMutating } = useSWRMutation<{trans_list: TradeInfo[]}>(`api:/trending_tokens/token_last_trades?token_address=${tokenAddress}&trans_type=1&address_filter=1&page_no=${pageNo}&page_size=10`)

  const getTradeList = () => {
    tradeListTrigger().then(({trans_list: list}) => {
      if (list && list.length > 0) {
        const newData = tradeList.concat(list || [])
        setTradeList(newData)
        setPageNo(pageNo + 1)
        setHasMore(newData?.length < (10*pageNo) ? false : true)
      } else {
        setHasMore(false)
      }
    })
  }

  React.useEffect(() => {
    setTradeList([])
    setPageNo(1)
    setHasMore(false)
    if (tokenAddress) {
      getTradeList()
    }
  }, [tokenAddress])

  return <div className="w-full flex flex-col relative">
    <div className={classNames("w-full flex flex-col min-h-[300px]",hasMore && tradeList?.length>0 ? '' : 'mt-[16px]')}>
      {tradeList?.map(item=>{
        return <SmartMoneyItem key={item?.tx_id} {...item}/>
      })}
    </div>
    {isMutating && <Loader/>}
    {hasMore && tradeList?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] mb-[16px] cursor-pointer" onClick={getTradeList}>Learn more</div>}
  </div>
}

function SmartMoneyItem(props: TradeInfo) {
  return <div className="flex flex-col gap-[10px] py-[10px] border-b-[1px] border-[#F3F3F3]">
    <div className="flex flex-row gap-[4px] items-center">
      <img src={BASE_PATH + "/image/solana.png"} alt="" width={24} height={24} className="rounded-full"/>
      <div className="text-[24px]">
        <img src={BASE_PATH + "/image/green.png"} alt="" width={24} height={24}/>
      </div>
      <div className="text-[16px] font-semibold text-[#049046]">{formatAddress(props?.wallet_tag.address)}</div>
      <div className="text-[16px] font-semibold text-[#666666]">({props?.wallet_tag.address?.slice(0, 3)})</div>
    </div>
    <div className="flex flex-row gap-[4px] items-center justify-between text-[14px] font-semibold ">
      <div className="text-[#666666]">
        Bought <span className="text-black font-medium">{props?.token_to_volume?.toLocaleString()}</span> for <span className="text-black font-medium">{props?.token_from_volume?.toLocaleString()}</span> {props?.price_token} ($)
      </div>
      <div className="text-[#999]">{timeAgo(props?.data_time, false, true)}</div>
    </div>
  </div>
}

function TwitterListContent() {
  const { data: tokenAddress } = useSWR('selectedToken')
  const { trigger: twitterTrigger, isMutating } = useSWRMutation<TwitterFeedInfo[]>(`api:/trending_tokens/twitter_tweets`)

  const [pageNo, setPageNo] = useState<number>(1)
  const [category, setCategory] = useState<string>('top')
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [twitterData, setTwitterData] = useState<TwitterFeedInfo[]>([])

  const getTwitterList = () => {
    twitterTrigger({
      method: 'POST',
      body: JSON.stringify({
        token_address: tokenAddress,
        category,
        offset: pageNo - 1,
        limit: 10
      }),
    }).then((list)=>{
      if (list && list.length > 0) {
        const newData = twitterData.concat(list || [])
        setTwitterData(newData)
        setPageNo(pageNo + 1)
        setHasMore(newData?.length < (10*pageNo) ? false : true)
      } else {
        setHasMore(false)
      }
    })
  }

  useEffect(()=>{
    setTwitterData([])
    setPageNo(1)
    setHasMore(false)
    if (tokenAddress && category) {
      getTwitterList()
    }
  }, [tokenAddress, category])

  return <div className="w-full flex flex-col gap-[16px] relative">
    <div className="flex flex-row items-center gap-[16px]">
      {TWITTER_TYPE_LIST?.map(item=>{
        return <TabSetItem key={item?.value} name="twitter-sort-tab" value={item?.value} defaultChecked={category===item?.value} icon={<div className={classNames("text-[16px] font-bold text-[#666]", category===item?.value && "text-black")}>{item?.name}</div>} onChange={()=>setCategory(item?.value)}/>
      })}
      </div>
    <div className={classNames("flex flex-col gap-[16px] min-h-[300px]", hasMore && twitterData?.length>0 ? '' : 'mb-[16px]')}>
      {twitterData?.map(item=>{
        if (item?.is_quote) {
          return <QuoteTwitterItem key={item?.id} {...item}/>
        } else if (item?.is_reply) {
          return <ReplyTwitterItem key={item?.id} {...item}/>
        } else {
          return <TwitterItem key={item?.id} {...item}/>
        }
      })}
    </div>
    {isMutating && <Loader/>}
    {hasMore && twitterData?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]" onClick={getTwitterList}>Learn more</div>}
  </div>
}

function TwitterItem(props: TwitterFeedInfo & {isQuote?:boolean}) {
  const actionList = [{
    key: 'relpy',
    icon: <CommentIcon/>,
    value: props?.reply_count
  }, {
    key: 'share',
    icon: <ShareIcon/>,
    value: ((props?.quote_count ?? 0) + (props?.retweet_count ?? 0))
  }, {
    key: 'like',
    icon: <LikeIcon/>,
    value: props?.favorite_count
  }]
  return <div className="flex flex-col gap-[10px] rounded-[6px] p-[20px] bg-[#F9F9F9]">
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center"><LogoIcon/></div>
        <div className="text-[16px] font-bold">PeerX</div>
      </div>
      <div className="cursor-pointer" onClick={()=>{window.open(props?.text_url, '_blank')}}><TwitterIcon/></div>
    </div>
    <div className="flex flex-row items-center gap-[10px]">
      <div className="w-[48px] h-[48px] rounded-full bg-black">
        <img src={props?.profile_image_url} width={48} height={48} alt=""/>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center text-[16px] font-bold text-black gap-[6px]">
          {props?.user_name}{props?.official ? <span><TwitterVIcon/></span> : ''}
        </div>
        <div className="text-[12px] text-[#666]">@{props?.name} · Followers: {props?.followers_count} · {timeAgo(props?.create_at, true, true)}</div>
      </div>
    </div>
    <div className="text-[16px] text-black pb-[6px]">{props?.text}</div>
    {/* <div className="grid grid-cols-2 gap-[8px] pb-[6px]">
      <img src="https://pbs.twimg.com/media/GdAF7inWsAQ7Coq?format=png&name=900x900" alt="" className="rounded-[10px]"/>
      <img src="https://pbs.twimg.com/media/GdAF7inWsAQ7Coq?format=png&name=900x900" alt="" className="rounded-[10px]"/>
    </div> */}
    {!props?.isQuote && <div className="flex flex-row items-center gap-[16px]">
      {actionList?.map((item, index)=>{
        return <div key={item?.key} className={classNames("flex flex-row items-center gap-[4px]", index===2 ? '': 'flex-1')}>
          <div>{item?.icon}</div>
          <div className="text-[14px]">{formatNumber(item?.value)}</div>
        </div>
      })}
    </div>}
  </div>
}

function QuoteTwitterItem(props: TwitterFeedInfo) {
  const actionList = [{
    key: 'relpy',
    icon: <CommentIcon/>,
    value: props?.reply_count
  }, {
    key: 'share',
    icon: <ShareIcon/>,
    value: ((props?.quote_count ?? 0) + (props?.retweet_count ?? 0))
  }, {
    key: 'like',
    icon: <LikeIcon/>,
    value: props?.favorite_count
  }]
  return <div className="flex flex-col gap-[16px]">
    <TwitterItem {...props} isQuote />
    <div className="flex p-[10px] my-[16px] border-1 border-[#DEDEDE]">
      <TwitterItem {...props} isQuote/>
    </div>
    <div className="flex flex-row items-center gap-[16px]">
      {actionList?.map((item, index)=>{
        return <div key={item?.key} className={classNames("flex flex-row items-center gap-[4px]", index===2 ? '': 'flex-1')}>
          <div>{item?.icon}</div>
          <div className="text-[14px]">{formatNumber(item?.value)}</div>
        </div>
      })}
    </div>
  </div>
}

function ReplyTwitterItem(props: TwitterFeedInfo) {
  return <div className="flex flex-col">
    <TwitterItem {...props}/>
    <TwitterItem {...props}/>
    <div className="flex p-[10px] my-[16px] border-1 border-[#DEDEDE]"></div>
  </div>
}