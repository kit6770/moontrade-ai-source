import React from 'react';
import classNames from 'classnames';
import TriangleIcon from '../icons/triangle';

export type SortType = 'asc' | 'desc'

type Iprops = {
    className?: string;
    onChange?: (value?: SortType) => void;
    value?: SortType;
    needSort?: boolean
}

const SortTag = (props: Iprops) => {
    const { className, value = 'asc', onChange, needSort = "false" } = props

    const handleClick = () => {
        onChange && onChange(value === 'asc' ? 'desc' : 'asc')
    }

    return (
        <div className={classNames('flex flex-col gap-[2px]', className)} onClick={() => handleClick()}>
            <TriangleIcon
                className={classNames('!text-[6px]', {
                    "text-[#000]": value === "asc" && needSort,
                })}
            />
            <TriangleIcon
                className={classNames("!text-[6px] transform rotate-180", {
                    "text-[#000]": value === "desc" && needSort,
                })}
            />
        </div>
    )
};

export default SortTag;
