"use client";

import { BASE_PATH } from "@/lib/constants";
import { Button, Modal, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Close as CloseIcon, Cached as CachedIcon } from "@mui/icons-material";
import classNames from "classnames";
import { KOLInfo } from "@/types";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import CatorgyItem from "@/components/CatorgyItem";
import WatchListMainContent from "./main-content";
import WatchListSideContent from "./side-content";
import Filter from "@/components/Filter";
import TimeFilter from "@/components/TimeFilter";
import {
  X as XIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

export default function Watchlist() {
  const [platImportOpen, setPlatImportOpen] = useState(false);

  return (
    <div className="flex flex-col lg:w-[1176px] px-[10px] mx-auto gap-[16px] pt-[20px]">
      <TabSet />
      <section className="flex flex-row justify-start items-start">
        <WatchListMainContent setPlatImportOpen={setPlatImportOpen} />
        <WatchListSideContent />
      </section>
      {false && <EmptyContent setPlatImportOpen={setPlatImportOpen} />}
      <PlatImportModal open={platImportOpen} setOpen={setPlatImportOpen} />
    </div>
  );
}

function TabSet() {
  const containerRef = useRef(null);
  const { data: watchKolCatorgy } = useSWR("watchKolCatorgy");
  const { trigger: updateWatchKolCatorgy } =
    useSWRMutation<string>("watchKolCatorgy");
  const { trigger: setSelectedWatchKOL } = useSWRMutation("selectedWatchKOL");

  const catorgyList = [
    { key: "All", value: "all" },
    { key: "Zoo", value: "zoo" },
    { key: "Celeb", value: "celeb" },
    { key: "Art", value: "art" },
    { key: "AI", value: "ai" },
    { key: "Desci", value: "desci" },
    { key: "L1", value: "l1" },
  ];

  const timeList = [
    { value: "last24h", name: "Last 24H", simpleName: "Last 24H" },
    { value: "last7d", name: "Last 7 Days", simpleName: "Last 7D" },
    { value: "last30d", name: "Last 30 Days", simpleName: "Last 30D" },
  ];

  useEffect(() => {
    if (watchKolCatorgy === null) {
      updateWatchKolCatorgy("all");
    }
  }, [watchKolCatorgy]);

  return (
    <div
      className="w-full flex flex-col items-center gap-[16px] relative"
      ref={containerRef}
    >
      <div className="w-full flex flex-row justify-between gap-[19px] h-[48px] leading-[48px]">
        <div className="flex flex-auto flex-row justify-between items-stretch bg-white rounded-[12px] p-[4px] gap-[4px]">
          {catorgyList?.map((item) => (
            <CatorgyItem
              key={item?.key}
              value={item?.value}
              name={item?.key}
              defaultChecked={watchKolCatorgy === item?.value}
              onChange={(value) => {
                updateWatchKolCatorgy(value);
                setSelectedWatchKOL(null);
              }}
            />
          ))}
        </div>

        <TimeFilter timeList={timeList} type={"watch"} />

        <Filter containerRef={containerRef} />
      </div>
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
            }}
            onClick={() => setPlatImportOpen(true)}
          >
            Add from PUMP.NOW
          </Button>
        </div>
        <div className="flex items-center justify-center py-[30px] text-[14px] font-semibold text-[rgb(102,102,102)]">
          or
        </div>
        <Button
          variant="contained"
          sx={{
            height: "54px",
            textTransform: "none",
            color: "black",
            backgroundColor: "#C8FF00",
            borderRadius: "20px",
            fontSize: "14px",
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

function PlatImportModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const types = [
    { key: "Zoo", value: "zoo" },
    { key: "Art", value: "art" },
    { key: "Cele", value: "cele" },
    { key: "AI", value: "ai" },
    { key: "Desci", value: "desci" },
    { key: "L1", value: "l1" },
  ];
  const [selectedType, setSelectedType] = useState<string>("zoo");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [list, setList] = useState<KOLInfo[]>([
    {
      id: 1,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      id: 2,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      id: 3,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      id: 4,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      id: 5,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
    {
      id: 6,
      name: "Guy Hawkins",
      handle: "Paradigm",
      address: "5VwjS...ump",
      tags: ["Agent", "Cele", "Zoo"],
    },
  ]);

  const handleCheckboxChange = (value: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(value)) {
        return prevSelectedItems.filter((i) => i !== value);
      } else {
        return [...prevSelectedItems, value];
      }
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "840px",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: "24px",
            borderRadius: "16px",
            maxHeight: "80vh",
          }}
        >
          <div className="flex flex-row items-center justify-between">
            <div className="text-[24px] font-semibold">
              You might like them?
            </div>
            <div className="" onClick={() => setOpen(false)}>
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col gap-[16px] mt-[20px]">
            <div className="flex flex-row items-center gap-[10px]">
              {types?.map((item) => {
                return (
                  <div
                    key={item?.value}
                    className={classNames(
                      "px-[20px] h-[40px] text-[16px] flex items-center justify-center rounded-[6px] border-[1px] cursor-pointer",
                      selectedType === item?.value
                        ? "border-[transparent] bg-[#C8FF00] "
                        : "border-[#EEEEEE] bg-white"
                    )}
                    onClick={() => setSelectedType(item?.value)}
                  >
                    {item?.key}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row flex-wrap gap-[20px]">
              {list?.map((item) => {
                return (
                  <KOLItem
                    key={item?.id}
                    {...item}
                    selectedItems={selectedItems}
                    onClick={(value) => handleCheckboxChange(value)}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center mt-[20px] relative">
            <div className="flex flex-row items-center gap-[6px] text-[14px] absolute left-0 cursor-pointer">
              <CachedIcon />
              Switch
            </div>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                textTransform: "none",
                color: "black",
                backgroundColor: "#C8FF00",
                borderRadius: "100px",
                fontSize: "16px",
                fontWeight: "600",
                padding: "0 50px",
              }}
            >
              Confirm {selectedItems ? `(${selectedItems?.length})` : ""}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const KOLItem = (
  props: KOLInfo & {
    selectedItems: number[];
    onClick?: (value: number) => void;
  }
) => {
  const isChecked = props?.selectedItems?.includes(props?.id);
  return (
    <div
      className={classNames(
        "border-[1px] w-[240px] h-[90px] rounded-[12px] flex flex-row items-center justify-center gap-[10px] cursor-pointer relative",
        isChecked ? "bg-[#FBFFEE] border-[#C8FF00]" : "border-[#EEEEEE]"
      )}
      onClick={() => props?.onClick?.(props?.id)}
    >
      <div className="w-[48px] h-[48px] rounded-full bg-[gray]"></div>
      <div className="flex flex-col">
        <div className="text-[16px] font-bold">{props?.name}</div>
        <div className="text-[12px] text-[#666666]">
          @{props?.handle} · {props?.address}
        </div>
        <div className="flex flex-row gap-[4px] text-[12px] font-light">
          <div className="bg-[#C7D2FF] rounded-[6px] h-[22px] px-[6px] flex items-center justify-center">
            Agent
          </div>
          <div className="bg-[#FFEB93] rounded-[6px] h-[22px] px-[6px] flex items-center justify-center">
            Cele
          </div>
          <div className="bg-[#A4FBB7] rounded-[6px] h-[22px] px-[6px] flex items-center justify-center">
            Zoo
          </div>
        </div>
      </div>
      {isChecked && (
        <CheckCircleIcon
          htmlColor="#0ABF52"
          className="absolute right-[10px] top-[10px]"
        />
      )}
    </div>
  );
};
