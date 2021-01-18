import * as React from 'react';
import {useMemo} from 'react';
import {default as PointMapper} from "./PointMapper/index";
import {LineChartProps} from "./models";
import {ChartOffsetsInfo, contextObject} from "./context";
import ValueCurves from "./ValueCurves";
import AxisLines from "./AxisLines";
import HoverLayer from "./HoverLayer";
import AxisNumbers from "./AxisNumbers";


export default function LineChart(props: LineChartProps) {
    const dataMapper = useMemo(() => new PointMapper(props), [props.indexes, props.valuesList])

    const style: React.CSSProperties = useMemo(() => ({
        height: '100%',
        width: '100%',
        position: 'relative',
        ...props.style
    }), [props.style]);

    const offsets = useMemo(() => getChartOffset(props), [props])

    const Provider = contextObject.Provider

    return <Provider value={{dataMapper, props, offsets}}>
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
    </Provider>
}


export function getChartOffset(chartProps: LineChartProps): ChartOffsetsInfo {
    return {
        left: 5,
        bottom: 8,
        right: 0,
        top: 2,
        width: 100,
        height: 100,

        get innerHeight() {
            return this.height - this.bottom - this.top
        },
        get innerWidth() {
            return this.width - this.right - this.left
        },
        ...chartProps.overrideSizes
    }
}
