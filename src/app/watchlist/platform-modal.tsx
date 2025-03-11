import { KOLItemInfo } from "@/types"
import { useState } from "react"
import { Close as CloseIcon, Cached as CachedIcon } from "@mui/icons-material"
import { Button, Modal, Box, TextField, InputAdornment } from "@mui/material"
import classNames from "classnames"
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UnCheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { ClearAllIcon } from "@/lib/icons"
import { ButtonStyled } from "@/components/Common"

export default function PlatformModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) {
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
  const [selectedItems, setSelectedItems] = useState<KOLItemInfo[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const handleCheckboxChange = (value: KOLItemInfo) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(value)) {
        return prevSelectedItems.filter((i) => i?.user_id !== value?.user_id)
      } else {
        return [...prevSelectedItems, value]
      }
    })
  }

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
          width: "720px",
          bgcolor: "white",
          boxShadow: 24,
          padding: "0",
          borderRadius: "16px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col" style={{ height: "calc(80vh - 82px)" }}>
          <div className="h-[45px] px-[30px] flex flex-row items-center justify-between border-b-[1px] boprder-[#00000026] text-[16px] font-semibold">
            From Platform ({selectedItems?.length}/100)
          </div>
          <div
            className="flex flex-row justify-between"
            style={{ height: "calc(80vh - 82px - 45px)" }}
          >
            <div
              className="w-[450px] h-full flex flex-col bg-[#FAFAFA] overflow-hidden"
              style={{ boxShadow: "1px 0px 0px 0px #97979733" }}
            >
              <TextField
                variant="outlined"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-input": {
                    borderColor: "#97979780",
                    borderRadius: "10px",
                  },
                  padding: "16px",
                }}
              />
              <div className="flex-1 h-full flex flex-col gap-[20px] overflow-auto hide-scrollbar">
                {list?.map((item, index) => {
                  return (
                    <KOLItem
                      key={item?.user_id + "_" + index}
                      {...item}
                      selectedItems={selectedItems}
                      onClick={() => handleCheckboxChange(item)}
                    />
                  )
                })}
              </div>
            </div>
            <div className="flex-1 pt-[16px] flex flex-col gap-[10px]">
              <div className="text-[14px] px-[16px] font-medium flex flex-row items-center justify-between">
                <div>Selected({selectedItems?.length}):</div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#FF6868] flex items-center justify-center cursor-pointer">
                  <ClearAllIcon onClick={() => setSelectedItems([])} />
                </div>
              </div>
              <div className="flex flex-col gap-[20px] overflow-auto hide-scrollbar">
                {selectedItems?.map((item, index) => {
                  return (
                    <KOLItem
                      key={item?.user_id + "_" + index}
                      {...item}
                      selectedItems={selectedItems}
                      onClick={(value) => handleCheckboxChange(item)}
                      action={"delete"}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[82px] px-[16px] flex items-center justify-end gap-[16px] border-t-[1px] boprder-[#00000026]">
          <Button
            variant="contained"
            sx={{
              height: "42px",
              textTransform: "none",
              color: "#5E6272",
              backgroundColor: "#F1F3F5",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: "600",
              padding: "0 50px",
              ...ButtonStyled,
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "42px",
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
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

const KOLItem = (
  props: KOLItemInfo & {
    selectedItems: KOLItemInfo[]
    onClick?: (value: string) => void
    action?: "delete"
  }
) => {
  const isChecked = props?.selectedItems?.find(
    (o) => o?.user_id === props?.user_id
  )
  return (
    <div
      className={classNames(
        "w-full px-[16px] rounded-[6px] flex flex-row items-center justify-between gap-[10px] cursor-pointer hover:bg-[#FBFFEC]"
      )}
      onClick={() => props?.onClick?.(props?.user_id ?? "")}
    >
      <div className="flex flex-row items-center gap-[10px]">
        <div className="w-[48px] h-[48px] rounded-full bg-[gray]"></div>
        <div className="flex flex-col">
          <div className="text-[16px] font-bold">{props?.name}</div>
          <div className="text-[12px] text-[#666666]">{props?.user_name}</div>
          <div className="text-[12px] text-[#333]">{props?.user_name}</div>
        </div>
      </div>
      {props?.action === "delete" ? (
        <div>
          <CancelIcon htmlColor="rgba(0, 0, 0, 0.3)" />
        </div>
      ) : (
        <div>
          {isChecked ? (
            <CheckCircleIcon htmlColor="#0ABF52" />
          ) : (
            <UnCheckCircleIcon htmlColor="rgba(0, 0, 0, 0.3)" />
          )}
        </div>
      )}
    </div>
  )
}
