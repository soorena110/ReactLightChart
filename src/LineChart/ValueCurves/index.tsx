import * as React from "react";
import { useChartContext } from "../context";
import Line from "./Line";
import Gradient from './Gradient';


export default function ValueCurves() {
    const context = useChartContext();
    const {dataMapper: {estimatedValuesGroup}} = context;

    if (!estimatedValuesGroup.length) return null;

    return <>
        {estimatedValuesGroup[0].map((_, lineNumber) =>
            <Gradient lineNumber={lineNumber} key={lineNumber}/>
        )}
        {estimatedValuesGroup[0].map((_, lineNumber) =>
            <Line lineNumber={lineNumber} key={lineNumber}/>
        )}
    </>;
}
