/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useMemo } from 'react';
import { DataType, LineChartProps } from "./models";
import { ChartProvider } from "./context";
import ValueCurves from "./ValueCurves";
import AxisLines from "./AxisLines";
import HoverLayer from "./HoverLayer";
import AxisNumbers from "./AxisNumbers";
import { ChartSizesInfo, LineChartSizes } from './models/sizes';


export default function LineChart<TData extends DataType>(props: LineChartProps<TData>) {

    const style: React.CSSProperties = useMemo(() => ({
        height: '100%',
        width: '100%',
        position: 'relative',
        ...props.style
    }), [props.style]);

    return <ChartProvider chartProps={props}>
        <div style={style} className={props.className}>
            <svg width="100%" height="100%" preserveAspectRatio="none"
                 viewBox={`0 0 100 100`}
                 version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <AxisLines/>
                <ValueCurves/>
            </svg>
            <HoverLayer/>
            <AxisNumbers/>
        </div>
    </ChartProvider>;
}


export function getChartOffset(overrideSizes: LineChartSizes): ChartSizesInfo {
    return {
        left: 5,
        bottom: 8,
        right: 0,
        top: 2,
        width: 100,
        height: 100,

        get innerHeight() {
            return this.height - this.bottom - this.top;
        },
        get innerWidth() {
            return this.width - this.right - this.left;
        },
        ...overrideSizes
    };
}

LineChart.defaultProps = {
    renderTooltip({estimatedValues, index, labels, defaultCssProps}) {
        return <span style={defaultCssProps}>
            {estimatedValues.map((value, ix) => {
                const {title, labelColor, textColor} = labels[ix];
                return <div key={ix}>
                    {title && <b style={{color: textColor || labelColor}}>{` ${title}: `}</b>}
                    <span style={{color: title ? undefined : labelColor}}>{value}</span>
                </div>;
            })}
            <div style={{textAlign: 'center'}}>
                {index}
            </div>
        </span>;
    },
    labels: ['#2384d1', '#d04441', '#46d041', '#d0c941',
        '#d07f41', '#7341d0', '#41d0b3', '#d041b1'].map((r, ix) => ({
        labelColor: r,
        stroke: r,
        title: 'value' + ix
    })),
    renderHoverLine({position, color, sizes}) {
        if (!color) return null;
        const lineStyle = {strokeWidth: .3};

        return <>
            {/*<circle cx={thePointPosition.x + '%'}*/}
            {/*        cy={thePointPosition.y + '%'}*/}
            {/*        r={3}*/}
            {/*        style={s.lineChartSelectionSymbol}*/}
            {/*        stroke={color}/>*/}
            <line x1={position.left}
                  x2={position.left}
                  y1={sizes.top + '%'}
                  y2={sizes.height - sizes.bottom + '%'}
                  style={lineStyle}
                  stroke={color}/>
            <line x1={sizes.left + '%'}
                  x2={sizes.width - sizes.right + '%'}
                  y1={position.top}
                  y2={position.top}
                  style={lineStyle}
                  stroke={color}/>
        </>;
    },

    renderStep({position, color, hovered}) {
        if (!color || !hovered) return null;
        const circleStyle = {
            strokeWidth: 2,
            fill: 'transparent'
        };

        return <circle cx={position.left}
                       cy={position.top}
                       r={3}
                       style={circleStyle}
                       stroke={color}/>;
    },

    selectTrigger: 'hover',
    deselectTrigger: 'leave',
} as Partial<LineChartProps<any>>;
