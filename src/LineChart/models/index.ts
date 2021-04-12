import * as React from "react";
import { Label } from "./labels";
import { IndexesAxisInfo, ValuesAxisInfo, ValuesInfo } from "./axis";
import {
    HoverLineRendererParams,
    SeparatedTooltipRendererParams,
    StepRendererParams,
    TooltipRendererParams
} from "./hover";
import { LineChartSizes } from './sizes';


export type DataType = object | number | undefined;
export type LineChartProps<TData extends DataType> = {
    data: TData[];

    labels?: Label<TData>[];

    valueSelector?: keyof TData | ((d: TData) => number | undefined | (number | undefined)[]);
    indexSelector?: keyof TData | ((d: TData) => string | number);

    indexAxis?: IndexesAxisInfo | ((e: ValuesInfo) => IndexesAxisInfo);
    valueAxis?: ValuesAxisInfo | ((e: ValuesInfo) => ValuesAxisInfo);

    overrideSizes?: LineChartSizes;

    renderTooltip?: null | ((params: TooltipRendererParams<TData>) => React.ReactNode);
    renderSeparatedTooltip?: (params: SeparatedTooltipRendererParams<TData>) => React.ReactNode;
    renderStep?: (params: StepRendererParams<TData>) => React.ReactNode;
    renderHoverLine?: (params: HoverLineRendererParams<TData>) => React.ReactNode;

    style?: React.CSSProperties;
    className?: string;
}
