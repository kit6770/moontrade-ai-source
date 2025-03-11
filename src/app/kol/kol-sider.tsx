import FollowingTrend from "@/components/FollowingTrend";
import SelectedKOLSide from "@/components/SelectedKOLSide";
import TopMention from "@/components/TopMention";
import { useSelectedKOL } from "@/hooks/useKOL";
import { getPlatformInfo } from "@/lib/getPlatformInfo";
import { KOLItemInfo } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KOLRankSideContent({
  type,
  KOLList,
}: {
  type: "watch" | "kol";
  KOLList: KOLItemInfo[];
}) {
  const router = useRouter();
  const isMobile = getPlatformInfo()?.isMobile;
  const { selected } = useSelectedKOL(type);

  const [highlighted, setHighlighted] = useState<boolean>(false);

  useEffect(() => {
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false);
    }, 1000);
  }, [selected]);

  return (
    <aside
      className={classNames(
        "flex flex-none flex-col justify-between md:w-[452px] rounded-[20px] bg-[white] shadow-md border-[1px] border-dashed overflow-auto hide-scrollbar",
        selected ? "border-[#555F32]" : "border-[transparent]"
      )}
      style={{
        height: isMobile ? "h-full" : `calc(100vh - 155px)`,
        boxShadow: highlighted ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "none",
        animation: highlighted ? "scaleUp 500ms ease forwards" : "none",
      }}
    >
      <div className="flex-1 flex flex-col justify-between overflow-auto hide-scrollbar">
        <div
          className="flex flex-col gap-[4px] rounded-t-[20px] px-[16px] py-[12px]"
          style={{
            boxShadow: "0px 6px 0px 0px #C8FF00 inset",
            background: "linear-gradient(360deg, #FFFFFF 67.91%, #F9FFE4 100%)",
          }}
        >
          <h4 className="text-[20px] font-semibold">
            {selected ? `${selected}'s AI Summary` : "what's up today"}
          </h4>
          <div className="text-[16px] font-bold">
            Latest Buzz in the Past 24 Hours:
          </div>
          <div className="flex flex-col text-[14px]">
            The relationship between Tesla and OpenAI has sparked widespread
            discussion Meme coin ICOs on the Bitcoin network have attracted
          </div>
        </div>
        {!selected && KOLList?.length ? (
          <div className="my-[10px] flex flex-col gap-[20px]">
            <TopMention
              type={type}
              addresses={(KOLList || [])?.map((item) => item?.user_id)?.join(',')}
            />
            <FollowingTrend />
          </div>
        ) : (
          ""
        )}
        <div className="flex-1 h-full flex flex-col">
          {selected && <hr className="border-[#E4EAC7]" />}
          {selected && <SelectedKOLSide type={type} />}
        </div>
      </div>
      {selected && (
        <div className="w-full px-[16px] leading-[48px]">
          <div
            className="text-[16px] font-bold rounded-[6px] text-black bg-[#C8FF00] flex items-center justify-center mt-[4px] cursor-pointer mb-[16px]"
            onClick={() => {
              router.push("/koldetail");
            }}
          >
            Learn more
          </div>
        </div>
      )}
    </aside>
  );
}
