'use client'

import SideContent from '@/app/side-content';
import GlobalContextProvider from '../app-context';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Summary() {
  return <GlobalContextProvider>
    <TooltipProvider>
      <div className='p-[16px] w-screen h-screen overflow-auto'>
        <SideContent/>
      </div>
    </TooltipProvider>
  </GlobalContextProvider>
}