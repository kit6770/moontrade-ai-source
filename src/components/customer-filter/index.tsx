import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import Popover from '@mui/material/Popover';


type Iprops = {
    children?: React.ReactNode;
    popoverKey: string;
    render?: () => any;
    currentValue?: string;

}

const CustomerFilter = forwardRef((props: Iprops, ref) => {
    const { popoverKey, children, render, currentValue = "" } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        onCloseFilter: () => {
            handleClose();
        },
    }));

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderContent = () => {
        return render && render()
    }

    const open = Boolean(anchorEl);
    const id = open ? `${popoverKey}_filter_simple-popover` : undefined;

    return (
        <>
            <div
                aria-describedby={id}
                onClick={handleClick}
                className='inline-block cursor-pointer'
            >
                {children}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '16px',
                        padding: '0px',
                    },
                }}
            >
                {renderContent()}
            </Popover>
        </>
    );
})

export default CustomerFilter;