import * as React from "react";
import {SVGProps} from "react";

export type LineChartGradientColor = string | {
    rotation?: number;
    grads: {
        stop: string | number;
        color: string;
    }[]
};


export type IndexType = number | string;
export type PointListType = { [ix: string]: number };

export interface LineChartProps {
    labels: {
        name: string;
        stroke?: string;
        area?: LineChartGradientColor;
        labelColor?: string;
    }[];
    indexes: IndexType[];
    valuesList: PointListType[];
    minimumValue?:number;
    maximumValue?:number;

    overrideSizes?: {
        left?: number;
        bottom?: number;
        right?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    axis?: {
        values?: {
            shownCount?: number;
            inside?: boolean;
            lineProps?: SVGProps<SVGLineElement>;
            dontShowLines?: boolean;
            rotation?: number;
            renderLabels?: (value: number) => React.ReactNode;
        },
        indexes?: {
            shownCount?: number;
            lineProps?: SVGProps<SVGLineElement>;
            dontShowLines?: boolean;
            rotation?: number;
            renderLabels?: (value: string | number) => React.ReactNode;
        }
    };

    renderTooltip?: (data: { index: IndexType, values: number[], arrayIndex: number }, props: LineChartProps) => React.ReactNode;

    style?: React.CSSProperties;
    className?: string;
}
