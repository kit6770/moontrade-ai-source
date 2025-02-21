"use client";

import { BASE_PATH } from "@/lib/constants";
import {
  Autocomplete,
  Button,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { X as XIcon, Cancel as CancelIcon } from "@mui/icons-material";
import RecoImportModal from "./recommend-modal";
import PlatformImportModal from "./platform-modal";
import { ButtonStyled } from "@/components/Common";
import TabSet from "@/components/Tabset";
import { useKOLList } from "@/hooks/useKOL";
import classNames from "classnames";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import ListTable from "./list-table";
import Loader from "@/components/Loader";
import KOLRankSideContent from "../kol/kol-sider";

export default function Watchlist() {
  const isMobile = getPlatformInfo()?.isMobile;
  const [platImportOpen, setPlatImportOpen] = useState(false);
  const [recoOpen, setRecoOpen] = useState(false);

  const { data: KOLList, isLoading } = useKOLList();

  // show recom first time
  // const showRecoKOl = localStorage.getItem('showRecoKOl')
  // useEffect(() => {
  //   if (showRecoKOl === null) {
  //     setRecoOpen(true);
  //   }
  // }, [showRecoKOl]);

  return (
    <div
      className="h-full flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[16px]"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <TabSet type="watch" />
      <section className="flex flex-row justify-start items-start">
        <div
          className={classNames(
            "relative flex flex-auto flex-col gap-[16px] pb-[16px] md:pr-[16px]",
            isMobile
              ? "h-full overflow-auto"
              : "overflow-hidden hover:overflow-auto"
          )}
          style={{ height: `calc(100vh - 144px)` }}
        >
          <div className="h-full flex flex-col justify-between gap-[16px] rounded-[20px] bg-white">
            <div className="flex flex-row items-center justify-between pt-[16px] px-[16px]">
              {/* <TextField
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              width: "268px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-input": {
                borderColor: "#DDDDDD",
                borderRadius: "8px",
              },
            }}
          /> */}
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={(KOLList || [])?.map((option) => option?.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root": { height: "36px" },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "14px",
                        padding: "0 10px",
                        "& fieldset": { borderColor: "#97979780" },
                        // "&:hover fieldset": {
                        //   borderColor: "green", // 鼠标悬停时边框颜色
                        // },
                        // "&.Mui-focused fieldset": {
                        //   borderColor: "red", // 获得焦点时的边框颜色
                        // },
                      },
                    }}
                  />
                )}
                sx={{ width: "268px", fontSize: "14px", borderColor: "red" }}
                renderOption={(props, option) => (
                  <li {...props} key={option} style={{ padding: "6px 10px" }}>
                    <div className="w-full flex flex-row items-center gap-[10px] pb-[10px] border-b-[1px] border-[#EEEEEE] last:border-0">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#f0f0f0]"></div>
                      <div className="flex flex-col">
                        <div className="text-[14px] font-semibold text-[#000]">
                          {option}
                        </div>
                        <div className="text-[12px] text-[#666666]">
                          @Jenny Black
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              />
              {false && (
                <div className="flex flex-row items-center gap-[10px]">
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "36px",
                      width: "36px",
                      height: "36px",
                      textTransform: "none",
                      color: "black",
                      backgroundColor: "#C8FF00",
                      borderRadius: "10px",
                      fontSize: "14px",
                      padding: "0px",
                      ...ButtonStyled,
                    }}
                    onClick={() => setPlatImportOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      height: "36px",
                      textTransform: "none",
                      color: "black",
                      backgroundColor: "#C8FF00",
                      borderRadius: "10px",
                      fontSize: "14px",
                      padding: "0 8px",
                      ...ButtonStyled,
                    }}
                  >
                    <div className="w-[20px] h-[20px] rounded-full bg-[#373737] flex items-center justify-center mr-[10px]">
                      <XIcon
                        htmlColor={"#fff"}
                        sx={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    Import KOLs from X
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 h-full">
              <ListTable KOLList={KOLList} />
            </div>
          </div>
          {isLoading && <Loader />}
        </div>
        <KOLRankSideContent type="watch" KOLList={KOLList} />
      </section>
      {false && <EmptyContent setPlatImportOpen={setPlatImportOpen} />}

      <RecoImportModal open={recoOpen} setOpen={setRecoOpen} />
      <PlatformImportModal open={platImportOpen} setOpen={setPlatImportOpen} />
    </div>
  );
}

const EmptyContent = ({
  setPlatImportOpen,
}: {
  setPlatImportOpen: (value: boolean) => void;
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-[24px] w-[640px] h-[480px] flex flex-col items-center justify-center">
        <img
          src={`${BASE_PATH}/image/empty_watchlist.png`}
          alt="empty-watchlist"
          width={120}
          height={120}
        />
        <div className="text-[16px] font-medium text-[#999999]">
          No watchlist followers,{" "}
          <Button
            variant="text"
            sx={{
              textDecoration: "underline",
              textTransform: "none",
              color: "black",
              fontSize: "16px",
              ...ButtonStyled,
            }}
            onClick={() => setPlatImportOpen(true)}
          >
            Add from PUMP.NOW
          </Button>
        </div>
        <Divider
          sx={{
            width: "100%",
            borderStyle: "dashed",
            borderColor: "#C7C7C7",
            margin: "30px 0",
          }}
        >
          or
        </Divider>
        <Button
          variant="contained"
          sx={{
            height: "54px",
            textTransform: "none",
            color: "black",
            backgroundColor: "#C8FF00",
            borderRadius: "20px",
            fontSize: "14px",
            ...ButtonStyled,
          }}
        >
          <div className="w-[24px] h-[24px] rounded-full bg-[#373737] flex items-center justify-center mr-[10px]">
            <XIcon htmlColor={"#fff"} sx={{ width: 16, height: 16 }} />
          </div>
          Import from X(Twitter)
        </Button>
      </div>
    </div>
  );
};
