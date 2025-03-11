import { Modal, Box } from "@mui/material"
import { useState } from "react"
import {
  FilterAltOutlined as FilterAltOutlinedIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material"
import classNames from "classnames"
import { PageType } from "@/types"
import { useSelectedFilter } from "@/hooks/useKOL"

export default function Filter({
  containerRef,
  type,
}: {
  containerRef: React.RefObject<null>
  type: PageType
}) {
  const { filterOptions, setFilterOptions } = useSelectedFilter(type)

  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const sortList = ["Top Mention", "XFeed", "Last Active"]
  const tagList = ["DEV", "Builder", "KOL"]
  const importList = ["PUMP.NOW", "X(Twitter)"]

  return (
    <div>
      <div
        className="flex items-center justify-center bg-white lg:w-[175px] px-[20px] rounded-[12px] opacity-50 cursor-not-allowed"
        onClick={() => setFilterOpen(true)}
      >
        <div className="w-full flex flex-row items-center justify-between text-center text-[14px] text-black">
          <div className="flex-1 flex flex-row items-center gap-[6px]">
            <FilterAltOutlinedIcon sx={{ width: "18px", height: "18px" }} />
            Filter
          </div>
          <ArrowDropDownIcon />
        </div>
      </div>
      <Modal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        container={containerRef.current}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "rgba(0, 0, 0, 0)" },
          },
        }}
      >
        <Box
          className="lg:w-[1160px] absolute left-1/2 top-[120px] text-[14px] transform -translate-x-1/2 bg-white rounded-[12px] p-[16px] flex flex-col gap-[16px] outline-none"
          style={{ boxShadow: "0px 10px 20px 0px #00000026" }}
        >
          <div className="flex flex-row items-center gap-[40px]">
            <div>Sort:</div>
            <div className="flex flex-row items-center gap-[10px]">
              {sortList?.map((item, index) => (
                <div
                  key={item + "_" + index}
                  className={classNames(
                    "h-[32px] text-[#000]  border-[1px] border-[#eee] rounded-[6px] px-[16px] flex items-center justify-center cursor-pointer",
                    filterOptions?.sort === item ? "bg-[#C8FF00]" : "bg-white"
                  )}
                  onClick={() => {
                    setFilterOptions(
                      JSON.stringify({
                        ...filterOptions,
                        sort: item,
                      })
                    )
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[40px]">
            <div>Tag:</div>
            <div className="flex flex-row items-center gap-[10px]">
              {tagList?.map((item, index) => (
                <div
                  key={item + "_" + index}
                  className={classNames(
                    "h-[32px] text-[#000] border-[1px] border-[#eee] rounded-[6px] px-[16px] flex items-center justify-center cursor-pointer",
                    (filterOptions?.tag || [])?.includes(item)
                      ? "bg-[#C8FF00]"
                      : "bg-white"
                  )}
                  onClick={() => {
                    let nextTag: string[] = []
                    const preTag = (filterOptions?.tag ?? []) as string[]
                    if (preTag.includes(item)) {
                      nextTag = preTag.filter((i) => i !== item)
                    } else {
                      nextTag = [...preTag, item]
                    }
                    setFilterOptions(
                      JSON.stringify({
                        ...filterOptions,
                        tag: nextTag,
                      })
                    )
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          {type === "watch" && (
            <div className="flex flex-row items-center gap-[40px]">
              <div>Import: </div>
              <div className="flex flex-row items-center gap-[10px]">
                {importList?.map((item, index) => (
                  <div
                    key={item + "_" + index}
                    className={classNames(
                      "h-[32px] text-[#000] border-[1px] border-[#eee] rounded-[6px] px-[16px] flex items-center justify-center cursor-pointer",
                      filterOptions?.import === item
                        ? "bg-[#C8FF00]"
                        : "bg-white"
                    )}
                    onClick={() => {
                      setFilterOptions(
                        JSON.stringify({
                          ...filterOptions,
                          import: item,
                        })
                      )
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
