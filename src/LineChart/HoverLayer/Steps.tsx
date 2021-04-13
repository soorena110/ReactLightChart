import * as React from 'react';
import { useChartContext } from '../context';
import { getPointPosition } from '../ValueCurves/utils';

export default function Steps({hoveredPointIndex}: { hoveredPointIndex?: number }) {
    const context = useChartContext();
    const {dataMapper: {estimatedValuesGroup, labels}, props: {renderStep}} = context;
    if (!renderStep) return null;

    return <>
        {estimatedValuesGroup.map((values, pointIndex) => {
            return values.map((y, lineIndex) => {

                const position = getPointPosition(pointIndex, y, context);
                const stroke = labels[lineIndex].stroke;
                const linePointParams = context.dataMapper.getLinePointEventArgs(lineIndex, pointIndex);
                const color = typeof stroke === 'function' ? stroke(linePointParams) : stroke;
                const hovered = pointIndex === hoveredPointIndex;

                return <React.Fragment key={lineIndex}>
                    {renderStep({
                        ...linePointParams,
                        color, hovered,
                        position: {
                            top: position.y + '%',
                            left: position.x + '%',
                            zIndex: 15
                        }
                    })}
                </React.Fragment>;
            });
        })}
    </>;
}
