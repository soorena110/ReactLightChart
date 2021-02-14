import {LineChartProps} from "./models";
import {default as PointMapper} from "./PointMapper";
import React, {useContext, useMemo} from "react";
import {getChartOffset} from "./index";

export interface ChartContextInfo {
    props: LineChartProps<any>;
    dataMapper: PointMapper<any>;
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

// @ts-ignore
export const contextObject = React.createContext<ChartContextInfo>({});

export function useChartContext() {
    return useContext<ChartContextInfo>(contextObject);
}

export function ChartProvider(props: { children: React.ReactNode, chartProps: any }) {
    const Provider = contextObject.Provider

    const dataMapper = useMemo(() => new PointMapper(props.chartProps), [props.chartProps])
    const offsets = useMemo(() => getChartOffset(props.chartProps.overrideSizes), [props.chartProps])

    return <Provider value={{dataMapper, props: props.chartProps, offsets}}>
        {props.children}
    </Provider>
}
