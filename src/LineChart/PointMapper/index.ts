import { DataType, LineChartProps } from "../models";
import getMinAndMaxFromData from "./getMinAndMaxFromData";
import {
    findNextIndexNotUndefinedValueInArray,
    findPreviousIndexNotUndefinedDataInArray,
    findPreviousIndexNotUndefinedValueInArray
} from "./findNextAndPreviousValueNotUndefinedValueInArray";
import { Label } from "../models/labels";
import { IndexesAxisInfo, ValuesAxisInfo } from "../models/axis";


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

        function selectValue(r: TData) {
            switch (typeof valueSelector) {
                case 'function':
                    return valueSelector(r);
                case 'string':
                    if (typeof r == 'object') {
                        return r[valueSelector as string];
                    }
            }
            return r;
        }

        const {data, valueSelector} = this._props;
        return this._valuesGroupCache = data.map((value) => {
            const selected = selectValue(value);
            if (!Array.isArray(selected)) {
                return [selected];
            }
            return selected;
        });
    }

    private _estimatedValuesGroupCache?: number[][];

    get estimatedValuesGroup(): number[][] {
        if (this._estimatedValuesGroupCache) return this._estimatedValuesGroupCache;

        const selectedFromData = this.valuesGroup;

        function estimateValueFromPrevAndNextDefined(searchFromIndex: number, lineIndex: number) {
            const prev = findPreviousIndexNotUndefinedValueInArray(selectedFromData, searchFromIndex, lineIndex);
            const next = findNextIndexNotUndefinedValueInArray(selectedFromData, searchFromIndex, lineIndex);
            const prevFactor = searchFromIndex - prev;
            const nextFactor = next - searchFromIndex;
            const prevValue = selectedFromData[prev][lineIndex]!;
            const nextValue = selectedFromData[next][lineIndex]!;
            return (prevValue * nextFactor + nextValue * prevFactor) / (prevFactor + nextFactor);
        }

        return this._estimatedValuesGroupCache = selectedFromData.map((array, searchFromIndex) =>
            array.map((r, lineIndex) =>
                r !== undefined ? r : estimateValueFromPrevAndNextDefined(searchFromIndex, lineIndex)
            )
        );
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
                    if (!indexSelector) {
                        return ix;
                    }
                    return typeof indexSelector == 'function' ? indexSelector(r) : +(r as TData)[indexSelector];
                case "undefined":
                    return findPreviousIndexNotUndefinedDataInArray(data, ix);
            }
        });
    }

    private _axisInfoCache!: {
        indexAxis: IndexesAxisInfo;
        valueAxis: ValuesAxisInfo;
    };

    get axisInfo() {
        if (this._axisInfoCache) return this._axisInfoCache;

        const dataMaxMin = getMinAndMaxFromData(this.estimatedValuesGroup);

        let {indexAxis, valueAxis} = this._props;
        if (typeof indexAxis == 'function') {
            indexAxis = indexAxis(dataMaxMin);
        }
        if (typeof valueAxis == 'function') {
            valueAxis = valueAxis(dataMaxMin);
        }

        indexAxis = {
            ...indexAxis,
            linesCount: (indexAxis || {}).linesCount === undefined ? 5 : (indexAxis || {}).linesCount,
        };

        const minimumValue = (valueAxis || {}).minimumValue;
        const maximumValue = (valueAxis || {}).maximumValue;
        valueAxis = {
            ...valueAxis,
            linesCount: (valueAxis || {}).linesCount === undefined ? 4 : (valueAxis || {}).linesCount,
            minimumValue: minimumValue == undefined ? dataMaxMin.minimumValue : minimumValue,
            maximumValue: maximumValue == undefined ? dataMaxMin.maximumValue : maximumValue,
        };

        this._axisInfoCache = {indexAxis, valueAxis};
        return this._axisInfoCache;
    }

    private _valuesAxisLinesInfoCache ?: { value: number, percent: number }[];

    get valuesAxisLinesInfo(): { value: number, percent: number }[] {
        if (this._valuesAxisLinesInfoCache) return this._valuesAxisLinesInfoCache;
        const {valueAxis: {linesCount, maximumValue, minimumValue}} = this.axisInfo;

        if (!linesCount) return this._valuesAxisLinesInfoCache = [];

        const lastLine = {percent: 1, value: maximumValue!};
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

        const lastLine = {percent: 1, value: this.indexes[this.indexes.length - 1]};
        if (linesCount === 1) return this._indexesAxisLinesInfoCache = [lastLine];

        const ret = new Array(linesCount);
        for (let i = 0; i < linesCount - 1; i++) {
            const percent = i / (linesCount - 1);
            const ix = Math.floor(percent * this.indexes.length);
            ret[i] = {percent, value: this.indexes[ix]};
        }
        ret[linesCount - 1] = lastLine;
        return this._indexesAxisLinesInfoCache = ret;
    }

    private _labelCache ?: Label[];

    get labels(): Label[] {
        if (this._labelCache) return this._labelCache;

        const labels = this._props.labels!;
        this._labelCache = new Proxy(labels, {
            get(_: unknown, ix: number): any {
                const newIx = ix % labels.length;
                if (newIx != ix) {
                    return {...labels[newIx], title: 'value' + newIx};
                }
                return labels[ix];
            }
        }) as Label[];
        return this._labelCache!;
    }
}
