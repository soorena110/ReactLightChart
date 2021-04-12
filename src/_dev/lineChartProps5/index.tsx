import { LineChartProps } from "../../index";
import { data } from './data';
import { label1, label2 } from './labels';
import renderHoverLine  from './renderHoverLine';
import renderSeparatedTooltip from './renderSeparatedTooltip';
import renderStep from './renderStep';


export const data5: LineChartProps<typeof data[0]> = {
    labels: [
        label1,
        label2
    ],
    valueSelector: e => [e.nav, e.nav2],
    indexSelector: e => e.timestamp,
    indexAxis: {
        linesCount: 5
    },
    valueAxis: {
        linesCount: 8,
        minimumValue: 0
    },
    data,
    renderSeparatedTooltip,
    renderHoverLine,
    renderStep
};
