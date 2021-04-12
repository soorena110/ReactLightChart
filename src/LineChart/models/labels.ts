/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinePointParameters } from './hover';
import { DataType } from './index';


export type LineChartAreaColor = string | {
    rotation?: number;
    grads: {
        stop: string | number;
        color: string;
    }[]
};

export interface Label<TData extends DataType = any> {
    title?: string;
    stroke?: string | ((params: LinePointParameters<TData>) => string);
    comparativeLabelIndex?: number;
    gradientTowardLabelIndex?: number;
    textColor?: string;
    hoverColor?: string;
    area?: LineChartAreaColor | ((params: LinePointParameters<TData>) => LineChartAreaColor);
    labelColor?: string;
}
