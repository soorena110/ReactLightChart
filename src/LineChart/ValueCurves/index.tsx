import * as React from "react";
import {ChartContextInfo, useChartContext} from "../context";
import {LineChartGradientColor} from "../models";


export default function ValueCurves() {
    const context = useChartContext();
    const {props, offsets} = context;

    return <>
        {props.valuesList.map((_, lineIndex) => {
            const polyLine = getPolylinePoints(lineIndex, context);
            const {stroke, area} = props.labels[lineIndex];

            const beginPoint = pointToString({x: offsets.left, y: offsets.innerHeight + offsets.top});
            const endPoint = pointToString({x: 100, y: offsets.innerHeight + offsets.top});

            return <React.Fragment key={lineIndex}>
                {renderFilledArea(lineIndex, `${beginPoint} ${polyLine} ${endPoint}`, area)}
                {stroke && <polyline points={polyLine}
                                     style={s.lineChartDataPolyline}
                                     stroke={stroke}/>}
            </React.Fragment>
        })}
    </>;
}

function getPolylinePoints(lineIndex: number, context: ChartContextInfo) {
    const {dataMapper, props} = context;
    const lineYs = dataMapper.getValuesForIndex(lineIndex);
    const points = props.indexes.map((x, ix) => getPointPosition(ix, lineYs[x], context));
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


function renderFilledArea(lineIndex: number, linePointsAsPolylineInput: string, areaColor?: LineChartGradientColor) {
    if (!areaColor)
        return null;

    if (typeof areaColor == 'string')
        return <polyline points={linePointsAsPolylineInput}
                         style={s.lineChartDataPolygon}
                         fill={areaColor}/>;


    const angleCoords = computeRotationOfGradient(areaColor.rotation)

    return <>
        <defs>
            <linearGradient id={`grad${lineIndex}`} {...angleCoords}>
                {areaColor.grads.map((r, ix) =>
                    <stop key={ix} offset={r.stop} stopColor={r.color}/>
                )}
            </linearGradient>
        </defs>
        <polyline points={linePointsAsPolylineInput}
                  style={s.lineChartDataPolygon}
                  fill={`url(#grad${lineIndex})`}/>
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
