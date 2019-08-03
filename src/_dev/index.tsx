import * as React from 'react';
import {render} from "react-dom";
import LineChart from "../LineChart";

declare const module: any;

class MainApplication extends React.Component {


    render() {
        const lineChartProps = [
            require('./lineChartProps1.json'),
            require('./lineChartProps2.json'),
        ];
        return lineChartProps.map(props => <div style={{width: 500, height: 400}}>
            <LineChart {...props}/>
        </div>)
    }
}

render(
    <MainApplication/>,
    document.getElementById("root")
);

module.hot.accept();