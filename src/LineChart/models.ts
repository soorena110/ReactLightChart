import * as React from "react";
import {Label} from "./models/labels";
import {IndexesAxisInfo, ValuesAxisInfo} from "./models/axis";
import {SeparatedTooltipRendererParams, TooltipRendererParams} from "./models/tooltip";

export type ValuesInfo = {
    minimumValue: number;
    maximumValue: number;
}


export type DataType = object | number | undefined;
export type LineChartProps<TData extends DataType> = {
    data: TData[];

    labels?: Label[];

    valueSelector?: keyof TData | ((d: TData) => number | undefined | (number | undefined)[]);
    indexSelector?: keyof TData | ((d: TData) => string | number);

    indexAxis?: IndexesAxisInfo | ((e: ValuesInfo) => IndexesAxisInfo);
    valueAxis?: ValuesAxisInfo | ((e: ValuesInfo) => ValuesAxisInfo);

    overrideSizes?: {
        left?: number;
        bottom?: number;
        right?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    renderTooltip?: null | ((params: TooltipRendererParams<TData>) => React.ReactNode);
    renderSeparatedTooltip?: (params: SeparatedTooltipRendererParams<TData>) => React.ReactNode;

    style?: React.CSSProperties;
    className?: string;
}
