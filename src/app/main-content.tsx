import { BASE_PATH } from '@/lib/constants'
import { CreateIcon, FeedsIcon, FromVIcon, GoldSmartMoneyIcon, LogoIcon, MCIcon, TelegramIcon, TwitterIcon, TwitterWhiteIcon, WebsiteIcon } from '@/lib/icons'
import { SmartMoneyInfo } from '@/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import Loader from './loader'
import { formatAddress, formatNumber, timeAgo } from '@/lib/utils'
import React from 'react'

export default function MainContent() {
  const { data: timeType } = useSWR('timeType', {fallbackData: '5m'})
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
        updateSelectedToken(list[0]?.token_address)
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

  // useEffect(()=>{
  //   const temp = [
  //     {id: 1,token_address: '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump'},
  //     {id: 2,token_address: 'GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump'},
  //     {id: 3,token_address: '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump'},
  //     {id: 4,token_address: 'GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump'},
  //     {id: 5,token_address: '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump'},
  //     {id: 6,token_address: 'GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump'},
  //     {id: 7,token_address: '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump'},
  //     {id: 8,token_address: 'GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump'},
  //   ]
  //   setTokenData(temp)
  //   updateSelectedToken(temp[0]?.token_address)
  // }, [timeType])

  const {trigger: updateSelectedToken } = useSWRMutation<string>('selectedToken')

  return (
    <div className="relative flex flex-auto flex-col gap-[16px] h-full overflow-auto pb-[150px] md:pr-[16px]" style={{height: `calc(100vh - 144px)`}}>
      {tokenData?.map((item, index)=>{
        return <div key={item?.id} className='relative' onClick={()=>updateSelectedToken(item?.token_address)}>
          <Item {...item}/>
          <div className="absolute top-[-1px] left-[-1px] bg-black text-[#C8FF00] text-[14px] font-medium rounded-tl-[20px] rounded-br-[20px] px-[12px] h-[24px] flex items-center justify-center"># {index+1}</div>
        </div>
      })}
      {isMutating && <Loader/>}
    </div>
  )
}

function Item(props: SmartMoneyInfo) {
  const { data: selectedToken } = useSWR('selectedToken')
  
  return (
    <div className={classNames(
      'relative flex flex-col gap-[16px] rounded-[20px] p-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition-colors duration-300 cursor-pointer',
      'border-[2px] hover:border-[#C8FF00] hover:bg-[#FBFFEC]',
      selectedToken?.toLowerCase() === props?.token_address?.toLowerCase() ? 'border-[#C8FF00] bg-[#FBFFEC]': 'border-[#F1F1F1] bg-[#FFFFFF]',
    )}>
      <Section1 {...props}/>
      <Section2 {...props}/>
      <Section3 {...props}/>
    </div>
  )
}

function Section1(props: SmartMoneyInfo) {
  return (
    <div className="w-full flex-1 flex flex-row gap-[16px]">
      <div className="relative w-[64px] h-[64px]">
        {props?.logo && props?.logo !=='' ? 
          <img src={props?.logo} width={64} height={64} className="rounded-full w-[64] h-[64] bg-gray-500" alt="" /> : 
          <div className='rounded-full w-[64] h-[64] bg-gray-500'/>}
        <img src={BASE_PATH + "/image/solana.png"} alt="" width={20} height={20} className="rounded-full absolute bottom-0 right-0"/>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[18px] flex flex-row gap-[4px] items-center">
          <div className="text-[24px] font-bold">{props?.symbol}</div>
          <div className="text-[12px] text-black">{`Ultra Sigma · ${formatAddress(props?.token_address)}`}</div>
        </div>
        <div className="text-[12px] font-semibold text-[#666] flex flex-row gap-[6px] justify-start flex-wrap">
          <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px] gap-[4px]">
            <FromVIcon/>
            <div>From: Trump</div>
            <div className='relative w-[23px]'>
              <div className='w-[18px] h-[18px] rounded-full bg-[#666]'></div>
              <div className='absolute bottom-0 left-[14px] w-[10px] h-[10px] rounded-full flex items-center justify-center bg-black overflow-hidden'>
                <TwitterWhiteIcon/>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px] gap-[4px]">
            <CreateIcon/>{timeAgo(props?.publish_time)}
          </div>
          {props?.launch_plat_name && props?.launch_plat_name !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <img src={BASE_PATH + "/image/pump.png"} width={16} height={16} alt='' />
          </div>}
          {props?.twitter_link && props?.twitter_link !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <TwitterIcon 
              color={'#666666'}
              className='scale-[0.6]' 
              onClick={()=>{
                window.open(props?.twitter_link, '_blank')
              }}
            />
          </div>}
          {props?.home_page && props?.home_page !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <WebsiteIcon 
              onClick={()=>{
                window.open(props?.home_page, '_blank')
              }}
            />
          </div>}
          {props?.telegram_link && props?.telegram_link !== '' && <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">
            <TelegramIcon
              onClick={()=>{
                window.open(props?.telegram_link, '_blank')
              }}
            />
          </div>}
        </div>
      </div>
    </div>
  )
}

function Section2(props: SmartMoneyInfo) {
  const list = [{
    title: 'SmartMoney',
    type: 'smartmoney',
    icon: <GoldSmartMoneyIcon/>,
    value: props?.smart_wallet_count,
    isPositive: props?.smart_wallet_count_change,
    change: props?.smart_wallet_count_change
  }, {
    title: 'Feeds',
    type: 'feeds',
    icon: <FeedsIcon/>,
    value: props?.x_feed_num,
    isPositive: props?.x_feed_num_change,
    change: props?.x_feed_num_change
  }, {
    title: 'MC',
    type: 'mc',
    icon: <MCIcon/>,
    value: props?.market_value,
    isPositive: props?.market_value_change,
    change: props?.market_value_change
  }]
  return (
    <div className="flex flex-row justify-start gap-[16px] flex-wrap cursor-pointer">
      {list?.map(item=>{
        return <div key={item?.title} className={classNames("flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]", 
          // item?.type==='mc' ? '' : isSelected ? 'bg-[#F2FEC5]': '',
          item?.type!=='mc' && 'hover:bg-[#F2FEC5]'
        )}>
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
      <TextDisplay text={props?.description ?? ''}/>
      <div className="flex flex-row gap-[10px]">
        <div className="relative inline-block group">
          <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
            <div className="bg-black rounded-[3px] w-full h-full flex items-center justify-center">
              <LogoIcon className='scale-[1.5]'/>
            </div>
            {/* tooltip */}
            <div className="whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-[14px] px-2 py-1 rounded-[6px]">
              Coming soon...
              <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-black border-l-transparent border-r-transparent"></div>
            </div>
          </div>
        </div>

        <div className="relative inline-block group">
          <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
            <img src={BASE_PATH+"/image/logo_1.png"} width={22} height={22} alt=''/>
            {/* tooltip */}
            <div className="whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-[14px] px-2 py-1 rounded-[6px]">
              Coming soon...
              <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-black border-l-transparent border-r-transparent"></div>
            </div>
          </div>
        </div>
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
        <div className='underline underline-offset-1 cursor-pointer' onClick={()=>setShown(!shown)}>{!shown ? 'more':'less'}</div>
      )}
    </div>
  );
};
