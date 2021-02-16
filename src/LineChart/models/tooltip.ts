import * as React from "react";
import {Label} from "./labels";
import {DataType, LineChartProps} from "../models";


type PointParameters<TData extends DataType> = {
    data: TData;
    prevDefinedData: TData;
    nextDefinedData: TData;
    index: string | number;
    values: (number | undefined)[];
    arrayIndex: number;
    pointPosition: { position: 'absolute', left: string, top: string };
    props: LineChartProps<TData>;
    labels: Label[];
}

export type TooltipRendererParams<TData extends DataType> = PointParameters<TData> & {
    defaultCssProps: React.CSSProperties;
}

export type SeparatedTooltipRendererParams<TData extends DataType> = PointParameters<TData> & {
    value: number | undefined;
    lineIndex: number;
}
