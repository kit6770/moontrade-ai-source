import { BASE_PATH } from '@/lib/constants'
import { CopiedIcon, CopyIcon, CreateIcon, FeedsIcon, FromVIcon, GoldSmartMoneyIcon, LogoIcon, MCIcon, SearchOnXIcon, TelegramIcon, TwitterIcon, TwitterWhiteIcon, WebsiteIcon } from '@/lib/icons'
import { SmartMoneyInfo } from '@/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import Loader from './loader'
import { formatAddress, formatNumber, isTimeExceed24Hours, timeAgo } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import { getPlatformInfo } from '@/lib/getPlatformInfo'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from '@/components/ui/tooltip'

export default function MainContent() {
  const isMobile = getPlatformInfo()?.isMobile
  const { data: timeType } = useSWR('timeType')
  const { data: tokenAddress } = useSWR('selectedToken')
  const { trigger: tokenListTrigger, isMutating } = useSWRMutation<SmartMoneyInfo[]>(`api:/trending_tokens/rank`)

  const [tokenData, setTokenData] = useState<SmartMoneyInfo[]>([])

  const getTokenList = () => {
    tokenListTrigger({
      method: 'POST',
      body: JSON.stringify({
        category: timeType,
        offset: 0,
        limit: 20
      }),
    }).then((list)=>{
      if (list && list.length > 0) {
        setTokenData(list)
        console.log('update------', tokenAddress, list?.findIndex(o=>o?.token_address?.toLowerCase() === tokenAddress?.toLowerCase()))
        if (tokenAddress === null || list?.findIndex(o=>o?.token_address?.toLowerCase() === tokenAddress?.toLowerCase()) <= 0) {
          updateSelectedToken(list[0]?.token_address)
          updateSelectedTokenInfo(JSON.stringify(list[0]))
        }
      }
    })
  }

  useEffect(()=>{
    setTokenData([])
    if (timeType) {
      getTokenList()
      const interval = setInterval(() => {
        getTokenList()
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [timeType])

  const {trigger: updateSelectedToken } = useSWRMutation<string>('selectedToken')
  const {trigger: updateSelectedTokenInfo } = useSWRMutation<SmartMoneyInfo>('selectedTokenInfo')

  return (
    <div className={classNames("relative flex flex-auto flex-col gap-[16px] pb-[150px] md:pr-[16px]", isMobile ? 'h-full overflow-auto':'overflow-hidden hover:overflow-auto')} style={{height: `calc(100vh - 144px)`}}>
      {tokenData?.map((item, index)=>{
        if (isMobile) {
          return <div key={item?.id} className='relative' onClick={()=>{
            updateSelectedToken(item?.token_address)
            updateSelectedTokenInfo(JSON.stringify(item))
          }}>
            <Link href={'/summary'} className='relative'>
              <Item {...item} index={index}/>
            </Link>
          </div>
        } else {
          return <div key={item?.id} className='relative' onClick={()=>{
            updateSelectedToken(item?.token_address)
            updateSelectedTokenInfo(JSON.stringify(item))
          }}>
            <Item {...item} index={index}/>
          </div>
        }
      })}
      {isMutating && <Loader/>}
    </div>
  )
}

function Item(props: SmartMoneyInfo&{index: number}) {
  const { data: selectedToken } = useSWR('selectedToken')
  return (
    <div className={classNames(
      'relative flex flex-col gap-[16px] rounded-[20px] p-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition-colors duration-300 cursor-pointer',
      'border-[2px] hover:border-[#C8FF00] hover:bg-[#FBFFEC]',
      selectedToken?.toLowerCase() === props?.token_address?.toLowerCase() ? 'border-[#C8FF00] bg-[#FBFFEC]': 'border-[#F1F1F1] bg-[#FFFFFF]',
    )}
    >
      <div className="absolute top-[-1px] left-[-1px] bg-black text-[#C8FF00] text-[14px] font-medium rounded-tl-[20px] rounded-br-[20px] px-[12px] h-[24px] flex items-center justify-center"># {props?.index+1}</div>
      <Section1 {...props}/>
      <Section2 {...props}/>
      <Section3 {...props}/>
    </div>
  )
}

function Section1(props: SmartMoneyInfo) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="w-full flex-1 flex flex-row gap-[16px]">
      <div className="relative w-[64px] h-[64px]">
        {props?.logo && props?.logo !=='' ? 
          <img src={props?.logo} width={64} height={64} className="rounded-full w-[64] h-[64] bg-gray-500" alt="" /> : 
          <div className='rounded-full w-[64] h-[64] bg-gray-500'/>}
        <img src={BASE_PATH + "/image/solana.png"} alt="" width={20} height={20} className="rounded-full absolute bottom-0 right-0"/>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[18px] text-black flex flex-row gap-[4px] items-center">
          <div className="text-[24px] font-bold">{props?.symbol}</div>
          <div className="text-[12px]">{`${props?.name} · ${formatAddress(props?.token_address)}`}</div>
          {
            copied ? <div>
              <CopiedIcon/>
            </div> : 
            <div className='cursor-pointer text-black hover:text-[#C8FF00]' onClick={(e)=>{
              navigator.clipboard.writeText(props?.token_address)
              setCopied(true)
              setTimeout(()=>setCopied(false), 1000)
              e.stopPropagation()
            }}>
              <CopyIcon/>
            </div>
          }
          <div className='cursor-pointer text-black hover:text-[#C8FF00]' onClick={(e)=>{
            window.open(`https://x.com/search?q=${props?.token_address}`)
            e.stopPropagation()
          }}>
            <SearchOnXIcon/>
          </div>
        </div>
        <div className="text-[12px] font-semibold text-[#666] flex flex-row gap-[6px] justify-start flex-wrap">
          {(props?.famous_confirmed || props?.famous_twitter_name) && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px] gap-[4px]">
            {props?.famous_confirmed && <FromVIcon/>}
            {props?.famous_twitter_name && props?.famous_twitter_name !=='' && <div>From: {props?.famous_twitter_name}</div>}
            {props?.famous_twitter_image && props?.famous_twitter_image !== '' && <div className='relative w-[23px]'>
              <div className='w-[18px] h-[18px] rounded-full bg-[#666]'>
                <img src={props?.famous_twitter_image} alt='' className='w-[18px] h-[18px] rounded-full'/>
              </div>
              <div className='absolute bottom-0 left-[14px] w-[10px] h-[10px] rounded-full flex items-center justify-center bg-black overflow-hidden'>
                <TwitterWhiteIcon />
              </div>
            </div>}
          </div>}
          <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px] gap-[4px]">
            {props?.publish_time && isTimeExceed24Hours(props?.publish_time) && <CreateIcon/>}
            {timeAgo(props?.publish_time)}
          </div>
          <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <img src={BASE_PATH + "/image/pump.png"} width={16} height={16} alt='' onClick={(e)=>{
                window.open(`https://pump.fun/coin/${props?.token_address}`, '_blank')
                e.stopPropagation()
              }}/>
          </div>
          {props?.twitter_link && props?.twitter_link !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <TwitterIcon 
              color={'#666666'}
              className='scale-[0.6]' 
              onClick={(e)=>{
                window.open(props?.twitter_link, '_blank')
                e.stopPropagation()
              }}
            />
          </div>}
          {props?.home_page && props?.home_page !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <WebsiteIcon 
              onClick={(e)=>{
                window.open(props?.home_page, '_blank')
                e.stopPropagation()
              }}
            />
          </div>}
          {props?.telegram_link && props?.telegram_link !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <TelegramIcon
              onClick={(e)=>{
                window.open(props?.telegram_link, '_blank')
                e.stopPropagation()
              }}
            />
          </div>}
        </div>
      </div>
    </div>
  )
}

