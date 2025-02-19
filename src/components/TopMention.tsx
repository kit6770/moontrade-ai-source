import {
  CallAginstIcon,
  CallOnIcon,
  CopyIcon,
  SearchOnXIcon,
} from "@/lib/icons";
import { useState } from "react";
import { Avatar, AvatarGroup, Button, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { X as XIcon, Telegram as TelegramIcon,  Check as CheckIcon } from "@mui/icons-material";

export default function TopMention() {
  return (
    <div className="flex flex-col px-[16px] gap-[16px]">
      <div className="text-[16px] font-bold">Top Mentions:</div>
      <div className="flex flex-col gap-[8px]">
        <MetionItem />
        <MetionItem />
        <MetionItem />
      </div>
      <Button
        sx={{
          textTransform: "none",
          color: "black",
          backgroundColor: "#F4F4F4",
          borderRadius: "100px",
          fontSize: "16px",
        }}
        variant="contained"
      >
        More <KeyboardArrowDownIcon />
      </Button>
    </div>
  );
}

const MetionItem = () => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col rounded-[16px] gap-[16px] p-[15px] border-[1px] border-[#E3E3E3]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[8px]">
          <div className="w-[36px] h-[36px] rounded-full bg-[gray]"></div>
          <div className="flex flex-col">
            <div className="text-[16px] flex flex-row items-center gap-[6px]">
              <div>Edwards</div>
              <div
                className="cursor-pointer text-black hover:text-[#C8FF00]"
                onClick={(e) => {
                  // window.open(`https://x.com/search?q=${props?.token_address}`)
                  e.stopPropagation();
                }}
              >
                <SearchOnXIcon />
              </div>
              <div className="flex items-center justify-center">
                <TelegramIcon
                  onClick={(e) => {
                    // window.open(props?.telegram_link, '_blank')
                    e.stopPropagation();
                  }}
                  sx={{ width: 18, height: 18 }}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-[4px]">
              <div className="text-[12px] text-[#666]">5VwjS...ump</div>
              {copied ? (
                <CheckIcon />
              ) : (
                <div
                  className="cursor-pointer text-black hover:text-[#C8FF00]"
                  onClick={(e) => {
                    // navigator.clipboard.writeText(props?.token_address)
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                    e.stopPropagation();
                  }}
                >
                  <CopyIcon />
                </div>
              )}
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
          <BorderLinearProgress variant="determinate" value={70} />
        </div>
        <div className="absolute right-0 z-[2] bg-white w-[22px] h-[22px] rounded-full border-[1px] border-[#CED4BB] flex items-center justify-center">
          <CallAginstIcon />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
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
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
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
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
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
