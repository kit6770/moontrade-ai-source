import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

type Iprops = {
    children: React.ReactElement<unknown, any>
    title: React.ReactNode
    placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

export default function ITooltip(props: Iprops) {
    const { children, title, placement = "top" } = props;

    const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
            display: 'none',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#212125",
            padding: "0px",
            borderRadius: "12px",
        },
    }));

    return (
        <BootstrapTooltip
            title={title}
            placement={placement}
        >
            {children}
        </BootstrapTooltip>
    );
}
