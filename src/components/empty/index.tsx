'use client'

import classNames from 'classnames'
import React, { useEffect } from 'react'
import EmptyDarkImg from "../../../public/image/empty_dark.svg";

type Iprops = {
    title?: string
    description?: string
    className?: string
    icon?: React.ReactElement
}

export default function Empty(props: Iprops) {
    const { title, description, className, icon } = props;

    return (
        <div className='flex items-center justify-center flex-col gap-[10px]'>
            {icon || <img src={EmptyDarkImg.src} className='size-[156px]' />}
            <div className='text-[#5C6068] text-[20px] leading-[24.38px] font-[500]'>{title || "No Data"}</div>
            {description && (
                <div className='text-[#5C6068] text-[17.07px] font-[300]'>{description}</div>
            )}
        </div>
    )

}