function Section2(props: SmartMoneyInfo) {
  const { data: selectedToken } = useSWR('selectedToken')
  const {trigger: updateDataType } = useSWRMutation<string>('dataType')
  const list = [{
    title: 'SmartMoney',
    type: 'smartmoney',
    icon: <GoldSmartMoneyIcon/>,
    value: props?.smart_wallet_count,
    isPositive: props?.smart_wallet_count_change,
    change: props?.smart_wallet_count_change,
    onClick: ()=>{
      updateDataType('smartmoney')
    }
  }, {
    title: 'Feeds',
    type: 'feeds',
    icon: <FeedsIcon/>,
    value: props?.x_feed_num,
    isPositive: props?.x_feed_num_change,
    change: props?.x_feed_num_change,
    onClick: ()=>{
      updateDataType('twitter')
    }
  }, {
    title: 'MC',
    type: 'mc',
    icon: <MCIcon/>,
    value: props?.market_value,
    isPositive: props?.market_value_change,
    change: props?.market_value_change,
    onClick: ()=>{
      
    }
  }]
  return (
    <div className="flex flex-row justify-start gap-[16px] flex-wrap cursor-pointer">
      {list?.map(item=>{
        return <div key={item?.title} className={classNames("flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]", 
          item?.type!=='mc' && 'hover:bg-[#F2FEC5]'
        )}
        onClick={(e)=> {
          if (selectedToken?.toLowerCase() === props?.token_address?.toLowerCase()) {
            item?.onClick();
            e.stopPropagation();
          }
        }}
        >
          {item?.icon}
          <div className='flex flex-col'>
            <div className='text-[12px] font-semibold'>{item?.title}</div>
            <div className='flex flex-row items-center gap-[4px] text-[16px]'>
              <div className='font-bold text-[#000]'>{formatNumber(item?.value)}</div>
              {item?.change ? <div className={classNames(item?.isPositive ? 'text-[#00B953]' : 'text-[#FF543D]')}>{item?.change}</div> : ''}
            </div>
          </div>
        </div>
      })}
        
      </div>
  )
}

