import * as React from "react";
import {default as PointMapper} from "../PointMapper/index";
import ValueCurves from "./ValueCurves";
import AxisLines from "./AxisLines";
import {chartOffset, LineChartProps} from "../models";

interface Props extends LineChartProps{
    dataMapper: PointMapper;
}

export default class Graph extends React.Component<Props> {
    render() {
        return <svg width="100%" height="100%" preserveAspectRatio="none"
                    viewBox={`0 0 ${chartOffset.width} ${chartOffset.height}`}
                    version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <AxisLines {...this.props}/>
            <ValueCurves {...this.props}/>
        </svg>
    }
}