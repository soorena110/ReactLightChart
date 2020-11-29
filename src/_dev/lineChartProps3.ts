import {LineChartProps} from "..";

const indexes = new Array(300).fill(1).map((r, ix) => ix);
const valuesList1 = {} as any;
let x = 100;
indexes.forEach((r, ix) =>
    valuesList1[ix] = x += Math.random() * 10 - 5)

export const data3: LineChartProps = {
    labels: [
        {
            name: "one",
            stroke: '#8795F3',
            labelColor: '#8795F3',
            area: {
                rotation: 180,
                grads: [
                    {color: 'rgba(135,149,243,.4)', stop: 0},
                    {color: 'rgba(135,149,243,.2)', stop: .8},
                    {color: 'rgba(135,149,243,0)', stop: 1}
                ]
            }
        }
    ],
    indexes,
    valuesList: [valuesList1],

    axis: {
        values: {
            shownCount: 5,
            lineProps: {strokeDasharray: 1}
        },
        indexes: {
            shownCount: 8,
            dontShowLines: true,
            rotation: 90,
            renderLabels: value => value + '%'
        }
    }
}
