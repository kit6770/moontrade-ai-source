import { TimeFilterType } from "@/types";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Check as CheckIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

export default function TimeFilter({
  type,
  timeList,
}: {
  type: "watch" | "kol";
  timeList: TimeFilterType[];
}) {
  const { data: timeType } = useSWR(
    type === "watch" ? "watchTimeType" : "kolTimeType"
  );
  const { trigger: setTimeType } = useSWRMutation(
    type === "watch" ? "watchTimeType" : "kolTimeType"
  );

  const selectedTime =
    timeList?.find((item) => item?.value === timeType) ?? timeList[0];

  const [timeAnchorEl, setTimeAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  return (
    <div>
      <div className="flex items-center justify-center cursor-pointer bg-white text-black font-semibold lg:w-[175px] rounded-[12px] opacity-50">
        <Button
          id="timeType-button"
          aria-controls={Boolean(timeAnchorEl) ? "timeType-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(timeAnchorEl) ? "true" : undefined}
          onClick={(event) => {
            setTimeAnchorEl(event.currentTarget);
          }}
          className="w-full h-full"
          sx={{ textTransform: "none" }}
        >
          <div className="w-full px-[10px] flex flex-row items-center justify-between text-black">
            <div className="flex-1 flex text-[16px]">
              {selectedTime?.simpleName}
            </div>
            <ArrowDropDownIcon />
          </div>
        </Button>
      </div>
      <Menu
        id="timeType-menu"
        anchorEl={timeAnchorEl}
        open={Boolean(timeAnchorEl)}
        onClose={() => setTimeAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "timeType-button",
        }}
      >
        {timeList?.map((item) => (
          <MenuItem
            key={item?.value}
            onClick={() => {
              setTimeType(item?.value);
              setTimeAnchorEl(null);
            }}
          >
            <div className="flex items-center">
              <div className="w-[40px]">
                {selectedTime?.value === item?.value && <CheckIcon />}
              </div>
              <div className="text-[16px] text-black">{item?.name}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
