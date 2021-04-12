import React from 'react';
import { HoverLineRendererParams } from '../../LineChart/models/hover';

export default function renderHoverLine({position, color, sizes, lineIndex}: HoverLineRendererParams) {
    if (!lineIndex) return;
    const lineStyle: React.CSSProperties = {strokeWidth: 1};

    return <>
        <defs>
            <linearGradient id='hover-line'
                            gradientUnits="userSpaceOnUse"
                            x2="0%" y2="95%"
                            rotate={90}>
                <stop offset="0%" stopColor={color} stopOpacity="0%"/>
                <stop offset="20%" stopColor={color} stopOpacity="80%"/>
                <stop offset="80%" stopColor={color} stopOpacity="80%"/>
                <stop offset="100%" stopColor={color} stopOpacity="0%"/>
            </linearGradient>
        </defs>
        <line x1={position.left}
              x2={position.left}
              y1={sizes.top + '%'}
              y2={sizes.height - sizes.bottom + '%'}
              style={lineStyle}
              stroke='url(#hover-line)'/>
    </>;
}
