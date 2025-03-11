import { KOLItemInfo } from "@/types"
import { useEffect, useState } from "react"
import { Close as CloseIcon, Cached as CachedIcon } from "@mui/icons-material"
import { Button, Modal, Box } from "@mui/material"
import classNames from "classnames"
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material"
import { ButtonStyled, TagList } from "@/components/Common"

export default function RecommendModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) {
  const types = [
    { key: "Zoo", value: "zoo" },
    { key: "Art", value: "art" },
    { key: "Cele", value: "cele" },
    { key: "AI", value: "ai" },
    { key: "Desci", value: "desci" },
    { key: "L1", value: "l1" },
  ]
  const [selectedType, setSelectedType] = useState<string>("zoo")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [list, setList] = useState<KOLItemInfo[]>([
    {
      user_id: "1",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "2",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "3",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "4",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "5",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "6",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "7",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "8",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      user_id: "9",
      name: "Guy Hawkins",
      twitter_handle: "Paradigm",
      user_name: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
  ])

  const handleCheckboxChange = (value: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(value)) {
        return prevSelectedItems.filter((i) => i !== value)
      } else {
        return [...prevSelectedItems, value]
      }
    })
  }

  useEffect(() => {
    localStorage.setItem("showRecoKOl", "1")
  }, [])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "840px",
          bgcolor: "background.paper",
          padding: "24px",
          borderRadius: "16px",
          maxHeight: "80vh",
          outline: "none",
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-[24px] font-semibold">You might like them?</div>
          <div className="" onClick={() => setOpen(false)}>
            <CloseIcon className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-[16px] mt-[20px]">
          <div className="flex flex-row items-center gap-[10px]">
            {types?.map((item, index) => {
              return (
                <div
                  key={item?.value + "_" + index}
                  className={classNames(
                    "px-[20px] h-[40px] text-[16px] flex items-center justify-center rounded-[6px] border-[1px] cursor-pointer",
                    selectedType === item?.value
                      ? "border-[transparent] bg-[#C8FF00] "
                      : "border-[#EEEEEE] bg-white"
                  )}
                  onClick={() => setSelectedType(item?.value)}
                >
                  {item?.key}
                </div>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap gap-[20px]">
            {list?.map((item, index) => {
              return (
                <KOLItem
                  key={item?.user_id + "_" + index}
                  {...item}
                  selectedItems={selectedItems}
                  onClick={(value) => handleCheckboxChange(value)}
                />
              )
            })}
          </div>
        </div>
        <div className="flex items-center justify-center mt-[20px] relative">
          <div className="flex flex-row items-center gap-[6px] text-[14px] absolute left-0 cursor-pointer">
            <CachedIcon />
            Switch
          </div>
          <Button
            variant="contained"
            sx={{
              height: "50px",
              textTransform: "none",
              color: "black",
              backgroundColor: "#C8FF00",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: "600",
              padding: "0 50px",
              ...ButtonStyled,
            }}
          >
            Confirm {selectedItems ? `(${selectedItems?.length})` : ""}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

const KOLItem = (
  props: KOLItemInfo & {
    selectedItems: string[]
    onClick?: (value: string) => void
  }
) => {
  const isChecked = props?.selectedItems?.includes(props?.user_id ?? "")
  return (
    <div
      className={classNames(
        "border-[1px] w-[240px] h-[90px] rounded-[12px] flex flex-row items-center justify-center gap-[10px] cursor-pointer relative",
        isChecked ? "bg-[#FBFFEE] border-[#C8FF00]" : "border-[#EEEEEE]"
      )}
      onClick={() => props?.onClick?.(props?.user_id ?? "")}
    >
      <div className="w-[48px] h-[48px] rounded-full bg-[gray]"></div>
      <div className="flex flex-col">
        <div className="text-[16px] font-bold">{props?.name}</div>
        <div className="text-[12px] text-[#666666]">
          @{props?.twitter_handle} · {props?.user_name}
        </div>
        <TagList
          tag={["Agent", "Cele", "Zoo"]}
          className="h-[22px] text-[12px]"
        />
      </div>
      {isChecked && (
        <CheckCircleIcon
          htmlColor="#0ABF52"
          className="absolute right-[10px] top-[10px]"
        />
      )}
    </div>
  )
}