function Section3(props: SmartMoneyInfo) {
  return (
    <div className="flex flex-row justify-between gap-[16px] items-center">
      {props?.description && props?.description!=='' ? <TextDisplay text={props?.description ?? ''}/> : <div className='text-[14px]'>We are still analyzing...</div>}
      <div className="flex flex-row gap-[10px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
              <div className="bg-black rounded-[3px] w-full h-full flex items-center justify-center">
                <LogoIcon className='scale-[1.5]'/>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white rounded-[6px] px-[6px] py-[2px] text-[14px] border-0">
            Coming soon...
            <TooltipArrow className="fill-black" />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
              <img src={BASE_PATH+"/image/logo_1.png"} width={22} height={22} alt=''/>            
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white rounded-[6px] px-[6px] py-[2px] text-[14px] border-0">
            Coming soon...
            <TooltipArrow className="fill-black" />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

const TextDisplay = ({ text }: {text: string}) => {
  const [shown, setShown] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current) {
      const pHeight = textRef.current.offsetHeight;
      const totalHeight = textRef.current?.scrollHeight;
      if (totalHeight  > pHeight) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    }
  }, [textRef.current]);

  return (
    <div className="flex flex-row w-full text-[14px] mr-[16px]">
      <div ref={textRef} style={{ lineHeight: "20px",wordBreak: 'break-all' }} className={classNames('flex-1', shown ? "" : "line-clamp-1")}>
        {text}
      </div>
      {showBtn && (
        <div className='ml-[5px] underline underline-offset-1 cursor-pointer hover:text-[#C8FF00]' onClick={(e)=>{
          setShown(!shown)
          e.stopPropagation()
        }}>{!shown ? 'more':'less'}</div>
      )}
    </div>
  );
};
