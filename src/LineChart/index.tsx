import * as React from 'react';
import {default as PointMapper} from "./PointMapper/index";
import Graph from "./DataGraph/index";
import HoverLayer from "./HoverLayer/index";
import AxisNumbers from "./AxisNumbers/index";
import {LineChartProps} from "./models";


export default class LineChart extends React.Component<LineChartProps> {
    private _dataMapper: PointMapper;

    constructor(props: LineChartProps) {
        super(props);
        this._dataMapper = new PointMapper(props.indexes, props.valuesList)
    }

    static defaultProps: Partial<LineChartProps> = {
        axisOptions: {shownIndexesCount: 4, shownValuesCount: 3}
    };

    componentWillReceiveProps(props: LineChartProps) {
        this._dataMapper = new PointMapper(props.indexes, props.valuesList)
    }

    //#region Render


    render() {
        const style = Object.assign({}, {height: '100%', width: '100%', position: 'relative'}, this.props.style);

        return <div style={style}>
            <Graph {...this.props}
                   dataMapper={this._dataMapper}/>
            <HoverLayer {...this.props}
                        dataMapper={this._dataMapper}/>
            <AxisNumbers {...this.props}
                         dataMapper={this._dataMapper}/>
        </div>
    }

    //#endregion
}