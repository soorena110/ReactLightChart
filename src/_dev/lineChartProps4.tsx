import { LineChartProps } from "..";
import React from "react";

type valueSelector = {
    timestamp: number;
    nav?: number;
}
export const data4: LineChartProps<valueSelector> = {
    valueSelector: e => [e.nav],
    indexSelector: e => e.timestamp,
    indexAxis: {
        linesCount: 5
    },
    valueAxis: {
        linesCount: 8,
        minimumValue: 0
    },
    data: [
        {
            timestamp: 1611995454,
            nav: 4498
        },
        {
            timestamp: 1612072860,
            nav: 6237
        },
        {
            timestamp: 1612173679,
            nav: 6120
        },
        {
            timestamp: 1612256455,
            nav: 6578
        },
        {
            timestamp: 1612346469,
            nav: 5576
        },
        {
            timestamp: 1612360901,
            nav: 8407
        },
        {timestamp: 1612447301},
        {timestamp: 1612533701},
        {
            timestamp: 1612607459,
            nav: 8822
        },
        {
            timestamp: 1612693841,
            nav: 7967
        },
        {
            timestamp: 1612774873,
            nav: 9508
        },
        {
            timestamp: 1613631650,
            nav: 2765
        },
        {timestamp: 1613718050},
        {
            timestamp: 1613809865,
            nav: 3163
        },
        {
            timestamp: 1613813449,
            nav: 3616
        },
        {
            timestamp: 1614159058,
            nav: 4800
        },
        {
            timestamp: 1614160854,
            nav: 4798
        },
        {timestamp: 1614247254},
        {timestamp: 1614333654},
        {
            timestamp: 1614414646,
            nav: 5063
        },
        {
            timestamp: 1614416454,
            nav: 5867
        },
        {
            timestamp: 1614497441,
            nav: 6027
        }],
    renderSeparatedTooltip(e) {
        console.log(e);
        return <span style={{
            ...e.pointPosition,
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
