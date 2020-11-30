import * as React from "react";
import {useChartContext} from "../context";


export default function AxisLines() {
    return <>
        {renderVerticalDivided()}
        {renderHorizontalDivided()}
    </>;
}

function renderVerticalDivided() {
    const {props, offsets} = useChartContext();

    const infos = {
        dontShowLines: ((props.axis || {}).values || {}).dontShowLines,
        verticalLineCount: ((props.axis || {}).values || {}).shownCount,
        lineProps: ((props.axis || {}).values || {}).lineProps
    }

    if (infos.dontShowLines || !infos.verticalLineCount)
        return null;

    const lineYDistance = offsets.innerHeight / infos.verticalLineCount;

    return new Array(infos.verticalLineCount + 1).fill(1).map((_, lineIndex) => {
        const x = offsets.left - 1;
        const y = offsets.top + lineYDistance * lineIndex;

        return <line {...infos.lineProps}
                     x1={x} y1={y} x2={offsets.width} y2={y}
                     key={'y_' + lineIndex}
                     style={{...s.lineChartAxisLine, ...infos.lineProps.style}}/>
    })
}

function renderHorizontalDivided() {
    const {props, offsets} = useChartContext();

    const infos = {
        dontShowLines: ((props.axis || {}).indexes || {}).dontShowLines,
        horizontalLineCount: ((props.axis || {}).indexes || {}).shownCount,
        lineProps: ((props.axis || {}).indexes || {}).lineProps
    };

    if (infos.dontShowLines || !infos.horizontalLineCount)
        return null;

    const lineXDistance = offsets.innerWidth / infos.horizontalLineCount;

    return new Array(infos.horizontalLineCount + 1).fill(1).map((_, lineIndex) => {
        const x = offsets.left + lineXDistance * lineIndex;
        return <line {...infos.lineProps}
                     x1={x} y1={offsets.top} x2={x} y2={offsets.innerHeight + offsets.top}
                     key={'x_' + lineIndex}
                     style={{...s.lineChartAxisLine, ...infos.lineProps.style}}/>
    })
}

const s = {
    lineChartAxisLine: {
        stroke: 'rgba(0, 0, 0, 0.2)',
        strokeWidth: '.1px'
    }
};
