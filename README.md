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

<img src="./readme/1.png"/>
<img src="./readme/2.png"/>
<img src="./readme/3.png"/>

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
