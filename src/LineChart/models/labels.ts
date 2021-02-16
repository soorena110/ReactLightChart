export type LineChartAreaColor = string | {
    rotation?: number;
    grads: {
        stop: string | number;
        color: string;
    }[]
};

export type Label = {
    title?: string;
    stroke?: string;
    area?: LineChartAreaColor;
    labelColor?: string;
}
