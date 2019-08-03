import * as React from "react";
import {default as PointMapper} from "../PointMapper";
import {chartOffset, LineChartProps} from "../models";
import './ValueCurves.css';

interface Props extends  LineChartProps{
    dataMapper: PointMapper;
}

export default class ValueCurves extends React.Component<Props> {

    private _getPointPosition(index: number, value?: number) {
        if (value == undefined)
            return undefined;

        const {x, y} = this.props.dataMapper.getPointPosition(index, value);

        if (this.props.isVertical)
            return {
                x: y * (chartOffset.width - chartOffset.right - chartOffset.left) + chartOffset.left,
                y: x * (chartOffset.height - chartOffset.bottom - chartOffset.top) + chartOffset.top
            };
        return {
            x: x * (chartOffset.width - chartOffset.right - chartOffset.left) + chartOffset.left,
            y: (chartOffset.height - chartOffset.bottom) - y * (chartOffset.height - chartOffset.bottom - chartOffset.top) + chartOffset.top
        }
    }

    render() {
        const lines = [];
        for (let lineIndex = 0; lineIndex < this.props.valuesList.length; lineIndex++) {
            const lineYs = this.props.dataMapper.getValuesForIndex(lineIndex);

            const beginPoint = this._getPointPosition(0, 0);
            const endPoint = this._getPointPosition(this.props.indexes.length - 1, 0);
            const points = [beginPoint, ...this.props.indexes.map((x, ix) => this._getPointPosition(ix, lineYs[x])), endPoint];

            const linePointsAsPolylineInput = points.map((point) => point ? `${point.x},${point.y}` : '').join(' ');

            const color = this.props.labels[lineIndex].color;
            lines.push(<React.Fragment key={lineIndex}>
                {this.props.isAreaChart &&
                <polyline points={linePointsAsPolylineInput}
                          className="line-chart-data-polygon"
                          fill={color}/>}
                <polyline points={linePointsAsPolylineInput}
                          className="line-chart-data-polyline"
                          stroke={color}/>
            </React.Fragment>)
        }
        return lines;
    }

}