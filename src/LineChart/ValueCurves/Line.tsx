import * as React from 'react';
import { useMemo } from 'react';
import { useChartContext } from '../context';
import { findCrossingPoint, getPointPosition, getPolylinePoints, Point, pointToString } from './utils';

interface Props {
    lineNumber: number;
}

export default function Line({lineNumber}: Props) {
    const context = useChartContext();
    const {dataMapper: {estimatedValuesGroup, labels}} = context;
    const {stroke, comparativeLabelIndex} = labels[lineNumber];

    const polyLinePoints = getPolylinePoints(lineNumber, context);

    const getStrokeColor = (pointIndex: number) => {
        if (!stroke || typeof stroke == 'string') return stroke;
        return stroke(context.dataMapper.getLinePointEventArgs(lineNumber, pointIndex));
    };

    const lineGroups = useMemo(() => {
        let tempPoints: Point[] = [];
        const lines: { color?: string, points: Point[] }[] = [];
        let prevStrokeColor = getStrokeColor(0);

        estimatedValuesGroup.forEach((_, pointIndex) => {
            const strokeColor = getStrokeColor(pointIndex);
            const currentPoint = polyLinePoints[pointIndex];

            if (prevStrokeColor != strokeColor) {
                const lastPoint = tempPoints[tempPoints.length - 1];
                const middlePoint: Point = comparativeLabelIndex != undefined ?
                    findCrossingPoint(
                        [
                            getPointPosition(pointIndex - 1, estimatedValuesGroup[pointIndex - 1][lineNumber], context),
                            getPointPosition(pointIndex, estimatedValuesGroup[pointIndex][lineNumber], context),
                        ], [
                            getPointPosition(pointIndex - 1, estimatedValuesGroup[pointIndex - 1][comparativeLabelIndex], context),
                            getPointPosition(pointIndex, estimatedValuesGroup[pointIndex][comparativeLabelIndex], context),
                        ]) :
                    {x: (lastPoint.x + currentPoint.x) / 2, y: (lastPoint.y + currentPoint.y) / 2};
                tempPoints.push(middlePoint);
                lines.push({color: prevStrokeColor, points: tempPoints});
                tempPoints = [middlePoint];
                prevStrokeColor = strokeColor;
            }
            tempPoints.push(currentPoint);
        });
        if (tempPoints.length) lines.push({color: prevStrokeColor, points: tempPoints});

        return lines;
    }, [estimatedValuesGroup]);

    return <>
        {lineGroups.map(({color, points}, ix) =>
            <polyline key={ix} points={points.map(pointToString).join(' ')} style={s.lineChartDataPolyline}
                      stroke={color}/>
        )}
    </>;
}


const s = {
    lineChartDataPolyline: {
        fill: 'transparent',
        strokeLinecap: 'round',
        strokeWidth: .3,
        strokeOpacity: .8
    } as React.CSSProperties
};
