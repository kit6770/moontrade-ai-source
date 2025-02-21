import {
  CommentIcon,
  LikeIcon,
  LogoIcon,
  LogoPumpIcon,
  ShareIcon,
  TwitterVIcon,
} from "@/lib/icons";
import { FeedInfo, TwitterFeedInfo } from "@/types";
import classNames from "classnames";
import { BaseTooltip } from "./ToolTip";
import { formatNumber, timeAgo } from "@/lib/utils";
import XIcon from '@mui/icons-material/X';

export default function TwitterItem(
  props: FeedInfo & { isQuote?: boolean; isReply?: boolean }
) {
  const actionList = [
    {
      key: "relpy",
      icon: <CommentIcon />,
      value: props?.reply_count,
    },
    {
      key: "share",
      icon: <ShareIcon />,
      value: (props?.quote_count ?? 0) + (props?.retweet_count ?? 0),
    },
    {
      key: "like",
      icon: <LikeIcon />,
      value: props?.favorite_count,
    },
  ];
  const mediaLength = (props?.medias || [])?.length;
  return (
    <div
      className={classNames(
        "flex flex-col gap-[10px] rounded-[6px] bg-[#F9F9F9]",
        props?.isQuote || props?.isReply ? "" : "p-[16px]"
      )}
    >
      {!(props?.isQuote || props?.isReply) && (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <LogoPumpIcon className="ml-[-5px] mr-[5px]" />
            <div className="text-[16px] font-bold">Pump.now</div>
          </div>
          <BaseTooltip title="View on Twitter" placement="top">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(props?.text_url, "_blank");
              }}
            >
              <XIcon />
            </div>
          </BaseTooltip>
        </div>
      )}
      <div className="flex flex-row items-center gap-[10px]">
        {!props?.isReply && (
          <div className="w-[48px] h-[48px] rounded-full bg-black">
            <img
              src={props?.profile_image_url}
              width={48}
              height={48}
              alt=""
              className="w-[48px] h-[48px] rounded-full"
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex flex-row items-center text-[16px] font-bold text-black gap-[6px]">
            {props?.name}
            {props?.official ? (
              <span>
                <TwitterVIcon />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="text-[12px] text-[#666]">
            @{props?.user_name} · Followers:{" "}
            {formatNumber(props?.followers_count)} ·{" "}
            {timeAgo(props?.create_at, true, true)}
          </div>
        </div>
      </div>
      <div className="text-[14px] text-black pb-[6px] break-all whitespace-pre-wrap">
        {props?.text?.replaceAll("\n\n", "\n")}
      </div>
      {props?.medias && props?.medias?.length > 0 && (
        <div className="grid grid-cols-2 gap-[8px] pb-[6px]">
          {props?.medias?.map((item, index) => {
            const isLast = mediaLength % 2 === 1 && index === mediaLength - 1;
            return (
              <img
                key={item?.media_key}
                src={item?.url}
                alt=""
                className={classNames(
                  "rounded-[10px] cursor-pointer",
                  isLast && "col-span-2"
                )}
                onClick={() => openModal(item?.url)}
              />
            );
          })}
        </div>
      )}
      {!props?.isQuote && (
        <div className="flex flex-row items-center gap-[16px]">
          {actionList?.map((item, index) => {
            return (
              <div
                key={item?.key}
                className={classNames(
                  "flex flex-row items-center gap-[4px]",
                  index === 2 ? "" : "flex-1"
                )}
              >
                <div>{item?.icon}</div>
                <div className="text-[14px]">{formatNumber(item?.value)}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function openModal(imageUrl: string) {
  if (!imageUrl || imageUrl === "") return;
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image") as HTMLImageElement;
  modal?.classList.remove("hidden");
  modalImage!.src = imageUrl;
}

export function QuoteTwitterItem(props: TwitterFeedInfo) {
  const actionList = [{
    key: 'relpy',
    icon: <CommentIcon/>,
    value: props?.reply_count
  }, {
    key: 'share',
    icon: <ShareIcon/>,
    value: ((props?.quote_count ?? 0) + (props?.retweet_count ?? 0))
  }, {
    key: 'like',
    icon: <LikeIcon/>,
    value: props?.favorite_count
  }]
  return <div className="flex flex-col p-[20px] gap-[10px] bg-[#F9F9F9]">
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-[8px] items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center"><LogoIcon/></div>
        <div className="text-[16px] font-bold">PeerX</div>
      </div>
      <div className="cursor-pointer" onClick={()=>{window.open(props?.text_url, '_blank')}}><XIcon/></div>
    </div>
    <TwitterItem {...props} isQuote />
    <div className="flex mb-[10px] p-[10px] rounded-[6px] border-[1px] border-[#DEDEDE]">
      <TwitterItem {...props?.related_tweets?.[0]} isQuote/>
    </div>
    <div className="flex flex-row items-center gap-[16px]">
      {actionList?.map((item, index)=>{
        return <div key={item?.key} className={classNames("flex flex-row items-center gap-[4px]", index===2 ? '': 'flex-1')}>
          <div>{item?.icon}</div>
          <div className="text-[14px]">{formatNumber(item?.value)}</div>
        </div>
      })}
    </div>
  </div>
}

export function ReplyTwitterItem(
  props: TwitterFeedInfo & { hasReply?: boolean }
) {
  return (
    <div className="flex flex-col p-[20px] gap-[10px] bg-[#F9F9F9]">
      {!props?.hasReply && (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-[8px] items-center">
            <div className="w-[16px] h-[16px] rounded-full bg-black flex items-center justify-center">
              <LogoIcon />
            </div>
            <div className="text-[16px] font-bold">PeerX</div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              window.open(props?.text_url, "_blank");
            }}
          >
            <XIcon />
          </div>
        </div>
      )}
      <div className="relative flex flex-row items-start justify-between gap-[10px]">
        <img
          src={props?.related_tweets?.[0]?.profile_image_url}
          width={48}
          height={48}
          alt=""
          className="w-[48px] h-[48px] rounded-full z-[2]"
        />
        <div className="flex-1">
          <TwitterItem {...props?.related_tweets?.[0]} isReply />
        </div>
        <div className="absolute w-[2px] bg-[#DEDEDE] h-full left-[24px] top-[24px] z-[1]" />
      </div>
      <div className="flex flex-row items-start justify-between gap-[10px]">
        <img
          src={props?.profile_image_url}
          width={48}
          height={48}
          alt=""
          className="w-[48px] h-[48px] rounded-full z-[2]"
        />
        <div className="flex-1">
          <TwitterItem {...props} isReply />
        </div>
      </div>
    </div>
  );
}