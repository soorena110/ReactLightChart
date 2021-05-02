import * as React from "react";
import { SVGProps } from "react";

type AxisInfo = {
    linesCount?: number | null;
    linesProps?: SVGProps<SVGLineElement>;
    rotation?: number;
}

export type IndexesAxisInfo = AxisInfo & {
    renderLabels?: (value: string | number, index: number) => React.ReactNode;
}

export type ValuesAxisInfo = IndexesAxisInfo & {
    minimumValue?: number;
    maximumValue?: number;
    renderLabels?: (value: number, index: number) => React.ReactNode;
}

export type ValuesInfo = {
    minimumValue: number;
    maximumValue: number;
}
