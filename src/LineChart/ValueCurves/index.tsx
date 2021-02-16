import * as React from "react";
import {ChartContextInfo, useChartContext} from "../context";
import {LineChartAreaColor} from "../models/labels";


export default function ValueCurves() {
    const context = useChartContext();
    const {props, offsets, dataMapper:{valuesGroup, labels}} = context;

    return <>
        {valuesGroup[0].map((_, lineNumber) => {
            const polyLine = getPolylinePoints(lineNumber, context);
            const {stroke, area} = labels[lineNumber];

            const beginPoint = pointToString({x: offsets.left, y: offsets.innerHeight + offsets.top});
            const endPoint = pointToString({x: 100, y: offsets.innerHeight + offsets.top});

            return <React.Fragment key={lineNumber}>
                {renderFilledArea(lineNumber, `${beginPoint} ${polyLine} ${endPoint}`, area)}
                {stroke && <polyline points={polyLine}
                                     style={s.lineChartDataPolyline}
                                     stroke={stroke}/>}
            </React.Fragment>
        })}
    </>;
}

function getPolylinePoints(lineNumber: number, context: ChartContextInfo) {
    const {dataMapper: {valuesGroup, indexes}} = context;
    const points = indexes.map((_, ix) => {
        const value = valuesGroup[ix][lineNumber];
        return getPointPosition(ix, value, context);
    });
    return points.map(pointToString).join(' ');
}

function pointToString(point?: { x: number | string, y: number | string }) {
    if (!point)
        return '';

    return `${point.x},${point.y}`
}


function getPointPosition(index: number, value: number | undefined, {dataMapper, offsets}: ChartContextInfo) {

    if (value == undefined)
        return undefined;

    const {x, y} = dataMapper.getPointPosition(index, value);

    return {
        x: x * offsets.innerWidth + offsets.left,
        y: (1 - y) * offsets.innerHeight + offsets.top
    }
}


function renderFilledArea(lineNumber: number, linePointsAsPolylineInput: string, areaColor?: LineChartAreaColor) {
    if (!areaColor)
        return null;

    if (typeof areaColor == 'string')
        return <polyline points={linePointsAsPolylineInput}
                         style={s.lineChartDataPolygon}
                         fill={areaColor}/>;


    const angleCoords = computeRotationOfGradient(areaColor.rotation)

    return <>
        <defs>
            <linearGradient id={`grad${lineNumber}`} {...angleCoords}>
                {areaColor.grads.map((r, ix) =>
                    <stop key={ix} offset={r.stop} stopColor={r.color}/>
                )}
            </linearGradient>
        </defs>
        <polyline points={linePointsAsPolylineInput}
                  style={s.lineChartDataPolygon}
                  fill={`url(#grad${lineNumber})`}/>
    </>
}


function computeRotationOfGradient(rotation = 0) {
    const anglePI = rotation * (Math.PI / 180);
    return {
        x1: Math.round(50 + Math.sin(anglePI) * 50) + '%',
        y1: Math.round(50 + Math.cos(anglePI) * 50) + '%',
        x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
        y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
    }
}

const s = {
    lineChartDataPolygon: {
        stroke: 'transparent',
        strokeWidth: 0,
    } as React.CSSProperties,

    lineChartDataPolyline: {
        fill: 'transparent',
        strokeLinecap: 'round',
        strokeWidth: .3,
        strokeOpacity: .8
    } as React.CSSProperties
}
