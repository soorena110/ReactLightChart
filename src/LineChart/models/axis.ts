import {SVGProps} from "react";
import * as React from "react";

type AxisInfo = {
    linesCount?: number | null;
    linesProps?: SVGProps<SVGLineElement>;
    rotation?: number;
}

export type IndexesAxisInfo = AxisInfo & {
    renderLabels?: (value: string | number) => React.ReactNode;
}

export type ValuesAxisInfo = IndexesAxisInfo & {
    minimumValue?: number;
    maximumValue?: number;
    renderLabels?: (value: number) => React.ReactNode;
}
