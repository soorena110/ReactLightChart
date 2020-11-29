import {LineChartProps} from "./models";
import {default as PointMapper} from "./PointMapper";
import React, {useContext} from "react";

export interface ChartContextInfo {
    props: LineChartProps;
    dataMapper: PointMapper;
    offsets: ChartOffsetsInfo
}


export interface ChartOffsetsInfo {
    left: number;
    bottom: number;
    right: number;
    top: number;
    width: number;
    height: number;
    innerHeight: number;
    innerWidth: number;
}

export const contextObject = React.createContext<ChartContextInfo>({} as any);

export function useChartContext() {
    return useContext<ChartContextInfo>(contextObject);
}
