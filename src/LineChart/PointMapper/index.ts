export type PointList = { [ix: string]: number };
export default class PointMapper {
    private readonly _valuesList: PointList[];
    private readonly _indexes: string[];
    private readonly _mappingYsToPxParameters: { min: number, max: number };

    constructor(indexes: string[], valuesList: PointList[]) {
        this._valuesList = valuesList;
        this._indexes = indexes;

        this._mappingYsToPxParameters = this._computeMinValueAndMaxValue()
    }

    getPointPosition(index: number, value: number) {
        const minAndMaxY = this._mappingYsToPxParameters;
        const x = index / this._indexes.length;
        const y = (value - minAndMaxY.min) / (minAndMaxY.max - minAndMaxY.min);

        return {x, y};
    }

    getValuesForIndex(lineIndex: number) {
        return this._valuesList[lineIndex];
    }

    getMinAndMaxValue() {
        return this._mappingYsToPxParameters
    }

    private _computeMinValueAndMaxValue() {
        const ret = {min: 0, max: 0};

        this._valuesList.forEach(ys =>
            this._indexes.forEach(x => {
                const y = ys[x];
                if (y) {
                    ret.min = Math.min(ret.min, y);
                    ret.max = Math.max(ret.max, y);
                }
            })
        );

        return ret;
    }
}