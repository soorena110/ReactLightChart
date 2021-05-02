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

    return valuesAxisLinesInfo.map((r, index) => {
        const y = offsets.top + offsets.innerHeight * (1 - r.percent);

        return <span key={"hor_" + index}
                     style={{
                         ...s.lineChartAxisNumber,
                         top: `calc(${y}% - ${
                             index == 0 ? 10 :
                                 index == valuesAxisLinesInfo.length - 1 ? 0 : 5}px)`,
                         left: 0,
                         transform: valueAxis.rotation ? ` rotate(${valueAxis.rotation}deg)` : ''
                     }}>
            {valueAxis.renderLabels ? valueAxis.renderLabels(r.value, index) : r.value}
        </span>
    })
}


function renderIndexesNumbers() {
    const {offsets, dataMapper: {axisInfo: {indexAxis}, indexesAxisLinesInfo}} = useChartContext();

    return indexesAxisLinesInfo.map((r, index) => {
        const x = offsets.left + offsets.innerWidth * r.percent;

        return <span key={"hor_" + index}
                     style={{
                         ...s.lineChartAxisNumber,
                         top: `calc(${offsets.height}% - 2em)`,
                         left: index != indexesAxisLinesInfo.length - 1 ? x + '%' : undefined,
                         right: index == indexesAxisLinesInfo.length - 1 ? 0 : undefined,
                         transform: (index == indexesAxisLinesInfo.length - 1 ? 'translateX(50%)' : 'translateX(-50%)') +
                             (indexAxis.rotation ? ` rotate(${indexAxis.rotation}deg)` : '')
                     }}>
            {indexAxis.renderLabels ? indexAxis.renderLabels(r.value, index) : r.value}
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
