import { Button, Avatar, AvatarGroup } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ButtonStyled } from "./Common";

export default function FollowingTrend() {
  return (
    <div className="flex flex-col px-[16px] gap-[16px]">
      <div className="text-[16px] font-bold">Following Trend:</div>
      <div className="flex flex-col gap-[8px]">
        <TrendItem />
        <TrendItem />
        <TrendItem />
      </div>
      <Button
        sx={{
          textTransform: "none",
          color: "black",
          backgroundColor: "#F4F4F4",
          borderRadius: "100px",
          fontSize: "16px",
          ...ButtonStyled
        }}
        variant="contained"
      >
        More <KeyboardArrowDownIcon />
      </Button>
    </div>
  );
}

const TrendItem = () => {
  return (
    <div className="border-[1px] border-[#ECECEC] rounded-[16px] p-[10px] flex flex-row items-center gap-[16px]">
      <AvatarGroup
        spacing={4}
        max={8}
        total={36}
        sx={{
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            fontSize: "12px",
            fontWeight: 500,
          },
        }}
        renderSurplus={()=>{
          return 30
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
      <div className="text-[14px]">follows</div>
      <div className="bg-[#E2F2FF] rounded-[100px] pl-[2px] pr-[8px] py-[2px] flex flex-row items-center justify-center gap-[6px]">
        <div className="w-[30px] h-[30px] rounded-full border-[1px] border-[white] bg-[gray]"></div>
        <div className="flex flex-col justify-center text-[12px]">
          <div className="text-[#000]">Annette Black</div>
          <div className="text-[#666666]">@Annette</div>
        </div>
      </div>
    </div>
  );
};
