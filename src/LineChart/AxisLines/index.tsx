import * as React from "react";
import {useChartContext} from "../context";


export default function AxisLines() {
    return <>
        {renderVerticalDivided()}
        {renderHorizontalDivided()}
    </>;
}

function renderVerticalDivided() {
    const {offsets, dataMapper: {axisInfo: {valueAxis}, valuesAxisLinesInfo}} = useChartContext();

    return valuesAxisLinesInfo.map(r => {
            const x1 = offsets.left - 1;
            const x2 = offsets.width;
            const y = offsets.top + offsets.innerHeight * (1 - r.percent);

            return <line key={y}
                         {...valueAxis.linesProps}
                         x1={x1} y1={y} x2={x2} y2={y}
                         style={{...s.lineChartAxisLine, ...valueAxis.linesProps?.style}}>{r.percent}</line>
        }
    )
}

function renderHorizontalDivided() {
    const {offsets, dataMapper: {axisInfo: {indexAxis}, indexesAxisLinesInfo}} = useChartContext();

    return indexesAxisLinesInfo.map(r => {
        const x = offsets.left + offsets.innerWidth * r.percent;
        const y1 = offsets.top;
        const y2 = offsets.innerHeight + offsets.top;
        return <line key={x}
                     {...indexAxis.linesProps}
                     x1={x} y1={y1} x2={x} y2={y2}
                     style={{...s.lineChartAxisLine, ...indexAxis.linesProps?.style}}/>
    })
}

const s = {
    lineChartAxisLine: {
        stroke: 'rgba(0, 0, 0, 0.2)',
        strokeWidth: '.1px'
    }
};
