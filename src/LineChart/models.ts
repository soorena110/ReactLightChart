import * as React from "react";
import {SVGProps} from "react";

export type ValuesInfo = {
    minimumValue: number;
    maximumValue: number;
}

export type LineChartGradientColor = string | {
    rotation?: number;
    grads: {
        stop: string | number;
        color: string;
    }[]
};

type AxisInfo = {
    linesCount?: number | null;
    linesProps?: SVGProps<SVGLineElement>;
    rotation?: number;
}

export type IndexesAxisInfo = AxisInfo & {
    renderLabels?: (value: string | number) => React.ReactNode;
}

export type ValuesAxisInfo = IndexesAxisInfo & {
    inside?: boolean;
    minimumValue?: number;
    maximumValue?: number;
    renderLabels?: (value: number) => React.ReactNode;
}

export type DataType = object | number | undefined;

type LineChartPropsDataSelector<TData extends DataType> =
    TData extends object ? {
        valueSelector: keyof TData | keyof TData[] | ((d: TData) => number | undefined | (number | undefined)[]);
        indexSelector?: keyof TData | ((d: TData) => string | number);
    } : {
        valueSelector?: never;
        indexSelector?: never;
    }

export type LineChartProps<TData extends DataType> = LineChartPropsDataSelector<TData> & {
    data: TData[];

    labels: {
        title: string;
        stroke?: string;
        area?: LineChartGradientColor;
        labelColor?: string;
    }[];

    indexAxis: IndexesAxisInfo | ((e: ValuesInfo) => IndexesAxisInfo);
    valueAxis: ValuesAxisInfo | ((e: ValuesInfo) => ValuesAxisInfo);

    overrideSizes?: {
        left?: number;
        bottom?: number;
        right?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    renderTooltip?: null | ((
        params: {
            data: TData;
            prevDefinedData:TData;
            nextDefinedData:TData;
            index: string | number;
            values: (number | undefined)[];
            arrayIndex: number;
            defaultCssProps: React.CSSProperties;
            pointPosition: { position: 'absolute', left: string, top: string },
            props: LineChartProps<TData>
        }
    ) => React.ReactNode);

    renderSeparatedTooltip?: (
        params: {
            data: TData;
            prevDefinedData:TData;
            nextDefinedData:TData;
            value: number | undefined;
            valueIndex: number;
            index: string | number;
            arrayIndex: number;
            values: (number | undefined)[];
            pointPosition: { position: 'absolute', left: string, top: string },
            props: LineChartProps<TData>
        }
    ) => React.ReactNode;

    style?: React.CSSProperties;
    className?: string;
}
