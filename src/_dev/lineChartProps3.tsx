import {LineChartProps} from "..";
import React from "react";

export const data3: LineChartProps<any> = {
    valueSelector:e => [e.v1, e.v2, e.v3, e.v4, e.v5, e.v6, e.v7, e.v8],
    data : [
        {v1: 1, v2: 4, v3: 11, v4: 2, v5: 9, v6: 0, v7: 3, v8: 3, extraData: 'one'},
        {v1: 3, v2: 4, v3: 13, v4: 3, v5: 5, v6: undefined, v7: 5, v8: 6, extraData: 'two'},
        {v1: 5, v2: 3, v3: 15, v4: 4, v5: 6, v6: undefined, v7: 3, v8: 8, extraData: 'three'},
        {v1: 8, v2: 4, v3: 18, v4: 5, v5: 7, v6: undefined, v7: 10, v8: 14, extraData: 'four'},
        {v1: 4, v2: 8, v3: 14, v4: 2, v5: 4, v6: undefined, v7: 6, v8: 9, extraData: 'five'},
        {v1: 6, v2: 9, v3: 16, v4: 1, v5: 4, v6: undefined, v7: 4, v8: 4, extraData: 'six'},
        {v1: 2, v2: 3, v3: 12, v4: 11, v5: 8, v6: undefined, v7: 7, v8: 2, extraData: 'seven'},
        {v1: 1, v2: 2, v3: 11, v4: 4, v5: 9, v6: 21, v7: 8, v8: 6, extraData: 'eight'}
    ],
    renderSeparatedTooltip(e) {
        return <span style={{...e.position, color: e.labels[e.lineIndex].labelColor}}>
            {e.value}
        </span>
    },
}
