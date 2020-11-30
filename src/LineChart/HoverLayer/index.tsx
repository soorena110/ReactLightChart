import * as React from "react";
import {useCallback, useState} from "react";
import {ChartContextInfo, useChartContext} from "../context";
import {LineChartProps} from "../models";


export default function HoverLayer() {
    const {offsets} = useChartContext();
    const [mouseXByPercent, setMouseXByPercent] = useState<number>();

    const handleMouseMove = useCallback(function (e: React.MouseEvent<SVGElement>) {
        const bound = e.currentTarget.getBoundingClientRect();

        const effectiveBound = {
            left: offsets.left / offsets.width * bound.width,
            top: offsets.top / offsets.height * bound.height,
            width: (1 - (offsets.left + offsets.right) / offsets.width) * bound.width,
            height: (1 - (offsets.top + offsets.bottom) / offsets.height) * bound.height
        };

        const effectiveOffsetX = e.clientX - bound.x - effectiveBound.left;
        let mouseXByPercent = effectiveOffsetX / effectiveBound.width;

        if (mouseXByPercent < 0)
            mouseXByPercent = 0;
        if (mouseXByPercent > 1)
            mouseXByPercent = 1;
        setMouseXByPercent(mouseXByPercent)
    }, [])

    function handleMouseLeave() {
        setMouseXByPercent(undefined);
    }

    return <React.Fragment>
        <svg style={{position: 'absolute', top: 0, left: 0}}
             width="100%" height="100%" preserveAspectRatio="none"
             onMouseMove={e => handleMouseMove(e)}
             onMouseLeave={() => handleMouseLeave()}>
            {renderSelectorLine(mouseXByPercent)}
        </svg>
        {renderTooltip(mouseXByPercent)}
    </React.Fragment>
}


function renderTooltip(mouseXByPercent?: number) {
    const context = useChartContext();
    const {props} = context;

    if (mouseXByPercent == undefined)
        return null;

    const currentIndex = Math.round(mouseXByPercent * props.indexes.length);
    const xValueInThisIndex = props.indexes[currentIndex];
    const yValuesInThisIndex = props.valuesList
        .map((ys, ix) => ({index: ix, value: ys[xValueInThisIndex]}))
        .filter(y => y.value != undefined);

    const fixOffset = 5;
    let yValue = -9999999;
    yValuesInThisIndex.forEach(yvi => yvi.value > yValue ? yValue = yvi.value : undefined);
    const {x, y} = getPointPosition(currentIndex, yValue, context);

    const values = yValuesInThisIndex.map(({value}) => value)

    return <span style={{
        ...s.lineChartTooltip,
        top: y < 50 ? y + fixOffset + '%' : undefined,
        bottom: y < 50 ? undefined : 100 - y + fixOffset + '%',
        left: x < 50 ? x + fixOffset + '%' : undefined,
        right: x < 50 ? undefined : 100 - x + fixOffset + '%'
    }}>
        {props.renderTooltip
            ? props.renderTooltip({index: xValueInThisIndex, values, arrayIndex: currentIndex}, props)
            : renderDefaultTooltip({index: xValueInThisIndex, values, arrayIndex: currentIndex}, props)}
        </span>
}

function renderDefaultTooltip(data: { index: number | string, values: number[], arrayIndex: number }, props: LineChartProps) {
    return <>
        {data.values.map((value, index) => (
            <div key={index}>
                <b style={{color: props.labels[index].labelColor}}>{` ${props.labels[index].name}: `}</b>
                {value}
            </div>
        ))}
        <div style={{textAlign: 'center'}}>
            {data.index}
        </div>
    </>
}


function renderSelectorLine(mouseXByPercent?: number) {
    const context = useChartContext();
    const {props, offsets} = context;

    if (mouseXByPercent == undefined)
        return null;

    const currentIndex = Math.round(mouseXByPercent * props.indexes.length);
    const xValueInThisIndex = props.indexes[currentIndex];
    const yValuesInThisIndex = props.valuesList
        .map((ys, ix) => ({index: ix, value: ys[xValueInThisIndex]}))
        .filter(y => y.value != undefined);

    return yValuesInThisIndex.map(y => {
        const thePointPosition = getPointPosition(currentIndex, y.value, context);

        const color = props.labels[y.index].labelColor;

        return <React.Fragment key={y.index}>
            <circle cx={thePointPosition.x + '%'}
                    cy={thePointPosition.y + '%'}
                    r={3}
                    style={s.lineChartSelectionSymbol}
                    stroke={color}/>
            <line x1={thePointPosition.x + '%'}
                  x2={thePointPosition.x + '%'}
                  y1={offsets.top + '%'}
                  y2={offsets.height - offsets.bottom + '%'}
                  style={s.lineChartSelectionLine}
                  stroke={color}/>
            <line x1={offsets.left + '%'}
                  x2={offsets.width - offsets.right + '%'}
                  y1={thePointPosition.y + '%'}
                  y2={thePointPosition.y + '%'}
                  style={s.lineChartSelectionLine}
                  stroke={color}/>
        </React.Fragment>
    });
}


function getPointPosition(index: number, value: number, {offsets, dataMapper}: ChartContextInfo) {
    const {x, y} = dataMapper.getPointPosition(index, value);
    return {
        x: x * (offsets.innerWidth) + offsets.left,
        y: (1 - y) * (offsets.innerHeight) + offsets.top
    }
}

const s = {
    lineChartSelectionSymbol: {
        strokeWidth: 2,
        fill: 'transparent'
    } as React.CSSProperties,

    lineChartSelectionLine: {
        strokeWidth: .3
    } as React.CSSProperties,

    lineChartTooltip: {
        display: 'inline-block',
        position: 'absolute',
        direction: 'rtl',
        background: 'white',
        padding: 5,
        border: 'solid 1px #dfe3e6'
    } as React.CSSProperties
}
