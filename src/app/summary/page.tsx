"use client"

import SideContent from "@/app/side-content"
import GlobalContextProvider from "../app-context"

export default function Summary() {
  return (
    <GlobalContextProvider>
      <div className="p-[16px] w-screen h-screen overflow-auto hide-scrollbar">
        <SideContent />
      </div>
    </GlobalContextProvider>
  )
}
