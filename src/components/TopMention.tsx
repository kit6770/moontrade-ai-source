import { CallAginstIcon, CallOnIcon } from "@/lib/icons";
import { Avatar, AvatarGroup, Button, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { X as XIcon } from "@mui/icons-material";
import { ButtonStyled, CopyText, TagList } from "./Common";
import { MentionItemInfo, PageType } from "@/types";
import { formatAddress } from "@/lib/utils";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

export default function TopMention({
  addresses,
}: {
  type?: PageType;
  addresses: string;
}) {
  const { trigger, isMutating } = useSWRMutation<MentionItemInfo[]>(
    `api:/kol_top_mentions`
  );

  const [mentionList, setMentionList] = useState<MentionItemInfo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getTopMentionList = (limit?: number) => {
    trigger({
      method: "POST",
      body: JSON.stringify({
        addresses: addresses?.split(","),
        offset: mentionList?.length,
        limit: limit ?? 10,
      }),
    }).then((list) => {
      if (list && list.length > 0) {
        const newData = mentionList.concat(list || []);
        setMentionList(newData);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    setMentionList([]);
    setHasMore(false);
    if (addresses?.length) {
      getTopMentionList(3);
    }
  }, [addresses]);

  return (
    <div className="flex flex-col px-[16px] gap-[16px] relative">
      <div className="text-[16px] font-bold">Top Mentions:</div>
      <div className="flex flex-col gap-[8px]">
        {(mentionList || [])?.map((item) => (
          <MetionItem key={item?.token_address} {...item} />
        ))}
      </div>
      {isMutating && <Loader />}
      {hasMore && (mentionList || []).length && (
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            backgroundColor: "#F4F4F4",
            borderRadius: "100px",
            fontSize: "16px",
            ...ButtonStyled,
          }}
          variant="contained"
          onClick={() => getTopMentionList()}
        >
          More <KeyboardArrowDownIcon />
        </Button>
      )}
    </div>
  );
}

const MetionItem = (props: MentionItemInfo) => {
  return (
    <div className="flex flex-col rounded-[16px] gap-[16px] p-[15px] border-[1px] border-[#E3E3E3]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[8px]">
          <div className="w-[36px] h-[36px] rounded-full bg-[gray]">
            <img
              src={props?.token_info?.logo}
              alt={props?.token_info?.address}
              className="w-[36px] h-[36px] rounded-full "
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[16px] flex flex-row items-center gap-[6px]">
              <div>{props?.token_info?.name}</div>
              <TagList
                tag={["Zoo", "AI", "Desci"]}
                className="h-[16px] text-[12px]"
              />
            </div>
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[12px] text-[#666]">
                {formatAddress(props?.token_address)}
              </div>
              <CopyText text={""} />
            </div>
          </div>
        </div>
        <div className="border-[1px] border-[#E9E9E9] bg-[#F2F2F2] rounded-[6px] p-[6px] text-[12px] flex flex-row gap-[4px]">
          <XIcon sx={{ width: 16, height: 16 }} />
          Feeds: 289
        </div>
      </div>
      <div className="flex flex-row items-center relative">
        <div className="absolute left-0 z-[2] bg-white w-[22px] h-[22px] rounded-full border-[1px] border-[#CED4BB] flex items-center justify-center">
          <CallOnIcon className="text-[#00CAAF]" />
        </div>
        <div className="flex-1 z-[1]">
          <BorderLinearProgress
            variant="determinate"
            value={
              (props?.rise_list?.length * 100) /
              (props?.rise_list?.length + props?.fall_list?.length)
            }
          />
        </div>
        <div className="absolute right-0 z-[2] bg-white w-[22px] h-[22px] rounded-full border-[1px] border-[#CED4BB] flex items-center justify-center">
          <CallAginstIcon />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <AvatarGroup
          spacing={4}
          max={8}
          total={props?.rise_list?.length}
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
          {props?.rise_list?.map((riseItem) => (
            <Avatar
              key={riseItem?.name}
              alt={riseItem?.name}
              src={riseItem?.profile_image_url}
            />
          ))}
        </AvatarGroup>
        <AvatarGroup
          spacing={4}
          max={8}
          total={props?.fall_list?.length}
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
          {props?.fall_list?.map((riseItem) => (
            <Avatar
              key={riseItem?.name}
              alt={riseItem?.name}
              src={riseItem?.profile_image_url}
            />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#FF5D5D",
    ...theme.applyStyles("dark", {
      backgroundColor: "#FF5D5D",
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#3AEB4F",
    ...theme.applyStyles("dark", {
      backgroundColor: "#3AEB4F",
    }),
  },
}));
