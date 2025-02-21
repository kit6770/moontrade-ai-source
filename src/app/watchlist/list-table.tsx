import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  AvatarGroup,
  Rating,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Delete as DeleteIcon, X } from "@mui/icons-material";
import { BaseTooltip } from "@/components/ToolTip";
import { useSelectedKOL } from "@/hooks/useKOL";
import classNames from "classnames";
import { timeAgo } from "@/lib/utils";
import { KOLItemInfo } from "@/types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "@/lib/icons";

export default function ListTable({ KOLList }: { KOLList: KOLItemInfo[] }) {
  const { selected, setSelected, setSelectedInfo } = useSelectedKOL("watch");

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"lastActive" | "winRate">("winRate");
  const [hoveredRow, setHoveredRow] = useState<string>("");

  const handleRequestSort = (property: "lastActive" | "winRate") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id: string) => {
    // setData((prevData) => prevData.filter((row) => row.id !== id));
    alert(id);
  };

  const visibleRows = useMemo(
    () =>
      KOLList.sort((a, b)=>{
          if (order === "desc") {
            return (b?.[orderBy] ?? 0) - (a?.[orderBy] ?? 0);
          } else {
            return (a?.[orderBy] ?? 0) - (b?.[orderBy] ?? 0);
          }
        }),
    [order, orderBy]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderTop: "1px solid #F3F1F1",
        borderBottom: "1px solid #F3F1F1",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {visibleRows?.map((row) => (
            <TableRow
              role="checkbox"
              key={row.name}
              hover
              selected={selected === row?.name}
              onClick={() => {
                setSelected(row?.name === selected ? null : row?.name);
                setSelectedInfo(
                  row?.name === selected ? null : JSON.stringify(row)
                );
              }}
              onMouseEnter={() => setHoveredRow(row?.name)}
              onMouseLeave={() => setHoveredRow("")}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:not(:last-child)": { borderBottom: "1px solid #F3F1F1" },
                cursor: "pointer",
                "&.Mui-selected": { backgroundColor: "#FBFFEC" },
                height: "70px",
                padding: "0",
                "&.MuiTableRow-hover:hover": { backgroundColor: "#fafafa" },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ padding: "0 0 0 16px" }}
              >
                <div className="flex flex-row items-center gap-[8px]">
                  <div className="w-[34px] h-[34px] rounded-full bg-[gray] relative">
                    <img
                      src={row?.profile_image_url}
                      alt="avatar"
                      className="w-[34px] h-[34px] rounded-full"
                    />
                    {row?.twitter_handle && (
                      <div className="w-[16px] h-[16px] rounded-full bg-black absolute bottom-[-6px] right-[0] border-[1px] border-[white] flex items-center justify-center">
                        <X
                          sx={{
                            width: "10px",
                            height: "10px",
                            color: "white",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[14px] font-semibold">{row.name}</div>
                    <div className="text-[12px]">
                      @{row?.twitter_handle ?? row?.user_name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell sx={{ padding: "0 0 0 16px" }}>
                <AvatarGroup
                  spacing={4}
                  max={6}
                  total={row?.token_info?.length}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 24,
                      height: 24,
                      fontSize: "12px",
                    },
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {row?.token_info?.map((tokenItem) => {
                    return (
                      <Avatar
                        key={tokenItem?.token_address}
                        alt={tokenItem?.name}
                        src={tokenItem?.logo}
                      />
                    );
                  })}
                </AvatarGroup>
              </TableCell>
              <TableCell sx={{ padding: "0 0 0 16px" }}>
                <div
                  className={classNames(
                    "text-[14px]",
                    (row?.winning_rate_30d ?? 0) > 0
                      ? "text-[#00B953]"
                      : "text-[#FF543D]"
                  )}
                >
                  {`${(row?.winning_rate_30d ?? 0) > 0 ? "+" : "-"}${
                    (row?.winning_rate_30d ?? 0) * 100
                  }%`}
                </div>
              </TableCell>
              <TableCell sx={{ padding: "0 0 0 16px" }}>
                <div className="text-[#000] text-[14px]">
                  {timeAgo(
                    row?.token_info?.[row?.token_info?.length - 1]?.call_time
                  )}
                </div>
              </TableCell>
              <TableCell sx={{ padding: "0 0 0 16px" }}>
                <Rating
                  name="simple-controlled"
                  value={row?.rate}
                  // onChange={(event, newValue) => {
                  //   // setValue(newValue);
                  // }}
                  readOnly
                  sx={{ color: "#FF5900", fontSize: "14px" }}
                />
              </TableCell>
              <TableCell sx={{ padding: "0 16px" }}>
                <div className="w-[32px] h-[32px]">
                  {(selected === row.name || hoveredRow === row.name) && (
                    <div className="bg-white flex items-center justify-center rounded-[10px] border-[1px] border-[#DDDDDD]">
                      <BaseTooltip title="Remove" placement="top">
                        <IconButton
                          onClick={(e) => {
                            handleDelete(row.name);
                            e.stopPropagation();
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const headCells = [
  { id: "name", label: "Name", sort: false },
  { id: "calls", label: "Recent Calls(30D)", sort: false },
  { id: "winRate", label: "Win Rate", sort: true },
  { id: "lastActive", label: "Last Active", sort: true },
  { id: "rating", label: "Rating", sort: false },
];

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: any;
}) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              sortDirection={
                headCell?.sort && orderBy === headCell.id ? order : false
              }
              sx={{ fontSize: "12px", height: "40px", padding: "0 10px" }}
            >
              {headCell?.sort ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => onRequestSort(headCell.id)}
                >
                  {headCell.label}
                  {orderBy !== headCell.id && (
                    <div className="flex flex-col gap-[3px] ml-[8px]">
                      <ArrowDropUpIcon />
                      <ArrowDropDownIcon />
                    </div>
                  )}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          );
        })}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
