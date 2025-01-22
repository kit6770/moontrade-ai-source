import { LogoIcon } from '@/lib/icons'
import classNames from 'classnames'
export default function MainContent() {
  return (
    <div className="flex flex-auto flex-col gap-[16px]">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  )
}

function Item({ className = '' }: { className?: string, isFirst?: boolean }) {
  return (
    <div className={classNames(
      'relative flex flex-col gap-[16px] rounded-[20px] p-[20px] hover:p-[19px] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition-colors duration-300',
      'group border border-[#F1F1F1] hover:border-[#C8FF00] hover:border-[2px] bg-[#FFFFFF] hover:bg-[#FBFFEC]',
      className
    )}>
      <div className="absolute top-[-1px] left-[-1px] group-hover:top-[-2px] group-hover:left-[-2px] bg-black text-[#C8FF00] text-[14px] font-medium rounded-tl-[20px] rounded-br-[20px] px-[12px] h-[24px] flex items-center justify-center"># 1</div>

      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
}

function Section1() {
  return (
    <div>
      <div className="flex flex-row gap-[16px]">
        <div className="relative">
          <div className="bg-gray-500 w-[64px] h-[64px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-black rounded-full border-2 border-white"></div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[18px] font-semibold flex flex-row gap-[4px] items-center">
            <div className="text-[24px] font-bold">VEILL</div>
            <div className="text-[12px] text-[#9E7A28]">{'Ultra Sigma · 5VwjS...ump'}</div>
          </div>
          <div className="text-[12px] font-semibold flex flex-row gap-[6px] justify-start">
            <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">Form: Trump</div>
            <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]">30m</div>
            <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]"> </div>
            <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]"> </div>
            <div className="flex items-center justify-center px-[4px] bg-[#EAEAEA] rounded-[6px] h-[22px] min-w-[22px]"> </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  )
}

function Section2() {
  return (
    <div className="flex flex-row justify-start gap-[16px]">
        <div className="flex flex-row gap-[16px] bg-[#F2FEC5] w-[115px] h-[51px] rounded-[6px]"></div>
        <div className="flex flex-row gap-[16px] bg-[#F2FEC5] w-[115px] h-[51px] rounded-[6px]"></div>
        <div className="flex flex-row gap-[16px] bg-[#F2FEC5] w-[115px] h-[51px] rounded-[6px]"></div>
      </div>
  )
}

function Section3() {
  return (
    <div className="flex flex-row justify-between gap-[16px] items-center">
      <div className="flex flex-row gap-[16px] text-[14px]">
        {`$UsDT is a stablecoin linked to Donald Trump's persona, aiming more...`}
      </div>
      <div className="flex flex-row gap-[10px]">
        <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
          <div className="bg-black rounded-[3px] w-full h-full flex items-center justify-center">
            <LogoIcon className='scale-[1.5]'/>
          </div>
        </div>
        <div className="bg-[#ECECEC] rounded-[6px] p-[4px] w-[30px] h-[30px]">
          <div className="bg-black rounded-[3px] w-full h-full">
            
          </div>
        </div>
      </div>
    </div>
  )
}