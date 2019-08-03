import * as React from "react";
import {default as PointMapper} from "../PointMapper/index";
import './AxisLines.css';
import {chartOffset, LineChartProps} from "../models";

interface Props extends LineChartProps{
    dataMapper: PointMapper;
}

export default class AxisLines extends React.Component<Props> {

    private _getVerticalAndHorizonalShownValuesCountOnGrid() {
        if (!this.props.axisOptions)
            return {verticalShownValuesCount: 0, horizonalShownValuesCount: 0};

        const verticalShownValuesCount = !this.props.isVertical ? this.props.axisOptions.shownIndexesCount : this.props.axisOptions.shownValuesCount;
        const horizonalShownValuesCount = !this.props.isVertical ? this.props.axisOptions.shownValuesCount : this.props.axisOptions.shownIndexesCount;
        return {verticalShownValuesCount, horizonalShownValuesCount}
    }

    private _getDistancesBetweenGridLines() {
        if (!this.props.axisOptions)
            return {lineXDistance: 0, lineYDistance: 0};

        const lineXDistance = (chartOffset.width - chartOffset.left - chartOffset.right) / this.props.axisOptions.shownIndexesCount;
        const lineYDistance = (chartOffset.height - chartOffset.bottom - chartOffset.top) / this.props.axisOptions.shownValuesCount;
        return {lineXDistance, lineYDistance}
    }

    render() {

        const ret = [];

        const {lineXDistance, lineYDistance} = this._getDistancesBetweenGridLines();

        const {verticalShownValuesCount, horizonalShownValuesCount} = this._getVerticalAndHorizonalShownValuesCountOnGrid();

        for (let lineIndex = 0; lineIndex < horizonalShownValuesCount; lineIndex++) {
            const x = chartOffset.left - 3;
            const y = chartOffset.top + lineYDistance * lineIndex;
            ret.push(<line x1={x} y1={y} x2={chartOffset.width} y2={y} key={'y_' + lineIndex}
                           className="line-chart-axis-line"/>);
        }

        for (let lineIndex = 1; lineIndex <= verticalShownValuesCount; lineIndex++) {
            const x = chartOffset.left + lineXDistance * lineIndex;
            const y = chartOffset.height - chartOffset.bottom + 5;
            ret.push(<line x1={x} y1={5} x2={x} y2={y} key={'x_' + lineIndex}
                           className="line-chart-axis-line"/>);
        }

        return ret;
    }

}