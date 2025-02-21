import { CallOnIcon, RateIcon, RatingIcon } from "@/lib/icons";
import { KOLItemInfo } from "@/types";
import classNames from "classnames";
import { Rating, Avatar, AvatarGroup, Checkbox, Chip } from "@mui/material";
import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { TagList } from "@/components/Common";
import { useSelectedKOL } from "@/hooks/useKOL";
import { timeAgo } from "@/lib/utils";

export const KOLItem = (props: KOLItemInfo & { index: number }) => {
  const { selected } = useSelectedKOL("kol");

  return (
    <div
      className={classNames(
        "relative flex flex-col gap-[8px] rounded-[20px] p-[16px] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition-colors duration-300 cursor-pointer",
        "border-[1px] border-dashed hover:border-[#555F32] hover:bg-[#FBFFEC]",
        selected === props?.user_id + ""
          ? "border-[#555F32] bg-[#FBFFEC]"
          : "border-[transparent] bg-[#FFFFFF]"
      )}
    >
      <div className="absolute top-[-2px] left-[-2px] bg-[#C8FF00] text-black text-[12px] font-medium rounded-tl-[20px] rounded-br-[20px] px-[12px] h-[20px] flex items-center justify-center">
        # {props?.index + 1}
      </div>
      <Section1 {...props} />
      <KOLDataInfo {...props} />
    </div>
  );
};

function Section1(props: KOLItemInfo) {
  const { selected } = useSelectedKOL("kol");

  return (
    <div className="flex flex-row gap-[8px] justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="relative w-[50px] h-[50px]">
          {props?.profile_image_url && props?.profile_image_url !== "" ? (
            <img
              src={props?.profile_image_url}
              width={50}
              height={50}
              className="rounded-full w-[50] h-[50] bg-gray-500"
              alt=""
            />
          ) : (
            <div className="rounded-full w-[50px] h-[50px] bg-gray-500" />
          )}
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[18px] text-black flex flex-row gap-[8px] items-center">
            <div className="text-[20px] font-bold">{props?.name}</div>
            <div className="text-[12px]">
              {"@" + props?.twitter_handle ?? props?.user_name}
            </div>
          </div>
          <div className="text-[12px] text-[#000] h-[20px] flex flex-row gap-[6px] justify-start flex-wrap">
            <Chip
              label={`Feeds: ${props?.tweet_count}`}
              sx={{
                height: "100%",
                backgroundColor: "#E1F3FF",
                "&.MuiChip-root": { borderRadius: "6px" },
                "&.MuiChip-root .MuiChip-label": { padding: "0px 6px" },
              }}
            />
            <TagList
              tag={["Zoo", "Agent", "Sci", "NFT"]}
              className="h-[20px]"
            />
          </div>
        </div>
      </div>
      {selected === props?.user_id + "" && (
        <div className="w-[24px] h-[24px] rounded-[6px] border-[1px] border-[#A6A6A6] flex items-center justify-center">
          <Checkbox
            {...{ inputProps: { "aria-label": "Checkbox demo" } }}
            icon={<FavoriteBorder sx={{ width: 16, height: 16 }} />}
            checkedIcon={<Favorite />}
          />
        </div>
      )}
    </div>
  );
}

export function KOLDataInfo(props: KOLItemInfo) {
  const [rateValue, setRateValue] = React.useState<number | null | undefined>(props?.rate);

  return (
    <div className="flex flex-row justify-between gap-[16px] items-center">
      {/* Recent calls */}
      <div
        className={classNames(
          "flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]"
        )}
      >
        <CallOnIcon className="mt-[3px] text-[#00CAAF]" />
        <div className="flex flex-col font-semibold">
          <div className="text-[12px]">Recent calls</div>
          <div className="text-[10px]">
            <AvatarGroup
              spacing={4}
              max={8}
              total={props?.token_info?.length}
              sx={{
                "& .MuiAvatar-root": {
                  width: 24,
                  height: 24,
                  fontSize: "12px",
                  fontWeight: 500,
                },
                display: "flex",
                justifyContent: "start",
              }}
            >
              {props?.token_info?.map((tokenItem) => {
                return (
                  <Avatar
                    key={tokenItem?.token_address}
                    alt={tokenItem?.name}
                    src={tokenItem?.logo}
                  />
                );
              })}
            </AvatarGroup>
          </div>
        </div>
      </div>
      {/* Win Rate */}
      <div
        className={classNames(
          "flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]"
        )}
      >
        <RateIcon />
        <div className="flex flex-col font-semibold">
          <div className="text-[12px]">Win Rate(30D)</div>
          <div className="text-[14px]">{(props?.winning_rate_30d ?? 0) * 100}%</div>
        </div>
      </div>
      {/* Last Active */}
      <div
        className={classNames(
          "flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]"
        )}
      >
        <AccessTimeFilledIcon
          htmlColor="#951BFF"
          sx={{ width: "16px", height: "16px" }}
        />
        <div className="flex flex-col font-semibold">
          <div className="text-[12px]">Last Active</div>
          <div className="text-[14px]">
            {timeAgo(
              props?.token_info?.[props?.token_info?.length - 1]?.call_time
            )}
          </div>
        </div>
      </div>
      {/* Rating */}
      <div
        className={classNames(
          "flex flex-row gap-[4px] justify-center p-[8px] h-[51px] rounded-[6px]"
        )}
      >
        <RatingIcon />
        <div className="flex flex-col font-semibold">
          <div className="text-[12px]">Rating</div>
          <div className="text-[14px]">
            <Rating
              name="simple-controlled"
              value={rateValue}
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
              readOnly
              sx={{ color: "#FF5900", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
