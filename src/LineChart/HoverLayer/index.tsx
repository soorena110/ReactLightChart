import * as React from "react";
import { useCallback, useState } from "react";
import { ChartContextInfo, useChartContext } from "../context";
import {
    findNextIndexNotUndefinedDataInArray,
    findPreviousIndexNotUndefinedDataInArray
} from "../PointMapper/findNextAndPreviousValueNotUndefinedValueInArray";


export default function HoverLayer() {
    const {offsets} = useChartContext();
    const [mouseXByPercent, setMouseXByPercent] = useState<number>();

    const handleMouseMove = useCallback(function (e: React.MouseEvent<HTMLDivElement>) {
        const bound = e.currentTarget.getBoundingClientRect();

        const effectiveBound = {
            left: offsets.left / offsets.width * bound.width,
            top: offsets.top / offsets.height * bound.height,
            width: (1 - (offsets.left + offsets.right) / offsets.width) * bound.width,
            height: (1 - (offsets.top + offsets.bottom) / offsets.height) * bound.height
        };

        const effectiveOffsetX = e.clientX - bound.x - effectiveBound.left;
        let mouseXByPercent = effectiveOffsetX / effectiveBound.width;

        if (mouseXByPercent < 0) {
            mouseXByPercent = 0;
        }
        if (mouseXByPercent > 1) {
            mouseXByPercent = 1;
        }
        setMouseXByPercent(mouseXByPercent);
    }, []);

    function handleMouseLeave() {
        setMouseXByPercent(undefined);
    }

    return <React.Fragment>
        <svg style={{position: 'absolute', top: 0, left: 0}}
             width="100%" height="100%" preserveAspectRatio="none">
            {renderSelectorLine(mouseXByPercent)}
        </svg>
        {renderTooltip(mouseXByPercent)}
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999999}}
             onMouseMove={e => handleMouseMove(e)}
             onMouseLeave={() => handleMouseLeave()}/>
    </React.Fragment>;
}


function renderTooltip(mouseXByPercent?: number) {
    const context = useChartContext();
    const {props, dataMapper: {valuesGroup, estimatedValuesGroup, indexes, labels}} = context;

    if (mouseXByPercent == undefined) {
        return null;
    }

    const currentIndex = Math.round(mouseXByPercent * (indexes.length - 1));
    const xValueInThisIndex = indexes[currentIndex];
    const estimatedValues = estimatedValuesGroup[currentIndex];
    const values = valuesGroup[currentIndex];

    const fixOffset = 5;

    const prev = findPreviousIndexNotUndefinedDataInArray(props.data, currentIndex || 1);
    const next = findNextIndexNotUndefinedDataInArray(props.data, Math.min(props.data.length - 2, currentIndex));

    if (props.renderSeparatedTooltip) {
        return estimatedValues.map(
            (estimatedValue, valueIndex) => {
                const {x, y} = getPointPosition(currentIndex, estimatedValues[valueIndex]!, context);
                return <React.Fragment key={valueIndex}>
                    {props.renderSeparatedTooltip!({
                        props, values, lineIndex: valueIndex, labels, estimatedValue, estimatedValues,
                        value: values[valueIndex],
                        pointPosition: {left: x + '%', top: y + '%', position: 'absolute', zIndex: 99},
                        data: props.data[currentIndex],
                        prevDefinedData: props.data[prev],
                        nextDefinedData: props.data[next],
                        arrayIndex: currentIndex,
                        index: xValueInThisIndex,
                    })}
                </React.Fragment>;
            }
        );
    }

    if (props.renderTooltip) {
        const {x, y} = getPointPosition(currentIndex, values[0]!, context);
        return props.renderTooltip({
            props, labels, values, estimatedValues,
            pointPosition: {left: x + '%', top: y + '%', position: 'absolute', zIndex: 99},
            defaultCssProps: {
                ...s.lineChartTooltip,
                top: y < 50 ? y + fixOffset + '%' : undefined,
                bottom: y < 50 ? undefined : 100 - y + fixOffset + '%',
                left: x < 50 ? x + fixOffset + '%' : undefined,
                right: x < 50 ? undefined : 100 - x + fixOffset + '%'
            },
            data: props.data[currentIndex],
            prevDefinedData: props.data[prev],
            nextDefinedData: props.data[next],
            arrayIndex: currentIndex,
            index: xValueInThisIndex,
        });
    }

    return null;
}


function renderSelectorLine(mouseXByPercent?: number) {
    const context = useChartContext();
    const {offsets, dataMapper: {estimatedValuesGroup, labels}} = context;

    if (mouseXByPercent == undefined) {
        return null;
    }

    const currentIndex = Math.round(mouseXByPercent * (estimatedValuesGroup.length - 1));
    const xValueInThisIndex = estimatedValuesGroup[currentIndex];

    return xValueInThisIndex.map((y, ix) => {
        if (!y) return undefined;
        const thePointPosition = getPointPosition(currentIndex, y, context);

        const color = labels[ix].labelColor;

        return <React.Fragment key={ix}>
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
        </React.Fragment>;
    });
}


function getPointPosition(index: number, values: number, {offsets, dataMapper}: ChartContextInfo) {
    const {x, y} = dataMapper.getPointPosition(index, values);
    return {
        x: x * (offsets.innerWidth) + offsets.left,
        y: (1 - y) * (offsets.innerHeight) + offsets.top
    };
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
        border: 'solid 1px #dfe3e6',
        zIndex: 9999
    } as React.CSSProperties
};
