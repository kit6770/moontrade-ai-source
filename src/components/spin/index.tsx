import React from "react";
import LoadingGif from "../../../public/image/loading-rocket.gif";
import classNames from "classnames";

interface SpinProps {
    size?: "small" | "default" | "large";
    color?: string;
    children?: React.ReactNode;
    spinning?: boolean;
    iconType?: "default" | "rocket"
    absolute?: boolean;
    absoluteInfo?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    }
}

const sizeMap = {
    small: "w-4 h-4 border-2",
    default: "w-6 h-6 border-3",
    large: "w-10 h-10 border-4",
};

const Spin: React.FC<SpinProps> = ({
    size = "default",
    color = "border-blue-500",
    children,
    spinning,
    iconType = "default",
    absolute = false,
    absoluteInfo = {},
}) => {

    let extraStyle: React.CSSProperties = {};

    if (absolute) {
        extraStyle.position = "absolute";
        Object.keys(absoluteInfo).forEach((key) => {
            // @ts-ignore
            extraStyle[key] = `${absoluteInfo[key]}px`;
        });
    }

    const renderLoadingArea = () => {
        let ele;
        switch (iconType) {
            case "default":
                ele = (
                    <div className="absolute w-full h-full flex items-center justify-center z-20 bg-[rgba(0,0,0,0.45)]">
                        <div
                            className={`animate-spin rounded-full border-t-transparent absolute ${sizeMap[size]} ${color} border-solid z-10`}
                        />
                    </div>
                )
                break;
            case "rocket":
                ele = (
                    <div className="absolute w-full h-full flex items-center justify-center z-20 bg-[rgba(0,0,0,0.45)]">
                        <div
                            style={extraStyle}
                            className={
                                classNames(
                                    "bg-[#212125] rounded-[20px] border-[#2F2F32] pt-[15px] px-[28px] pb-[9px] flex flex-col items-center gap-[8px]",
                                )
                            }
                        >
                            <img src={LoadingGif.src} className="size-[54px]" alt="loading" />
                            <div className="font-[500] text-[12px] leading-[14px] text-[#BBBBBB]">Loading…</div>
                        </div>
                    </div>
                )
                break;
            default:
                ele = (
                    <div className="absolute w-full h-full flex items-center justify-center z-20 bg-[rgba(0,0,0,0.45)]">
                        <div
                            className={`animate-spin rounded-full border-t-transparent absolute ${sizeMap[size]} ${color} border-solid z-10`}
                        />
                    </div>
                )
                break;
        }
        return ele;
    }

    if (spinning) {
        return (
            <div className="flex flex-col items-center justify-center relative">
                {renderLoadingArea()}
                <div className="w-full">{children}</div>
            </div>
        );
    }
    return children;
};

export default Spin;
