## Info

[![npm version](https://img.shields.io/npm/v/react-light-chart.svg?style=flat-square)](https://www.npmjs.org/package/react-light-chart)
[![install size](https://badgen.net/bundlephobia/min/react-light-chart)](https://bundlephobia.com/result?p=react-light-chart)
[![npm downloads](https://img.shields.io/npm/dm/react-light-chart.svg?style=flat-square)](http://npm-stat.com/charts.html?package=react-light-chart)
[![npm total downloads](https://badgen.net/npm/dt/react-light-chart)](http://npm-stat.com/charts.html?package=react-light-chart)

## Install

To install, use below code

```node
npm install react-light-chart
```
Or
```node
yarn add react-light-chart
```



## Images

You can clone code and run `npm start` to see below examples in `src/_dev` folder.

<img alt="exmaple 1" src="./readme/1.png"/>
<img alt="exmaple 2" src="./readme/2.png"/>
<img alt="exmaple 3" src="./readme/3.png"/>
<img alt="exmaple 4" src="./readme/4.png"/>


## Example

```js
import { LineChart } from 'react-light-chart';

const data4 = {
    "labels": [{
        name: "price1",
        stroke: "#1787dd",
        labelColor: "#1787dd",
        area: {
            rotation: 180,
            grads: [{color: "rgba(23, 135, 221, .4)", stop: 0}, {color: "rgba(23, 135, 221, 0)", stop: 1}]
        }
    }],
    axis:{
      indexes:{
          shownCount:8,
          rotation: -90,
      },
        values:{
          shownCount:3
        }
    },
    overrideSizes: {
        bottom: 12,
        left: 15
    },
    valuesList: [{
        1599661411: 1272254,
        1601130211: 1332254,
        1601475811: 1232254,
        1601562211: 2252254,
        1601648611: 1452254,
        1601907811: 1352254,
        1604586211: 1552254,
        1606832611: 1163170,
        1606919011: 1049689,
        1607178211: 1052254
    }],
    indexes: [
        1599661411,
        1601130211,
        1601475811,
        1601562211,
        1601648611,
        1601907811,
        1604586211,
        1606832611,
        1606919011,
        1607178211],
    style: {height: 150},
}

<LineChart {...data4} style={{width: 500, height: 400}}/>

```




## Parameters

```ts
labels: {
        name: string;
        stroke?: string;
        area?: LineChartGradientColor;
        labelColor?: string;
    }[];
    indexes: IndexType[];
    valuesList: PointListType[];

    overrideSizes?: {
        left?: number;
        bottom?: number;
        right?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    axis?: {
        values?: {
            shownCount?: number;
            inside?: boolean;
            lineProps?: SVGProps<SVGLineElement>;
            dontShowLines?: boolean;
            rotation?: number;
            renderLabels?: (value: string | number) => React.ReactNode;
        },
        indexes?: {
            shownCount?: number;
            lineProps?: SVGProps<SVGLineElement>;
            dontShowLines?: boolean;
            rotation?: number;
            renderLabels?: (value: string | number) => React.ReactNode;
        }
    };

    renderTooltip?: (data: { index: IndexType, values: number[], arrayIndex: number }, props: LineChartProps) => React.ReactNode;

    style?: React.CSSProperties;
    className?: string;
```
