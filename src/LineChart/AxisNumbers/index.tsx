import * as React from "react";
import {useChartContext} from "../context";


export default function AxisNumbers() {
    return <>
        {renderIndexesNumbers()}
        {renderValuesNumbers()}
    </>
}

function renderIndexesNumbers() {
    const {props, offsets} = useChartContext();

    const verticalShownValuesCount = ((props.axis || {}).indexes || {}).shownCount;
    if (!verticalShownValuesCount)
        return null;

    const lineXDistance = offsets.innerWidth / verticalShownValuesCount;

    const shownIndexes = [];
    for (let lineIndex = 0; lineIndex < verticalShownValuesCount; lineIndex++)
        shownIndexes.push(props.indexes[Math.round(lineIndex * props.indexes.length / verticalShownValuesCount)]);
    shownIndexes.push(props.indexes[props.indexes.length - 1]);

    return createVerticalLine(shownIndexes, lineXDistance);
}


function renderValuesNumbers() {
    const {props, offsets, dataMapper} = useChartContext();

    const horizontalShownValuesCount = ((props.axis || {}).values || {}).shownCount;
    if (!horizontalShownValuesCount)
        return null;

    const lineYDistance = offsets.innerHeight / horizontalShownValuesCount;

    const minAndMaxY = dataMapper.getMinAndMaxValue();

    const shownValues = [];
    for (let lineIndex = 0; lineIndex <= horizontalShownValuesCount; lineIndex++)
        shownValues.push(Math.round(minAndMaxY.max - lineIndex * (minAndMaxY.max - minAndMaxY.min) / horizontalShownValuesCount));

    return createHorizontalLine(shownValues, lineYDistance);
}

function createVerticalLine(valueStops: any[], lineXDistance: number) {
    const {offsets, props} = useChartContext();

    return valueStops.map((value, lineIndex) =>
        <span key={"ver_" + lineIndex}
              style={{
                  ...s.lineChartAxisNumber,
                  top: `calc(${offsets.height}% - 2em)`,
                  left: lineIndex != valueStops.length - 1 ?
                      offsets.left + lineXDistance * lineIndex + '%' :
                      undefined,
                  right: lineIndex == valueStops.length - 1 ? 0 : undefined,
                  transform: (lineIndex != valueStops.length - 1 && lineIndex != 0 ? 'translateX(-50%)' : '') +
                  ((props.axis || {}).indexes || {}).rotation ? ` rotate(${((props.axis || {}).indexes || {}).rotation}deg)` : ''
              }}>
            {((props.axis || {}).indexes || {}).renderLabels ? ((props.axis || {}).indexes || {}).renderLabels(value) : value}
        </span>
    );
}

function createHorizontalLine(valueStops: any[], lineYDistance: number) {
    const {offsets, props} = useChartContext();

    return valueStops.map((value, lineIndex) =>
        <span key={"hor_" + lineIndex}
              style={{
                  ...s.lineChartAxisNumber,
                  top: `calc(${offsets.top + lineYDistance * lineIndex}% - ${
                      lineIndex == 0 ? 5 :
                          lineIndex == valueStops.length - 1 ? 17 : 10}px)`,
                  left: 0,
                  transform: ((props.axis || {}).values || {}).rotation ? ` rotate(${((props.axis || {}).indexes || {}).rotation}deg)` : ''
              }}>
            {((props.axis || {}).values || {}).renderLabels ? ((props.axis || {}).values || {}).renderLabels(value) : value}
        </span>
    );
}

const s = {
    lineChartAxisNumber: {
        color: '#949ba2',
        fontSize: 11,
        position: 'absolute'
    } as React.CSSProperties
}
