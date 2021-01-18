import {PointListType} from "../models";

interface RequiredProps {
    indexes: (string | number)[];
    valuesList: PointListType[];
    minimumValue?: number;
    maximumValue?: number;
}

export default class PointMapper {
    private readonly _valuesList: PointListType[];
    private readonly _indexes: (string | number)[];
    private readonly _mappingYsToPxParameters: { min: number, max: number };

    constructor(props: RequiredProps) {
        this._valuesList = props.valuesList;
        this._indexes = props.indexes;

        this._mappingYsToPxParameters = this._computeMinValueAndMaxValue(props.minimumValue, props.maximumValue)
    }

    getPointPosition(index: number, value: number) {
        const minAndMaxY = this._mappingYsToPxParameters;
        const x = index / (this._indexes.length - 1);
        const y = (value - minAndMaxY.min) / (minAndMaxY.max - minAndMaxY.min);
        return {x, y};
    }

    getValuesForIndex(lineIndex: number) {
        return this._valuesList[lineIndex];
    }

    getMinAndMaxValue() {
        return this._mappingYsToPxParameters
    }

    private _computeMinValueAndMaxValue(minimumValue?: number, maximumValue?: number) {
        if (minimumValue && maximumValue)
            return {min: minimumValue, max: maximumValue};

        const ret = {min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER};

        this._valuesList.forEach(ys =>
            this._indexes.forEach(x => {
                const y = ys[x];
                if (y) {
                    ret.min = Math.min(ret.min, y);
                    ret.max = Math.max(ret.max, y);
                }
            })
        );

        return {min: minimumValue || ret.min, max: maximumValue || ret.max};
    }
}
