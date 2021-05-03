import * as React from 'react';
import { useChartContext } from '../context';
import { getPointPosition } from '../ValueCurves/utils';

export default function HoverLine({pointIndex}: { pointIndex?: number }) {
    const context = useChartContext();
    const {offsets, dataMapper: {estimatedValuesGroup, labels}, props: {renderHoverLine}} = context;
    if (pointIndex == undefined || !renderHoverLine) return null;

    const xValueInThisIndex = estimatedValuesGroup[pointIndex];
    if (!xValueInThisIndex) return null;

    return <>
        {xValueInThisIndex.map((y, lineIndex) => {
            const position = getPointPosition(pointIndex, y, context);
            const label = labels[lineIndex];
            const color = label.hoverColor || label.labelColor;

            return <React.Fragment key={lineIndex}>
                {renderHoverLine({
                    ...context.dataMapper.getLinePointEventArgs(lineIndex, pointIndex),
                    color, sizes: offsets,
                    position: {
                        left: position.x + '%',
                        top: position.y + '%',
                        zIndex: 15
                    }
                })}
            </React.Fragment>;
        })}
    </>;
}
