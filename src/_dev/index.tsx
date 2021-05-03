import * as React from 'react';
import { useState } from 'react';
import { render } from "react-dom";
import LineChart from "../LineChart";
import { data1 } from "./lineChartProps1";
import { data2 } from "./lineChartProps2";
import { data3 } from "./lineChartProps3";
import { data4 } from './lineChartProps4';
import { data5 } from './lineChartProps5';
import { data_empty } from './lineChartProps_empty';


const lineChartExamples = [
    {data: data1, name: 'Horizonal'},
    {data: data2, name: 'Just a line'},
    {data: data3, name: 'Multiple lines'},
    {data: data4, name: 'example 1'},
    {data: data5, name: 'example 2'},
    {data: data_empty, name: 'empty'}
];

function DemoApplication() {
    const [selectedChart, setSelectedChart] = useState(5);
    const selectedChartProps = lineChartExamples[selectedChart].data as any;

    return <>
        <label>
            select the chart type: {' '}
            <select value={selectedChart} onChange={e => setSelectedChart(Number(e.target.value))}>
                {lineChartExamples.map((r, ix) =>
                    <option value={ix} key={ix}>{r.name}</option>
                )}
            </select>
        </label>
        <LineChart {...selectedChartProps} style={{width: 500, height: 400}}/>
    </>;
}

render(
    <DemoApplication/>,
    document.getElementById("root")
);


// @ts-ignore
module.hot.accept();
