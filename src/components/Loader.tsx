import React from "react"

export default function Loader() {
  return <div className="flex justify-center items-center h-full absolute top-0 left-0 w-full">
    <div className="w-10 h-10 border-4 border-t-transparent border-[#C8FF00] border-solid rounded-full animate-spin"></div>
  </div>
}

export const LoadingIcon = () => {
  return <div className="w-[20px] h-[20px] border-2 border-t-transparent border-[#C8FF00] border-solid rounded-full animate-spin"></div>
}