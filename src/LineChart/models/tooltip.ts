import * as React from "react";
import { Label } from "./labels";
import { DataType, LineChartProps } from "./index";


type PointParameters<TData extends DataType> = {
    data: TData;
    prevDefinedData?: TData;
    nextDefinedData?: TData;
    index: string | number;
    values: (number | undefined)[];
    estimatedValues: number[];
    arrayIndex: number;
    pointPosition: { position: 'absolute', left: string, top: string, zIndex: number };
    props: LineChartProps<TData>;
    labels: Label[];
}

export type TooltipRendererParams<TData extends DataType> = PointParameters<TData> & {
    defaultCssProps: React.CSSProperties;
}

export type SeparatedTooltipRendererParams<TData extends DataType> = PointParameters<TData> & {
    value: number | undefined;
    estimatedValue: number;
    lineIndex: number;
    prevDefinedValue?: number;
    nextDefinedValue?: number;
}
