import * as React from "react";
import {default as PointMapper} from "../PointMapper/index";
import Persian from "persian-info";
import {chartOffset, LineChartProps} from "../models";
import './style.css';

interface Props extends LineChartProps {
    dataMapper: PointMapper;
}

interface State {
    mouseXByPercent?: number;
}

export default class LineChartMouseIndicator extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    //#region Helpers

    private _getPointPosition(index: number, value: number) {
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

    //#endregion

    //#region Events

    private _handleMouseMove(e: React.MouseEvent<any>) {
        const bound = e.currentTarget.getBoundingClientRect();

        const effectiveBound = {
            left: chartOffset.left / chartOffset.width * bound.width,
            top: chartOffset.top / chartOffset.height * bound.height,
            width: (1 - (chartOffset.left + chartOffset.right) / chartOffset.width) * bound.width,
            height: (1 - (chartOffset.top + chartOffset.bottom) / chartOffset.height) * bound.height
        };

        const effectiveOffsetX = e.clientX - bound.x - effectiveBound.left;
        const horizonalXAxis = effectiveOffsetX / effectiveBound.width;

        const effectiveOffsetY = e.clientY - bound.y - effectiveBound.top;
        const verticalXAxis = effectiveOffsetY / effectiveBound.height;
        let mouseXByPercent = this.props.isVertical ? verticalXAxis : horizonalXAxis;

        if (mouseXByPercent < 0)
            mouseXByPercent = 0;
        if (mouseXByPercent > 1)
            mouseXByPercent = 1;
        this.setState({mouseXByPercent});
    }

    private _handleMouseLeave() {
        this.setState({mouseXByPercent: undefined});
    }

    //#endregion

    private _renderSelectorLine() {
        if (!this.state.mouseXByPercent)
            return;

        const currentIndex = Math.round(this.state.mouseXByPercent * this.props.indexes.length);
        const xValueInThisIndex = this.props.indexes[currentIndex];
        const yValuesInThisIndex = this.props.valuesList
            .map((ys, ix) => ({index: ix, value: ys[xValueInThisIndex]}))
            .filter(y => y.value != undefined);

        return yValuesInThisIndex.map(y => {
            const thePointPosition = this._getPointPosition(currentIndex, y.value);

            return <React.Fragment key={y.index}>
                <circle cx={thePointPosition.x + '%'}
                        cy={thePointPosition.y + '%'}
                        r={3}
                        className="line-chart-selection-symbol"
                        stroke={this.props.labels[y.index].color}/>
                <line className="line-chart-selection-line"
                      x1={thePointPosition.x + '%'}
                      x2={thePointPosition.x + '%'}
                      y1={chartOffset.top + '%'}
                      y2={chartOffset.height - chartOffset.bottom + '%'}
                      stroke={this.props.labels[y.index].color}/>
                <line className="line-chart-selection-line"
                      x1={chartOffset.left + '%'}
                      x2={chartOffset.width - chartOffset.right + '%'}
                      y1={thePointPosition.y + '%'}
                      y2={thePointPosition.y + '%'}
                      stroke={this.props.labels[y.index].color}/>
            </React.Fragment>
        });
    }

    private _renderTooltip() {
        if (!this.state.mouseXByPercent)
            return;

        const currentIndex = Math.round(this.state.mouseXByPercent * this.props.indexes.length);
        const xValueInThisIndex = this.props.indexes[currentIndex];
        const yValuesInThisIndex = this.props.valuesList
            .map((ys, ix) => ({index: ix, value: ys[xValueInThisIndex]}))
            .filter(y => y.value != undefined);

        const fixOffset = 5;
        let yValue = -9999999;
        yValuesInThisIndex.forEach(yvi => yvi.value > yValue ? yValue = yvi.value : undefined);
        const {x, y} = this._getPointPosition(currentIndex, yValue);

        return <span className="line-chart-tooltip"
                     style={{
                         top: y < 50 ? y + fixOffset + '%' : undefined,
                         bottom: y < 50 ? undefined : 100 - y + fixOffset + '%',
                         left: x < 50 ? x + fixOffset + '%' : undefined,
                         right: x < 50 ? undefined : 100 - x + fixOffset + '%'
                     }}>
            {yValuesInThisIndex.map(({value, index}) => (
                <div key={index}>
                    <b style={{color: this.props.labels[index].color}}>{` ${this.props.labels[index].name}: `}</b>
                    {Persian.number.formatPrice(Number(value))}
                </div>
            ))}
            <div style={{textAlign: 'center'}}>
                {this.props.isIndexesAsNumber ? Persian.number.formatPrice(xValueInThisIndex) : xValueInThisIndex}
            </div>
        </span>
    }

    render() {
        return <React.Fragment>
            <svg style={{position: 'absolute', top: 0, left: 0}}
                 width="100%" height="100%" preserveAspectRatio="none"
                 onMouseMove={e => this._handleMouseMove(e)}
                 onMouseLeave={() => this._handleMouseLeave()}>
                {this._renderSelectorLine()}
            </svg>
            {this._renderTooltip()}
        </React.Fragment>
    }
}