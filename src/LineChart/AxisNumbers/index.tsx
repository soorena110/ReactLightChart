import * as React from "react";
import {useChartContext} from "../context";


export default function AxisNumbers() {
    return <>
        {renderIndexesNumbers()}
        {renderValuesNumbers()}
    </>
}

function renderValuesNumbers() {
    const {offsets, dataMapper: {axisInfo: {valueAxis}, valuesAxisLinesInfo}} = useChartContext();

    return valuesAxisLinesInfo.map((r, lineIndex) => {
        const y = offsets.top + offsets.innerHeight * (1 - r.percent);

        return <span key={"hor_" + lineIndex}
                     style={{
                         ...s.lineChartAxisNumber,
                         top: `calc(${y}% - ${
                             lineIndex == 0 ? 10 :
                                 lineIndex == valuesAxisLinesInfo.length - 1 ? 0 : 5}px)`,
                         left: 0,
                         transform: valueAxis.rotation ? ` rotate(${valueAxis.rotation}deg)` : ''
                     }}>
            {valueAxis.renderLabels ? valueAxis.renderLabels(r.value) : r.value}
        </span>
    })
}


function renderIndexesNumbers() {
    const {offsets, dataMapper: {axisInfo: {indexAxis}, indexesAxisLinesInfo}} = useChartContext();

    return indexesAxisLinesInfo.map((r, lineIndex) => {
        const x = offsets.left + offsets.innerWidth * r.percent;

        return <span key={"hor_" + lineIndex}
                     style={{
                         ...s.lineChartAxisNumber,
                         top: `calc(${offsets.height}% - 2em)`,
                         left: lineIndex != indexesAxisLinesInfo.length - 1 ? x + '%' : undefined,
                         right: lineIndex == indexesAxisLinesInfo.length - 1 ? 0 : undefined,
                         transform: (lineIndex == indexesAxisLinesInfo.length - 1 ? 'translateX(50%)' : 'translateX(-50%)') +
                             (indexAxis.rotation ? ` rotate(${indexAxis.rotation}deg)` : '')
                     }}>
            {indexAxis.renderLabels ? indexAxis.renderLabels(r.value) : r.value}
        </span>
    })
}

const s = {
    lineChartAxisNumber: {
        color: '#949ba2',
        fontSize: 11,
        position: 'absolute'
    } as React.CSSProperties
}
