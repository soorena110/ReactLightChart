import { ChartContextInfo } from '../context';


export interface Point {
    x: number;
    y: number;
}


export function getPolylinePoints(lineNumber: number, context: ChartContextInfo) {
    const {dataMapper: {estimatedValuesGroup, indexes}} = context;
    return indexes.map((_, ix) => {
        const value = estimatedValuesGroup[ix][lineNumber];
        return getPointPosition(ix, value, context);
    });
}

export function pointToString(point?: Point) {
    if (!point) return '';
    return `${point.x},${point.y}`;
}

export function findCrossingPoint(line1: [Point, Point], line2: [Point, Point]): Point {
    const ya = line1[0].y;
    const yb = line2[0].y;
    const a = (ya - line1[1].y) / (line1[0].x - line1[1].x);
    const b = (yb - line2[1].y) / (line2[0].x - line2[1].x);

    const x = (yb - ya) / (a - b);
    return {x: x + line1[0].x, y: a * x + ya};
}


export function getPointPosition(index: number, value: number, {dataMapper, offsets}: ChartContextInfo) {
    const {x, y} = dataMapper.getPointPosition(index, value);

    return {
        x: x * offsets.innerWidth + offsets.left,
        y: (1 - y) * offsets.innerHeight + offsets.top
    };
}
