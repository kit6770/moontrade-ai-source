import Loader from "@/components/Loader";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import { CallOnIcon, RateIcon, RatingIcon } from "@/lib/icons";
import { KOLInfo } from "@/types";
import classNames from "classnames";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Rating, Avatar, AvatarGroup, Checkbox } from "@mui/material";
import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function KOLRankMainContent() {
  const isMobile = getPlatformInfo()?.isMobile;
  const { data: kolCatorgy } = useSWR("kolCatorgy");
  const { data: selectedKOL } = useSWR("selectedKOL");
  const { trigger: tokenListTrigger, isMutating } = useSWRMutation<KOLInfo[]>(
    `api:/trending_tokens/rank`
  );

  const [kolData, setKolData] = useState<KOLInfo[]>([
    {
      id: 1,
      name: "Edwards",
      handle: "Paradigm",
    },
    {
      id: 2,
      name: "Edwards",
      handle: "Paradigm",
    },
    {
      id: 3,
      name: "Edwards",
      handle: "Paradigm",
    },
    {
      id: 4,
      name: "Edwards",
      handle: "Paradigm",
    },
    {
      id: 5,
      name: "Edwards",
      handle: "Paradigm",
    },
  ]);

  const { trigger: updatesSelectedKOL } = useSWRMutation<string>("selectedKOL");
  const { trigger: updateSelectedKOLInfo } =
    useSWRMutation<KOLInfo>("selectedKOLInfo");

  return (
    <div
      className={classNames(
        "relative flex flex-auto flex-col gap-[16px] pb-[16px] md:pr-[16px]",
        isMobile
          ? "h-full overflow-auto"
          : "overflow-hidden hover:overflow-auto"
      )}
      style={{ height: `calc(100vh - 144px)` }}
    >
      {kolData?.map((item, index) => {
        return (
          <div
            key={item?.id}
            className="relative"
            onClick={() => {
              updatesSelectedKOL(item?.id);
              updateSelectedKOLInfo(JSON.stringify(item));
            }}
          >
            <KOLItem {...item} index={index} />
          </div>
        );
      })}
      {isMutating && <Loader />}
    </div>
  );
}

const KOLItem = (props: KOLInfo & { index: number }) => {
  const { data: selectedKOL } = useSWR("selectedKOL");

  return (
    <div
      className={classNames(
        "relative flex flex-col gap-[16px] rounded-[20px] p-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition-colors duration-300 cursor-pointer",
        "border-[2px] border-dashed hover:border-[#555F32] hover:bg-[#FBFFEC]",
        selectedKOL === props?.id + ""
          ? "border-[#555F32] bg-[#FBFFEC]"
          : "border-[transparent] bg-[#FFFFFF]"
      )}
    >
      <div className="absolute top-[-2px] left-[-2px] bg-[#C8FF00] text-black text-[14px] font-medium rounded-tl-[20px] rounded-br-[20px] px-[12px] h-[24px] flex items-center justify-center">
        # {props?.index + 1}
      </div>
      <Section1 {...props} />
      <Section2 {...props} />
    </div>
  );
};

function Section1(props: KOLInfo) {
  const { data: selectedKOL } = useSWR("selectedKOL");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="flex flex-row gap-[16px] justify-between">
      <div className="flex flex-row gap-[16px] items-center">
        <div className="relative w-[60px] h-[60px]">
          {props?.avatar && props?.avatar !== "" ? (
            <img
              src={props?.avatar}
              width={60}
              height={60}
              className="rounded-full w-[64] h-[64] bg-gray-500"
              alt=""
            />
          ) : (
            <div className="rounded-full w-[64] h-[64] bg-gray-500" />
          )}
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[18px] text-black flex flex-row gap-[8px] items-center">
            <div className="text-[24px] font-bold">{props?.name}</div>
            <div className="text-[12px]">{"@" + props?.handle}</div>
          </div>
          <div className="text-[14px] text-[#000] h-[24px] flex flex-row gap-[6px] justify-start flex-wrap">
            <div className="bg-[#E1F3FF] rounded-[6px] px-[6px]">
              Feeds: 289
            </div>
            <div className="bg-[#C7FFED] rounded-[6px] px-[6px]">Zoo</div>
            <div className="bg-[#C7D2FF] rounded-[6px] px-[6px]">Agent</div>
            <div className="bg-[#FCC7FF] rounded-[6px] px-[6px]">Sci</div>
            <div className="bg-[#FFE2C7] rounded-[6px] px-[6px]">NFT</div>
          </div>
        </div>
      </div>
      {selectedKOL === props?.id + "" && (
        <div className="w-[36px] h-[36px] rounded-[10px] border-[1px] border-[#A6A6A6] flex items-center justify-center">
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </div>
      )}
    </div>
  );
}

function Section2(props: KOLInfo) {
  const { data: selectedKOL } = useSWR("selectedKOL");
  const [value, setValue] = React.useState<number | null>(5);

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
              total={36}
              sx={{
                "& .MuiAvatar-root": {
                  width: 24,
                  height: 24,
                  fontSize: "12px",
                  fontWeight: 500,
                },
              }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
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
          <div className="text-[14px]">38.65%</div>
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
          <div className="text-[14px]">3h</div>
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
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ color: "#FF5900", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
