import { Avatar, AvatarGroup, Rating, IconButton } from "@mui/material"
import { Delete as DeleteIcon, X } from "@mui/icons-material"
import { BaseTooltip } from "@/components/BaseTooltip"
import { useSelectedKOL } from "@/hooks/useKOL"
import { timeAgo, toFixedNumber } from "@/lib/utils"
import { KOLItemInfo } from "@/types"
import DataTable, { SortInfoType } from "@/components/table"
import { useState } from "react"

export default function ListTable({
  KOLList,
  loading,
}: {
  KOLList: KOLItemInfo[]
  loading?: boolean
}) {
  const { selected } = useSelectedKOL("watch")
  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    sortKey: "holders_num_change_3h",
    sortOrder: "desc",
  })

  const handleDelete = (id: string) => {
    // setData((prevData) => prevData.filter((row) => row.id !== id));
    alert(id)
  }

  const tableColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      // width: 160,
      render: (text: string | number, row: KOLItemInfo) => {
        return (
          <div className="flex flex-row items-center gap-[6px]">
            <div className="w-[34px] h-[34px] rounded-full bg-[gray] relative">
              {row?.profile_image_url && row?.profile_image_url !== "" ? (
                <img
                  src={row?.profile_image_url}
                  alt="avatar"
                  width={34}
                  height={34}
                  className="w-[34px] h-[34px] rounded-full"
                />
              ) : (
                <div className="w-[34px] h-[34px] rounded-full"/>
              )}
              {row?.twitter_handle && (
                <div className="w-[16px] h-[16px] rounded-full bg-black absolute bottom-[-6px] right-[0] border-[1px] border-[white] flex items-center justify-center">
                  <X sx={{ width: "10px", height: "10px", color: "white" }} />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-[14px] font-semibold break-words">
                {text}
              </div>
              <div className="text-[12px] text-[#666666]">
                @{row?.twitter_handle ?? row?.user_name}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      key: "calls",
      title: "Recent Calls(30D)",
      dataIndex: "calls",
      // width: 160,
      render: (text: string | number, row: KOLItemInfo) => {
        return (
          <AvatarGroup
            spacing={6}
            max={6}
            total={row?.token_info?.length}
            sx={{
              "& .MuiAvatar-root": { width: 24, height: 24, fontSize: "12px" },
              display: "flex",
              justifyContent: "start",
            }}
          >
            {row?.token_info?.map((tokenItem, tokenIndex) => {
              return (
                <Avatar
                  key={tokenItem?.token_address + "_" + tokenIndex}
                  alt={tokenItem?.name}
                  src={tokenItem?.logo}
                />
              )
            })}
          </AvatarGroup>
        )
      },
    },
    {
      key: "winning_rate_30d",
      title: "Win Rate",
      dataIndex: "winning_rate_30d",
      sortable: true,
      width: 100,
      render: (text: string | number) => {
        if (text) {
          let value = Number(text)
          if (value > 0) {
            return (
              <div className="text-[#00B953]">+{toFixedNumber(value, 2)}%</div>
            )
          } else {
            return (
              <div className="text-[#FF543D]">-{toFixedNumber(value, 2)}%</div>
            )
          }
        } else {
          return ""
        }
      },
    },
    {
      key: "last_call_time",
      title: "Last Active",
      dataIndex: "last_call_time",
      sortable: true,
      width: 120,
      render: (text: string | number, row: KOLItemInfo) => {
        return timeAgo(
          row?.token_info?.[row?.token_info?.length - 1]?.call_time
        )
      },
    },
    {
      key: "rate",
      title: "Rating",
      dataIndex: "rate",
      width: 80,
      render: (text: string | number, row: KOLItemInfo) => {
        return (
          <Rating
            name="simple-controlled"
            value={row?.rate}
            // onChange={(event, newValue) => {
            //   // setValue(newValue);
            // }}
            readOnly
            sx={{ color: "#FF5900", fontSize: "14px" }}
          />
        )
      },
    },
    {
      key: "action",
      title: "",
      dataIndex: "action",
      width: 60,
      render: (text: string | number, row: KOLItemInfo) => {
        return (
          <div className="w-[32px] h-[32px]">
            {selected === row.name && (
              <div className="bg-white flex items-center justify-center rounded-[10px] border-[1px] border-[#DDDDDD]">
                <BaseTooltip title="Remove" placement="top">
                  <IconButton
                    onClick={(e) => {
                      handleDelete(row?.name ?? "")
                      e.stopPropagation()
                    }}
                    color="secondary"
                  >
                    <DeleteIcon
                      htmlColor="#000"
                      sx={{ width: "16px", height: "16px" }}
                    />
                  </IconButton>
                </BaseTooltip>
              </div>
            )}
          </div>
        )
      },
    },
  ]

  // console.log("visibleRows", KOLList)

  return (
    <DataTable
      columns={tableColumns}
      dataSource={KOLList}
      isHover={true}
      loading={loading}
      sortInfo={sortInfo}
    />
  )
}
