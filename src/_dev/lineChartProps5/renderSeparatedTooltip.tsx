import React from 'react';
import { SeparatedTooltipRendererParams } from '../../LineChart/models/hover';

export default function renderSeparatedTooltip(e: SeparatedTooltipRendererParams) {
    return <span style={{
        ...e.position,
        color: e.labels[e.lineIndex].textColor
    }}>
            <div>value:{e.value}</div>
        {/*<div>prevDefinedValue:{e.prevDefinedValue}</div>*/}
        {/*<div>nextDefinedData:{e.nextDefinedValue}</div>*/}
        {/*<div>index:{e.index}</div>*/}
        </span>;
}
