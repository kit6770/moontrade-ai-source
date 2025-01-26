'use client'

import SideContent from './side-content'
import MainContent from './main-content'
import classNames from 'classnames'
import { LogoWithTextIcon } from '@/lib/icons'
import GlobalContextProvider from './app-context'
import { getPlatformInfo } from '@/lib/getPlatformInfo'
import useSWRMutation from 'swr/mutation'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Home() {
  return (
    <GlobalContextProvider>
      <main className='h-screen overflow-hidden'>
        <Header />
        <Content />
      </main>
    </GlobalContextProvider>
  );
}

function Header() {
  // const { data: localData } = useSWR('本地状态，会存进localStorage')

  return (
    <header className="flex flex-row h-[80px] bg-white justify-between items-stretch border-b border-[#F3F3F3] lg:min-w-[1176px]">
      <div className="flex items-center gap-[16px] px-[16px]">
        <LogoWithTextIcon/>
        <div className="text-[18px] font-semibold">AI Rank</div>
      </div>
      <div className="flex items-center gap-[16px] px-[16px]">
        {/* <button className="font-semibold bg-[#FAF5E3] text-[#9E7A28] text-[16px] rounded-[12px] px-[20px] h-[50px]">
          Invite code
        </button> */}
        <button className="font-semibold bg-[#C8FF00] text-black text-[16px] rounded-[12px] px-[20px] h-[50px] opacity-50 cursor-not-allowed">
          Login
        </button>
        {/* <div>
          <button className="font-semibold text-black text-[16px]">EN v</button>
        </div> */}
      </div>
    </header>
  )
}

function Content() {
  const isMobile = getPlatformInfo()?.isMobile;

  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px]">
      <h2 className="text-[32px] font-semibold text-center py-[16px]">Trending Tokens Powered By AI</h2>
      <TabSet/>
      <section className="flex flex-row justify-start items-start">
        <MainContent/>
        {!isMobile ? <SideContent />: null}
      </section>
    </div>
  )
}

function TabSetItem({ value, defaultChecked = false }: { value: string, defaultChecked?: boolean}) {
  const {trigger: updateTimeType} = useSWRMutation<string>('timeType')

  return (
    <label className="cursor-pointer flex flex-1 justify-stretch items-center">
      <input type="radio" className='peer hidden' name="time-tab" value={value} defaultChecked={defaultChecked} onChange={(e)=>{
        updateTimeType(e.target.value);
      }}/>
      <div className={
        classNames(
          'text-center w-full h-full flex items-center justify-center text-[#666666] rounded-[8px] text-[16px] font-semibold transition-all duration-300',
          'peer-checked:text-[#000000] peer-checked:bg-white',
          defaultChecked && 'text-[#000000] bg-white',
          "hover:bg-white hover:text-[#000000]"
        )
      }>
        {value}
      </div>
    </label>
  )
}

function TabSet() {
  const { data: timeType } = useSWR('timeType')
  const {trigger: updateTimeType} = useSWRMutation<string>('timeType')

  useEffect(()=>{
    if (timeType === null) {
      updateTimeType('5m')
    }
  }, [timeType])
  
  return (
    <div className="flex flex-row justify-between gap-[19px] h-[48px] leading-[48px]">
      <div className="flex flex-auto flex-row justify-between items-stretch bg-[#F6F6F6] rounded-[12px] p-[4px] gap-[4px]">
        <TabSetItem value="5m" defaultChecked={timeType==='5m'}/>
        <TabSetItem value="1h" defaultChecked={timeType==='1h'}/>
        <TabSetItem value="6h" defaultChecked={timeType==='6h'}/>
        <TabSetItem value="24h" defaultChecked={timeType==='24h'}/>
      </div>

      <div className="flex items-center justify-center bg-[#F6F6F6] lg:w-[175px] px-[10px] rounded-[12px] opacity-50">
        <div className="w-full text-center text-[16px] text-black font-semibold opacity-50 cursor-not-allowed">Filter</div>
      </div>
    </div>
  )
}
