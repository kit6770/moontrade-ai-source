import { BASE_PATH, TWITTER_TYPE_LIST } from "@/lib/constants";
import { BackIcon, CloseIcon, CommentIcon, LikeIcon, LogoIcon, ShareIcon, SmartMoneyIcon, TwitterIcon, TwitterVIcon } from "@/lib/icons";
import { formatAddress, formatNumber, timeAgo } from "@/lib/utils";
import { FeedInfo, SummaryInfo, TradeInfo, TwitterFeedInfo } from "@/types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import Loader from "./loader";
import useSWR from "swr";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip"

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
  const isMobile = getPlatformInfo()?.isMobile

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
    <aside className="flex flex-none flex-col justify-between md:w-[452px] rounded-[20px] shadow-md border-[1px] border-[#F1F1F1] overflow-hidden hover:overflow-auto" style={{height: isMobile ? 'h-full' : `calc(100vh - 250px)`}}>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-[8px] bg-[#C8FF00] rounded-[20px] px-[16px] py-[12px]">
          <div className="flex flex-row items-center gap-[10px]">
            {isMobile && <button className="text-black rounded-full w-[24px] h-[24px] flex items-center justify-center cursor-pointer" onClick={()=>{
              window.history.back()
            }}>
              <BackIcon className='w-[24px] h-[24px]'/>
            </button>}
            <h4 className="text-[20px] font-semibold">AI Summary</h4>
          </div>
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
        <div className="flex flex-col rounded-[20px] px-[16px] ">
          <div className="flex flex-row gap-[16px] sticky top-0 bg-white pt-[16px] z-[3] ">
            {DATA_TYPE_LIST?.map(item=>{
              return <Tooltip key={item?.key}>
                <TooltipTrigger asChild>
                  <div>
                    <TabSetItem 
                      name="data-type-tab" 
                      value={item?.key} 
                      icon={<div className="h-[36px] flex items-center">{item?.icon}</div>} 
                      defaultChecked={dataType===item?.key} 
                      onChange={()=>{
                        setDataType(item?.key)
                      }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white rounded-[6px] px-[8px] py-[2px] text-[14px] border-0">
                  {item?.name}
                  <TooltipArrow className="fill-black" />
                </TooltipContent>
              </Tooltip>
            })}
          </div>
          {dataType==='smartmoney' && <TradeListContent/>}
          {dataType==='twitter' && <TwitterListContent/>}
        </div>
      </div>
      <div className="w-full px-[16px] leading-[48px]">
        <div className="text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]">
          {/* Learn more */}
        </div>
      </div>
      <div id="modal" className="fixed inset-0 bg-black bg-opacity-50 hidden justify-center items-center z-[5]">
        <div className="max-w-3xl mx-auto bg-transparent rounded-lg flex flex-col gap-[16px]">
          <div className="flex justify-end mt-[50px]">
            <button className=" text-white bg-gray-800 rounded-full w-[24px] h-[24px] flex items-center justify-center hover:opacity-50" onClick={closeModal}>
              <CloseIcon/>
            </button>
          </div>
          <img id="modal-image" src={undefined} alt="Big Image" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"/>
        </div>
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
  // const [pageNo, setPageNo] = useState<number>(1)
  const [tradeList, setTradeList] = React.useState<TradeInfo[]>([])
  // const [hasMore, setHasMore] = useState<boolean>(false)

  const { trigger: tradeListTrigger, isMutating } = useSWRMutation<{trans_list: TradeInfo[]}>(`api:/trending_tokens/token_last_trades?token_address=${tokenAddress}&trans_type=1&address_filter=1&page_no=1&page_size=50`)

  const getTradeList = () => {
    tradeListTrigger().then(({trans_list: list}) => {
      if (list && list.length > 0) {
        const newData = tradeList.concat(list || [])
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
    if (tokenAddress) {
      getTradeList()
      const interval = setInterval(() => {
        getTradeList()
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [tokenAddress])

  return <div className="w-full flex flex-col relative">
    <div className={classNames("w-full flex flex-col min-h-[200px] mt-[16px]")}>
      {tradeList?.map(item=>{
        return <TradeItem key={item?.tx_id} {...item}/>
      })}
    </div>
    {isMutating && <Loader/>}
    {/* {hasMore && tradeList?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] mb-[16px] cursor-pointer" onClick={getTradeList}>Learn more</div>} */}
  </div>
}

function TradeItem(props: TradeInfo) {
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
      <div className="text-[#666666] flex-1">
        Bought <span className="text-black font-medium">{props?.token_to_volume?.toLocaleString()}</span> for <span className="text-black font-medium">{props?.token_from_volume?.toLocaleString()}</span> {props?.price_token} (${props?.price?.toLocaleString()})
      </div>
      <div className="text-[#999]">{timeAgo(props?.data_time, false, true)}</div>
    </div>
  </div>
}

function TwitterListContent() {
  const { data: tokenAddress } = useSWR('selectedToken')
  const { trigger: twitterTrigger, isMutating } = useSWRMutation<TwitterFeedInfo[]>(`api:/trending_tokens/twitter_tweets`)
  let interval: NodeJS.Timeout;

  // const [pageNo, setPageNo] = useState<number>(1)
  const [category, setCategory] = useState<string>('top')
  // const [hasMore, setHasMore] = useState<boolean>(true)
  const [twitterData, setTwitterData] = useState<TwitterFeedInfo[]>([])

  const getTwitterList = () => {
    twitterTrigger({
      method: 'POST',
      body: JSON.stringify({
        token_address: tokenAddress,
        category,
        offset: 0, //pageNo - 1,
        limit: 50
      }),
    }).then((list)=>{
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

  useEffect(()=>{
    setTwitterData([])
    // setPageNo(1)
    // setHasMore(false)
    if (tokenAddress && category) {
      getTwitterList()
      interval = setInterval(() => {
        getTwitterList()
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [tokenAddress, category])

  return <div className="w-full flex flex-col relative z-[1]">
    <div className="flex flex-row items-center justify-between sticky top-[60px] py-[10px] bg-white z-[3]">
      {TWITTER_TYPE_LIST?.map(item=>{
        return <TabSetItem key={item?.value} name="twitter-sort-tab" value={item?.value} defaultChecked={category===item?.value} icon={<div className={classNames("text-[16px] font-bold text-[#666]", category===item?.value && "text-black")}>{item?.name}</div>} onChange={()=>setCategory(item?.value)}/>
      })}
    </div>
    <div className={classNames("flex flex-col gap-[16px] min-h-[160px]")}>
      {twitterData?.map(item=>{
        if (item?.related_tweets && item?.related_tweets?.length > 0) {
          if (item?.related_tweets?.length === 1) {
            if (item?.related_tweets?.[0]?.type === 'replied_to') {
              return <ReplyTwitterItem key={item?.id} {...item}/>
            } else {
              return <QuoteTwitterItem key={item?.id} {...item}/>
            }
          } else {
            return <QuoteTwitterItem key={item?.id} {...item}/>
          }
        } else {
          return <TwitterItem key={item?.id} {...item}/>
        }
      })}
    </div>
    {isMutating && <Loader/>}
    {/* {hasMore && twitterData?.length>0 && <div className="w-full h-[48px] text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]" onClick={getTwitterList}>Learn more</div>} */}
  </div>
}

function TwitterItem(props: FeedInfo & {isQuote?:boolean, isReply?:boolean}) {
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
  const mediaLength = (props?.medias || [])?.length
  return <div className={classNames("flex flex-col gap-[10px] rounded-[6px] bg-[#F9F9F9]", (props?.isQuote || props?.isReply) ? '' : 'p-[20px]')}>
    {!(props?.isQuote || props?.isReply) && <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center"><LogoIcon/></div>
        <div className="text-[16px] font-bold">PeerX</div>
      </div>
      <div className="cursor-pointer" onClick={()=>{window.open(props?.text_url, '_blank')}}><TwitterIcon/></div>
    </div>}
    <div className="flex flex-row items-center gap-[10px]">
      {!props?.isReply && <div className="w-[48px] h-[48px] rounded-full bg-black">
        <img src={props?.profile_image_url} width={48} height={48} alt="" className="w-[48px] h-[48px] rounded-full"/>
      </div>}
      <div className="flex flex-col">
        <div className="flex flex-row items-center text-[16px] font-bold text-black gap-[6px]">
          {props?.name}{props?.official ? <span><TwitterVIcon/></span> : ''}
        </div>
        <div className="text-[12px] text-[#666]">@{props?.user_name} · Followers: {formatNumber(props?.followers_count)} · {timeAgo(props?.create_at, true, true)}</div>
      </div>
    </div>
    <div className="text-[16px] text-black pb-[6px] break-all whitespace-pre-wrap">{props?.text?.replaceAll('\n\n', '\n')}</div>
    <div className="grid grid-cols-2 gap-[8px] pb-[6px]">
      {props?.medias?.map((item, index)=>{
        const isLast = mediaLength%2 === 1 && index === mediaLength - 1
        return <img key={item?.media_key} src={item?.url} alt="" className={classNames("rounded-[10px] cursor-pointer", isLast&&'col-span-2')}  onClick={()=>openModal(item?.url)}/>
        })
      }
    </div>
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
  return <div className="flex flex-col p-[20px] gap-[10px] bg-[#F9F9F9]">
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center"><LogoIcon/></div>
        <div className="text-[16px] font-bold">PeerX</div>
      </div>
      <div className="cursor-pointer" onClick={()=>{window.open(props?.text_url, '_blank')}}><TwitterIcon/></div>
    </div>
    <TwitterItem {...props} isQuote />
    <div className="flex mb-[10px] p-[10px] rounded-[6px] border-[1px] border-[#DEDEDE]">
      <TwitterItem {...props?.related_tweets?.[0]} isQuote/>
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

function ReplyTwitterItem(props: TwitterFeedInfo & {hasReply?: boolean}) {
  return <div className="flex flex-col p-[20px] gap-[10px] bg-[#F9F9F9]">
    {!props?.hasReply && <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center"><LogoIcon/></div>
        <div className="text-[16px] font-bold">PeerX</div>
      </div>
      <div className="cursor-pointer" onClick={()=>{window.open(props?.text_url, '_blank')}}><TwitterIcon/></div>
    </div>}
    <div className="relative flex flex-row items-start justify-between gap-[10px]">
      <img src={props?.related_tweets?.[0]?.profile_image_url} width={48} height={48} alt="" className="w-[48px] h-[48px] rounded-full z-[2]"/>
      <div className="flex-1">
        <TwitterItem {...props?.related_tweets?.[0]} isReply/>
      </div>
      <div className="absolute w-[2px] bg-[#DEDEDE] h-full left-[24px] top-[24px] z-[1]"/>
    </div>
    <div className="flex flex-row items-start justify-between gap-[10px]">
      <img src={props?.profile_image_url} width={48} height={48} alt="" className="w-[48px] h-[48px] rounded-full z-[2]"/>
      <div className="flex-1">
        <TwitterItem {...props} isReply/>
      </div>
    </div>
  </div>
}

function openModal(imageUrl: string) {
  if (!imageUrl || imageUrl==='') return;
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image') as HTMLImageElement;
  modal?.classList.remove('hidden');
  modalImage!.src = imageUrl;
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal?.classList.add('hidden');
}