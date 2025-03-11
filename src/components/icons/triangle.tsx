import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function TriangleIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.4173 0.26087L0.254335 2.52174C-0.00910259 2.7971 -0.0678908 3.11217 0.0779707 3.46696C0.223832 3.82174 0.483665 3.99942 0.85747 4H5.1418C5.51616 4 5.77627 3.82232 5.92213 3.46696C6.068 3.11159 6.00893 2.79652 5.74494 2.52174L3.58197 0.26087C3.49878 0.173913 3.40866 0.108696 3.3116 0.0652182C3.21455 0.02174 3.11056 0 2.99964 0C2.88872 0 2.78473 0.02174 2.68767 0.0652182C2.59061 0.108696 2.50049 0.173913 2.4173 0.26087Z" fill="currentColor" />
            </svg>
        </SvgIcon>
    );
}