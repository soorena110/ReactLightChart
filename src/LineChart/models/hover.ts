/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Label } from "./labels";
import { DataType, LineChartProps } from "./index";
import { ChartSizesInfo } from './sizes';


export type PointParameters<TData extends DataType> = {
    data: TData;
    index: string | number;
    values: (number | undefined)[];
    estimatedValues: number[];
    arrayIndex: number;
    props: LineChartProps<TData>;
    labels: Label[];
}

export type LinePointParameters<TData extends DataType> = PointParameters<TData> & {
    value: number | undefined;
    estimatedValue: number;
    lineIndex: number;
    prevDefinedValue?: number;
    nextDefinedValue?: number;
    prevDefinedData?: TData;
    nextDefinedData?: TData;
}

export type StepRendererParams<TData extends DataType = any> = PointParameters<TData> & {
    hovered: boolean;
    color?: string;
    position: {  left: string, top: string, zIndex: number };
}


export type TooltipRendererParams<TData extends DataType> = PointParameters<TData> & {
    defaultCssProps: React.CSSProperties;
    prevDefinedData?: TData;
    nextDefinedData?: TData;
    position: { position: 'absolute', left: string, top: string, zIndex: number };
}

export type SeparatedTooltipRendererParams<TData extends DataType = any> = LinePointParameters<TData> & {
    position: { position: 'absolute', left: string, top: string, zIndex: number };
}

export type HoverLineRendererParams<TData extends DataType = any> = LinePointParameters<TData> & {
    color?: string;
    sizes: ChartSizesInfo;
    position: { left: string, top: string, zIndex: number };
}
