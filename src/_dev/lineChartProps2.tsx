import {LineChartProps} from "..";
import React from "react";

export const data2: LineChartProps<{ v1: number, v2: number }> = {
    labels: [
        {
            title: "buy",
            labelColor: "#2384d1",
            stroke: "#2384d1"
        },
        {
            title: "sell",
            labelColor: "#d04441",
            stroke: "#d04441"
        }
    ],

    overrideSizes: {
        left: 10
    },

    valueAxis: {
        linesCount: 3
    },
    indexAxis: {
        linesCount: 4
    },

    renderSeparatedTooltip(e) {
        return <span style={{...e.position, color: e.labels[e.lineIndex].labelColor}}>
            {e.index} : {e.value}
        </span>
    },

    data: [
        {v1: 1, v2: 2},
        {v1: 5, v2: 8},
        {v1: 3, v2: 0},
        {v1: 6, v2: 6 - 3},
        {v1: 9, v2: 9 - 3},
        {v1: 8, v2: 8 - 3},
        {v1: 7, v2: 7 - 3},
        {v1: 5, v2: 5 - 3},
        {v1: 2, v2: 2 - 3},
        {v1: 1, v2: 1 - 3},
        {v1: 4, v2: 4 - 3},
        {v1: 6, v2: 6 - 3},
        {v1: 5, v2: 5 - 3},
        {v1: 3, v2: 3 - 3},
        {v1: 2, v2: 2 - 3},
        {v1: 5, v2: 5 - 3},
        {v1: 8, v2: 8 - 3},
        {v1: 7, v2: 7 - 3},
        {v1: 4, v2: 4 - 3},
        {v1: 2, v2: 2 - 3},
        {v1: 2, v2: 2 - 3},
        {v1: 3, v2: 3 - 3},
        {v1: 6, v2: 6 - 3},
        {v1: 5, v2: 5 - 3},
        {v1: 4, v2: 4 - 3},
        {v1: 3, v2: 8}],
    valueSelector: v => [v.v1, v.v2],
    indexSelector: () => Math.random()
}
