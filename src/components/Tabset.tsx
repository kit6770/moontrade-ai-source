import { useEffect, useRef } from "react";
import CatorgyItem from "./CatorgyItem";
import TimeFilter from "./TimeFilter";
import Filter from "./Filter";
import { ClearAllIcon } from "@/lib/icons";
import { CloseOutlined } from "@mui/icons-material";
import { PageType } from "@/types";
import { useSelectedFilter, useSelectedKOL } from "@/hooks/useKOL";
import { Chip } from "@mui/material";

export default function TabSet({ type }: { type: PageType }) {
  const containerRef = useRef(null);

  const { setSelected, setSelectedInfo } = useSelectedKOL(type);
  const { filterOptions, catorgy, setCatorgy, setFilterOptions } =
    useSelectedFilter(type);

  const catorgyList = {
    watch: [
      { key: "All", value: "all" },
      { key: "Zoo", value: "zoo" },
      { key: "Celeb", value: "celeb" },
      { key: "Art", value: "art" },
      { key: "AI", value: "ai" },
      { key: "Desci", value: "desci" },
      { key: "L1", value: "l1" },
    ],
    kol: [
      { key: "All", value: "all" },
      { key: "Zoo", value: "zoo" },
      { key: "Art", value: "art" },
      { key: "AI", value: "ai" },
      { key: "Desci", value: "desci" },
      { key: "L1", value: "l1" },
    ],
    ai: [
      { key: "5m", value: "5m" },
      { key: "1h", value: "1h" },
      { key: "6h", value: "6h" },
      { key: "24h", value: "24h" },
    ],
  };

  const timeList = {
    watch: [
      { value: "last24h", name: "Last 24H", simpleName: "Last 24H" },
      { value: "last7d", name: "Last 7 Days", simpleName: "Last 7D" },
      { value: "last30d", name: "Last 30 Days", simpleName: "Last 30D" },
    ],
    kol: [
      { value: "last7d", name: "Last 7 Days", simpleName: "Last 7D" },
      { value: "last30d", name: "Last 30 Days", simpleName: "Last 30D" },
    ],
  };

  useEffect(() => {
    if (catorgy === null) {
      setCatorgy(catorgyList[type][0]?.value);
    }
  }, [catorgy]);

  return (
    <div
      className="w-full flex flex-col items-center gap-[16px] relative"
      ref={containerRef}
    >
      <div className="w-full flex flex-row justify-between gap-[19px] h-[40px] leading-[40px]">
        <div className="flex flex-auto flex-row justify-between items-stretch bg-white rounded-[12px] p-[4px] gap-[4px]">
          {catorgyList[type]?.map((item) => (
            <CatorgyItem
              key={item?.key}
              value={item?.value}
              name={item?.key}
              defaultChecked={catorgy === item?.value}
              onChange={(value) => {
                setCatorgy(value);
                setSelected(null);
                setSelectedInfo(null);
              }}
            />
          ))}
        </div>
        {type !== "ai" && <TimeFilter timeList={timeList[type]} type={type} />}
        <Filter containerRef={containerRef} type={type} />
      </div>
      {Object.keys(filterOptions)?.length > 0 && (
        <div className="w-full flex flex-row items-center gap-[8px] h-[40px] leading-[40px]">
          {Object.keys(filterOptions)?.map((key) => {
            if (Array.isArray(filterOptions[key])) {
              return filterOptions[key]?.map((i: string) => (
                <SelectedFilterItem
                  key={i}
                  value={i}
                  type={type}
                  tagType={key}
                />
              ));
            } else {
              return (
                <SelectedFilterItem
                  key={key}
                  value={filterOptions[key]}
                  type={type}
                  tagType={key}
                />
              );
            }
          })}
          <div
            className="w-[40px] h-[32px] rounded-[6px] bg-[#FF4F4F] flex items-center justify-center cursor-pointer"
            onClick={() => {
              setFilterOptions("{}");
            }}
          >
            <ClearAllIcon />
          </div>
        </div>
      )}
    </div>
  );
}

function SelectedFilterItem({
  value,
  type,
  tagType,
}: {
  value: string;
  type: PageType;
  tagType: string;
}) {
  const { filterOptions, setFilterOptions } = useSelectedFilter(type);

  const handleDelete = () => {
    if (tagType === "tag") {
      const nextTag = (filterOptions?.tag ?? []).filter(
        (i: string) => i !== value
      );
      if (nextTag?.length === 0) {
        delete filterOptions[tagType];
        setFilterOptions(JSON.stringify(filterOptions));
      } else {
        setFilterOptions(
          JSON.stringify({
            ...filterOptions,
            tag: nextTag,
          })
        );
      }
    } else {
      delete filterOptions[tagType];
      setFilterOptions(JSON.stringify(filterOptions));
    }
  };

  return (
    <Chip
      label={value}
      variant="outlined"
      onDelete={handleDelete}
      deleteIcon={<CloseOutlined sx={{ width: 16, height: 16 }} />}
      sx={{
        height: "30px",
        backgroundColor: "white",
        padding: "0px 12px",
        "&.MuiChip-root": {
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 600,
        },
        "&.MuiChip-root .MuiChip-label": {
          padding: "0px 6px",
          lineHeight: "30px",
        },
        "&.MuiChip-root .MuiChip-deleteIcon": {
          color: "#000",
          marginLeft: "2px",
        },
      }}
    />
  );
}
