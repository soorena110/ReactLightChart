import {DataType, IndexesAxisInfo, LineChartProps, ValuesAxisInfo} from "../models";
import getMinAndMaxFromData from "./getMinAndMaxFromData";
import {
    findNextIndexNotUndefinedValueInArray,
    findPreviousIndexNotUndefinedValueInArray
} from "./findNextAndPreviousValueNotUndefinedValueInArray";


export default class PointMapper<TData extends DataType> {

    constructor(private _props: LineChartProps<TData>) {
    }

    getPointPosition(index: number, value: number) {
        const {axisInfo: {valueAxis: {maximumValue, minimumValue}}, _props} = this;

        const x = index / (_props.data.length - 1);
        const y = (value - minimumValue!) / (maximumValue! - minimumValue!);
        return {x, y};
    }

    private _valuesGroupCache?: (number | undefined)[][];

    get valuesGroup(): (number | undefined)[][] {
        if (this._valuesGroupCache) return this._valuesGroupCache;

        function selectValue(r: TData, ix: number) {
            switch (typeof r) {
                case 'number':
                    return [r];
                case "object":
                    const ret = typeof valueSelector == 'function' ? valueSelector(r as object) : r[valueSelector as string];
                    return Array.isArray(ret) ? ret : [ret];
                case "undefined":
                    const prev = findPreviousIndexNotUndefinedValueInArray(data, ix);
                    const next = findNextIndexNotUndefinedValueInArray(data, ix);
                    const prevFactor = ix - prev;
                    const nextFactor = next - ix;
                    const prevValue = selectValue(data[prev], ix);
                    const nextValue = selectValue(data[next], ix);
                    return [(prevValue * nextFactor + nextValue * prevFactor) / (prevFactor + nextFactor)]
            }
        }

        const {data, valueSelector} = this._props;
        return this._valuesGroupCache = data.map(selectValue);
    }


    private _indexesCache?: (string | number)[];

    get indexes() {
        if (this._indexesCache) return this._indexesCache;

        const {data, indexSelector} = this._props;
        return this._indexesCache = data.map((r, ix) => {
            switch (typeof r) {
                case 'number':
                    return ix;
                case "object":
                    if (!indexSelector)
                        return ix;
                    return typeof indexSelector == 'function' ? indexSelector(r as object) : r[indexSelector];
                case "undefined":
                    return findPreviousIndexNotUndefinedValueInArray(data, ix);
            }
        });
    }

    private _axisInfoCache!: {
        indexAxis: IndexesAxisInfo;
        valueAxis: ValuesAxisInfo;
    }

    get axisInfo() {
        if (this._axisInfoCache) return this._axisInfoCache;

        const dataMaxMin = getMinAndMaxFromData(this.valuesGroup);

        let {indexAxis, valueAxis} = this._props;
        if (typeof indexAxis == 'function')
            indexAxis = indexAxis(dataMaxMin);
        if (typeof valueAxis == 'function')
            valueAxis = valueAxis(dataMaxMin);

        indexAxis = {
            ...indexAxis,
            linesCount: indexAxis?.linesCount === undefined ? 5 : indexAxis?.linesCount,
        };
        valueAxis = {
            ...valueAxis,
            linesCount: valueAxis?.linesCount === undefined ? 4 : valueAxis?.linesCount,
            minimumValue: valueAxis?.minimumValue || dataMaxMin.minimumValue,
            maximumValue: valueAxis?.maximumValue || dataMaxMin.maximumValue,
        };

        this._axisInfoCache = {indexAxis, valueAxis}
        return this._axisInfoCache;
    }

    private _valuesAxisLinesInfoCache ?: { value: number, percent: number }[];

    get valuesAxisLinesInfo(): { value: number, percent: number }[] {
        if (this._valuesAxisLinesInfoCache) return this._valuesAxisLinesInfoCache;
        const {valueAxis: {linesCount, maximumValue, minimumValue}} = this.axisInfo;

        if (!linesCount) return this._valuesAxisLinesInfoCache = [];

        const lastLine = {percent: 1, value: maximumValue!}
        if (linesCount === 1) return this._valuesAxisLinesInfoCache = [lastLine];

        const ret = new Array(linesCount);
        for (let i = 0; i < linesCount - 1; i++) {
            const percent = i / (linesCount - 1);
            ret[i] = {percent, value: (maximumValue! - minimumValue!) * percent + minimumValue!};
        }
        ret[linesCount - 1] = lastLine;
        return this._valuesAxisLinesInfoCache = ret;
    }

    private _indexesAxisLinesInfoCache ?: { value: number | string, percent: number }[];

    get indexesAxisLinesInfo(): { value: string | number, percent: number }[] {
        if (this._indexesAxisLinesInfoCache) return this._indexesAxisLinesInfoCache;

        const {indexAxis: {linesCount}} = this.axisInfo;

        if (!linesCount) return this._indexesAxisLinesInfoCache = [];

        const lastLine = {percent: 1, value: this.indexes[this.indexes.length - 1]}
        if (linesCount === 1) return this._indexesAxisLinesInfoCache = [lastLine];

        const ret = new Array(linesCount);
        for (let i = 0; i < linesCount - 1; i++) {
            const percent = i / (linesCount - 1);
            const ix = Math.floor(percent * this.indexes.length);
            ret[i] = {percent, value: this.indexes[ix]};
        }
        ret[linesCount - 1] = lastLine
        return this._indexesAxisLinesInfoCache = ret;
    }

}
