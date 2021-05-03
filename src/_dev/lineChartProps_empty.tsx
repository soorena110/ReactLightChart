import { LineChartProps } from "..";
import React from "react";

type valueSelector = {
    timestamp: number;
    nav?: number;
}
export const data_empty: LineChartProps<valueSelector> = {
    valueSelector: e => [e.nav],
    indexSelector: e => e.timestamp,
    indexAxis: {
        linesCount: 5
    },
    valueAxis: {
        linesCount: 8,
        minimumValue: 0
    },
    data: [],
    renderSeparatedTooltip(e) {
        return <span style={{
            ...e.position,
            color: e.labels[e.lineIndex].labelColor,
            background: 'white'
        }}>
            <div>value:{e.value}</div>
            <div>prevDefinedValue:{e.prevDefinedValue}</div>
            <div>nextDefinedData:{e.nextDefinedValue}</div>
            <div>index:{e.index}</div>
        </span>;
    },
};
