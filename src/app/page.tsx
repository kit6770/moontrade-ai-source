'use client'

import SideContent from './side-content'
import MainContent from './main-content'
import classNames from 'classnames'
import { LogoWithTextIcon } from '@/lib/icons'
import { SWRConfig } from 'swr'

async function fetcher(url: string) {
  return fetch(url).then(res => res.json())
}

export default function Home() {
  return (
    <SWRConfig value={{ fetcher }}>
      <main>
        <Header />
        <Content />
      </main>
    </SWRConfig>
  );
}

function Header() {
  return (
    <header className="flex flex-row h-[80px] bg-white justify-between items-stretch border-b border-[#F3F3F3] min-w-[1176px]">
      <div className="flex items-center gap-[16px] px-[16px]">
        <LogoWithTextIcon/>
        <div className="text-[18px] font-semibold">AI Rank</div>
      </div>
      <div className="flex items-center gap-[16px] px-[16px]">
        {/* <button className="font-semibold bg-[#FAF5E3] text-[#9E7A28] text-[16px] rounded-[12px] px-[20px] h-[50px]">
          Invite code
        </button> */}
        <button className="font-semibold bg-[#C8FF00] text-black text-[16px] rounded-[12px] px-[20px] h-[50px]">
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
  return (
    <div className="flex flex-col w-[1176px] mx-auto gap-[16px]">
      <h2 className="text-[32px] font-semibold text-center py-[16px]">Trending Tokens Powered By AI</h2>
      <TabSet />
      <section className="flex flex-row gap-[16px] justify-start items-start">
        <MainContent />
        <SideContent />
      </section>
    </div>
  )
}

function TabSetItem({ value, defaultChecked = false }: { value: string, defaultChecked?: boolean }) {
  return (
    <label className="cursor-pointer flex flex-1 justify-stretch items-center">
      <input type="radio" className='peer hidden' name="time-tab" value={value} defaultChecked={defaultChecked} />
      <div className={
        classNames(
          'text-center w-full h-full flex items-center justify-center text-[#666666] rounded-[8px] text-[16px] font-semibold transition-all duration-300',
          'peer-checked:text-[#000000] peer-checked:bg-white',
          "hover:bg-white hover:text-[#000000]"
        )
      }>
        {value}
      </div>
    </label>
  )
}

function TabSet() {
  return (
    <div className="flex flex-row justify-between gap-[19px] h-[48px]">
      <div className="flex flex-auto flex-row justify-between items-stretch bg-[#F6F6F6] rounded-[12px] p-[4px] gap-[4px]">
        <TabSetItem value="5m" defaultChecked={true} />
        <TabSetItem value="1h" />
        <TabSetItem value="6h" />
        <TabSetItem value="24h" />
      </div>

      <div className="flex items-center justify-center bg-[#F6F6F6] w-[175px] rounded-[12px] opacity-50">
        <div className="w-full text-center text-[16px] text-black font-semibold">Filter</div>
      </div>
    </div>
  )
}
