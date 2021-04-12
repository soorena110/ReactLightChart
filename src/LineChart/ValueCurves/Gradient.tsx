import * as React from 'react';
import { useMemo } from 'react';
import { useChartContext } from '../context';
import { findCrossingPoint, getPointPosition, getPolylinePoints, Point, pointToString } from './utils';
import { LineChartAreaColor } from '../models/labels';

interface Props {
    lineNumber: number;
}

export default function Gradient({lineNumber}: Props) {
    const context = useChartContext();
    const {dataMapper: {estimatedValuesGroup, labels}} = context;
    const {area, gradientTowardLabelIndex} = labels[lineNumber];

    const polyLinePoints = getPolylinePoints(lineNumber, context);

    const getAreaColor = (pointIndex: number) => {
        if (typeof area != 'function') return area;
        return area(context.dataMapper.getLinePointEventArgs(lineNumber, pointIndex));
    };

    const lineGroups = useMemo(() => {
        let tempPoints: Point[] = [];
        const lines: { areaColor?: LineChartAreaColor, points: Point[] }[] = [];
        let prevStrokeColor = getAreaColor(0);

        estimatedValuesGroup.forEach((_, pointIndex) => {
            const areaColor = getAreaColor(pointIndex);
            const currentPoint = polyLinePoints[pointIndex];

            if (JSON.stringify(prevStrokeColor) != JSON.stringify(areaColor)) {
                const lastPoint = tempPoints[tempPoints.length - 1];
                const middlePoint: Point = gradientTowardLabelIndex != undefined ?
                    findCrossingPoint(
                        [
                            getPointPosition(pointIndex - 1, estimatedValuesGroup[pointIndex - 1][lineNumber], context),
                            getPointPosition(pointIndex, estimatedValuesGroup[pointIndex][lineNumber], context),
                        ], [
                            getPointPosition(pointIndex - 1, estimatedValuesGroup[pointIndex - 1][gradientTowardLabelIndex], context),
                            getPointPosition(pointIndex, estimatedValuesGroup[pointIndex][gradientTowardLabelIndex], context),
                        ]) :
                    {x: (lastPoint.x + currentPoint.x) / 2, y: (lastPoint.y + currentPoint.y) / 2};
                tempPoints.push(middlePoint);

                if (gradientTowardLabelIndex != undefined) {
                    const len = tempPoints.length;
                    for (let i = 0; i < len - 1; i++) {
                        const ix = pointIndex - i - 1;
                        const g = estimatedValuesGroup[ix][gradientTowardLabelIndex];
                        tempPoints.push(getPointPosition(ix, g, context));
                    }
                }


                lines.push({areaColor: prevStrokeColor, points: tempPoints});
                tempPoints = [middlePoint];
                prevStrokeColor = areaColor;
            }
            tempPoints.push(currentPoint);
        });
        if (tempPoints.length) {
            if (gradientTowardLabelIndex != undefined) {
                const len = tempPoints.length;
                for (let i = 0; i < len - 1; i++) {
                    const ix = estimatedValuesGroup.length - i - 1;
                    const g = estimatedValuesGroup[ix][gradientTowardLabelIndex];
                    tempPoints.push(getPointPosition(ix, g, context));
                }
            }

            lines.push({areaColor: prevStrokeColor, points: tempPoints});
        }

        return lines;
    }, [estimatedValuesGroup]);

    return <>
        {lineGroups.map(({areaColor, points}, ix) => {
            if (!areaColor) return null;

            let polygon = points.map(pointToString).join(' ');
            if (gradientTowardLabelIndex == undefined) {
                polygon = `${pointToString({
                    x: points[0].x,
                    y: 100
                })} ${polygon} ${pointToString({x: points[points.length - 1].x, y: 100})}`;
            }

            if (typeof areaColor == 'string') {
                return <polyline key={ix} points={polygon} style={s.lineChartDataPolygon} fill={areaColor}/>;
            }
            const angleCoords = computeRotationOfGradient(areaColor.rotation);

            return <React.Fragment key={ix}>
                <defs>
                    <linearGradient id={`grad${lineNumber}-${ix}`} {...angleCoords}>
                        {areaColor.grads.map((r, ix) =>
                            <stop key={ix} offset={r.stop} stopColor={r.color}/>
                        )}
                    </linearGradient>
                </defs>
                <polyline points={polygon} style={s.lineChartDataPolygon} fill={`url(#grad${lineNumber}-${ix})`}/>
            </React.Fragment>;
        })}
    </>;
}

function computeRotationOfGradient(rotation = 0) {
    const anglePI = rotation * (Math.PI / 180);
    return {
        x1: Math.round(50 + Math.sin(anglePI) * 50) + '%',
        y1: Math.round(50 + Math.cos(anglePI) * 50) + '%',
        x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
        y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
    };
}


const s = {
    lineChartDataPolygon: {
        stroke: 'transparent',
        strokeWidth: 0,
    } as React.CSSProperties,
};
