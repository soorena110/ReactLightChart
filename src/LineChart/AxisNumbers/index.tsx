import * as React from "react";
import {default as PointMapper} from "../PointMapper/index";
import {chartOffset, LineChartProps} from "../models";
import './style.css';
import Persian from "persian-info";
import {shortenNumber} from "../../Common/NumberFormat";

interface Props extends LineChartProps {
    dataMapper: PointMapper;
}

interface State {
    mouseXByPercent?: number;
}

export default class AxisNumbers extends React.Component<Props, State> {

    private _getDisplayNumber(value: number, isVerticalAxis: boolean) {
        const isAsNumber = (isVerticalAxis ? !!this.props.isVertical : !this.props.isVertical) || !!this.props.isIndexesAsNumber;
        const shouldShorten = isVerticalAxis ? !!this.props.isVertical : !this.props.isVertical;

        if (shouldShorten)
            return shortenNumber(value);
        else if (isAsNumber)
            return Persian.number.formatPrice(value);
        return value;
    }

    private _createVerticalLine(valueStops: any[], lineXDistance: number) {
        return valueStops.map((valueStop, lineIndex) => {
            const value = this._getDisplayNumber(valueStop, true);

            return <span key={"ver_" + lineIndex}
                         className="line-chart-axis-number"
                         style={{
                             top: chartOffset.height - chartOffset.bottom + 2 + '%',
                             left: lineIndex != valueStops.length - 1 ?
                                 chartOffset.left + lineXDistance * lineIndex + 1 + '%' :
                                 undefined,
                             right: lineIndex == valueStops.length - 1 ? 0 : undefined,
                             transform: lineIndex != valueStops.length - 1 && lineIndex != 0 ? 'translateX(-50%)' : undefined
                         }}>
                    {value}
                </span>
        });
    };

    private _createHorizonalLine(valueStops: any[], lineYDistance: number) {
        return valueStops.map((valueStop, lineIndex) => {
            const value = this._getDisplayNumber(valueStop, false);

            return <span key={"hor_" + lineIndex}
                         className={"line-chart-axis-number"}
                         style={{
                             top: `calc(${chartOffset.top + lineYDistance * lineIndex}% - ${
                                 lineIndex == 0 ? 5 :
                                     lineIndex == valueStops.length - 1 ? 17 : 10}px)`,
                             left: chartOffset.left + 1 + '%'
                         }}>
                {value}
                </span>
        });
    };

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
        if (!this.props.axisOptions)
            return;

        const {lineXDistance, lineYDistance} = this._getDistancesBetweenGridLines();
        const minAndMaxY = this.props.dataMapper.getMinAndMaxValue();

        const shownIndexes = [];
        const shownValues = [];

        const {verticalShownValuesCount, horizonalShownValuesCount} = this._getVerticalAndHorizonalShownValuesCountOnGrid();

        for (let lineIndex = 0; lineIndex < verticalShownValuesCount; lineIndex++)
            shownIndexes.push(this.props.indexes[Math.round(lineIndex * this.props.indexes.length / verticalShownValuesCount)]);
        shownIndexes.push(this.props.indexes[this.props.indexes.length - 1]);

        for (let lineIndex = 0; lineIndex <= horizonalShownValuesCount; lineIndex++)
            shownValues.push(Math.round(minAndMaxY.max - lineIndex * (minAndMaxY.max - minAndMaxY.min) / horizonalShownValuesCount));

        let valueStops = shownIndexes as any[];
        if (this.props.isVertical) {
            valueStops = [...shownValues];
            valueStops.reverse()
        }
        const verticalLines = this._createVerticalLine(valueStops, lineXDistance);

        const horizonalLines = this._createHorizonalLine(!this.props.isVertical ? shownValues : shownIndexes, lineYDistance);

        return [...verticalLines, ...horizonalLines];
    }
}