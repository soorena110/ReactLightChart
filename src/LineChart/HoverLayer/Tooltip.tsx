import { useChartContext } from '../context';
import * as React from 'react';
import { getPointPosition } from '../ValueCurves/utils';


export default function Tooltip({pointIndex}: { pointIndex?: number }) {
    const context = useChartContext();
    const {props, dataMapper: {valuesGroup, estimatedValuesGroup}} = context;
    if (pointIndex == undefined ) return null;

    const estimatedValues = estimatedValuesGroup[pointIndex];
    const values = valuesGroup[pointIndex];

    const fixOffset = 5;

    if (props.renderSeparatedTooltip) {
        return <>
            {estimatedValues.map(
                (estimatedValue, lineNumber) => {
                    const {x, y} = getPointPosition(pointIndex, estimatedValues[lineNumber]!, context);

                    return <React.Fragment key={lineNumber}>
                        {props.renderSeparatedTooltip!({
                            ...context.dataMapper.getLinePointEventArgs(lineNumber, pointIndex),
                            lineIndex: lineNumber,
                            estimatedValue,
                            position: {left: x + '%', top: y + '%', position: 'absolute', zIndex: 5},
                        })}
                    </React.Fragment>;
                }
            )}
        </>;
    }

    if (props.renderTooltip) {
        const {x, y} = getPointPosition(pointIndex, values[0]!, context);
        return <>
            {props.renderTooltip({
                ...context.dataMapper.getLineEventArg(pointIndex),
                position: {left: x + '%', top: y + '%', position: 'absolute', zIndex: 5},
                defaultCssProps: {
                    ...s.lineChartTooltip,
                    top: y < 50 ? y + fixOffset + '%' : undefined,
                    bottom: y < 50 ? undefined : 100 - y + fixOffset + '%',
                    left: x < 50 ? x + fixOffset + '%' : undefined,
                    right: x < 50 ? undefined : 100 - x + fixOffset + '%'
                },
            })}
        </>;
    }

    return null;
}


const s = {
    lineChartTooltip: {
        display: 'inline-block',
        position: 'absolute',
        direction: 'rtl',
        background: 'white',
        padding: 5,
        border: 'solid 1px #dfe3e6',
        zIndex: 10
    } as React.CSSProperties
};
