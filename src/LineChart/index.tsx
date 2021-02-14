import * as React from 'react';
import {useMemo} from 'react';
import {DataType, LineChartProps} from "./models";
import {ChartOffsetsInfo, ChartProvider} from "./context";
import ValueCurves from "./ValueCurves";
import AxisLines from "./AxisLines";
import HoverLayer from "./HoverLayer";
import AxisNumbers from "./AxisNumbers";


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
    </ChartProvider>
}


export function getChartOffset(overrideSizes: LineChartProps<any>["overrideSizes"]): ChartOffsetsInfo {
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
        ...overrideSizes
    }
}

LineChart.defaultProps = {
    renderTooltip({values, index, props, defaultCssProps}) {
        return <span style={defaultCssProps}>
            {values.map((value, ix) => (
                <div key={ix}>
                    <b style={{color: props.labels[ix].labelColor}}>{` ${props.labels[ix].title}: `}</b>
                    {value}
                </div>
            ))}
            <div style={{textAlign: 'center'}}>
                {index}
            </div>
        </span>
    }
} as Partial<LineChartProps<any>>
