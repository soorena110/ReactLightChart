import {LineChartProps} from "..";
import * as React from "react";

export const data1: LineChartProps<number | undefined> = {
    labels: [
        {
            title: "one",
            stroke: '#8795F3',
            labelColor: '#8795F3',
            area: {
                rotation: 180,
                grads: [
                    {color: 'rgba(135,149,243,.4)', stop: 0},
                    {color: 'rgba(135,149,243,.2)', stop: .8},
                    {color: 'rgba(135,149,243,0)', stop: 1}
                ]
            }
        }
    ],

    overrideSizes: {
        left: 10
    },

    valueAxis: {
        maximumValue: 14,
        minimumValue: 0,
        linesCount: 7
    },
    indexAxis: {
        linesCount: 10,
        renderLabels: v => v + ' degrees',
        rotation: -60
    },

    renderTooltip(e) {
        const c = e.data || e.prevDefinedData!;
        return <span style={e.position}>
            <div>{e.index} : {c}</div>
        </span>
    },

    data: [1, 2, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, 11, 12, 5, 3, 6, 9, 8, 7, 5, 2, 1, 4, 6, 5, 3, 2, 5, 8, 7, 4, 2, 2, 3, 6, 5, 4, 1],
}

// prevData, nextData in tooltip
