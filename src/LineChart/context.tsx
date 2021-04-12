/* eslint-disable @typescript-eslint/no-explicit-any */
import {LineChartProps} from "./models";
import {default as PointMapper} from "./PointMapper";
import React, {useContext, useMemo} from "react";
import {getChartOffset} from "./index";
import { ChartSizesInfo } from './models/sizes';

export interface ChartContextInfo {
    props: LineChartProps<any>;
    dataMapper: PointMapper<any>;
    offsets: ChartSizesInfo
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
