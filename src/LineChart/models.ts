import * as React from "react";
import {PointList} from "./PointMapper";

export interface LineChartProps {
    labels: {
        name: string;
        color: string;
    }[];
    indexes: string[];
    valuesList: PointList[];

    isIndexesAsNumber?: boolean;
    isAreaChart?: boolean;
    isVertical?: boolean;
    axisOptions?: { shownIndexesCount: number, shownValuesCount: number };

    style?: React.CSSProperties;
}

export const chartOffset = {left: 0, bottom: 10, right: 0, top: 2, width: 100, height: 100};