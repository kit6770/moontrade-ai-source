import { LogoWithTextIcon } from "@/lib/icons";
import { formatAddress } from "@/lib/utils";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import classNames from "classnames";
import {
  ExpandMore as ExpandMoreIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material/";

export default function Header() {
  const pathname = usePathname();
  const { address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const links = [
    { name: "AI Rank", path: "/" },
    { name: "KOL Rank", path: "/kol" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  return (
    <header className="flex flex-row h-[55px] bg-white justify-between items-stretch border-b border-[#F3F3F3] lg:min-w-[1176px]">
      <div className="flex items-center gap-[16px] px-[16px]">
        <LogoWithTextIcon />
        <div className="h-[55px] ml-[50px] flex gap-[50px] relative text-[#666666]">
          {links?.map((item) => {
            return (
              <Link
                href={item?.path}
                key={item?.path}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className={classNames(
                    "text-[16px] font-semibold cursor-pointer hover:text-[#C8FF00]",
                    pathname === item?.path && "text-[#000]"
                  )}
                >
                  {item?.name}
                </div>
                {pathname === item?.path && (
                  <div className="absolute bottom-0 w-[60px] h-[5px] bg-[#000] rounded-[30px]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-[16px] px-[16px]">
        {/* <button className="font-semibold bg-[#FAF5E3] text-[#9E7A28] text-[16px] rounded-[12px] px-[20px] h-[40px]">
          Invite code
        </button> */}
        {
          <div className="flex items-center px-[13px] rounded-[8px] bg-[#F4F4F4] h-[40px] opacity-60">
            <NotificationsIcon />
          </div>
        }
        <div className="flex">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <div className="flex items-center h-[40px] px-[8px] rounded-[8px] bg-[#F4F4F4] gap-[6px] ">
              <div className="w-[28px] h-[28px] bg-[#292D32] rounded-full"></div>
              <div className="text-[14px] font-semibold text-[#000]">
                {formatAddress(address)}
              </div>
              <ExpandMoreIcon htmlColor="#000" />
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleDisconnect();
              }}
            >
              <div className="w-[120px] gap-[12px] flex items-center">
                <LogoutIcon />
                <div className="text-[14px] font-medium">Logout</div>
              </div>
            </MenuItem>
          </Menu>
        </div>
        <div className="flex items-center gap-[6px]">
          <button className="font-semibold text-black text-[16px]">EN</button>
          <ExpandMoreIcon htmlColor="#000" />
        </div>
      </div>
    </header>
  );
}
