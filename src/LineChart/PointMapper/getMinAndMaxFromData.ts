import {ValuesInfo} from "../models";

export default function getMinAndMaxFromData(valuesList) {
    const ret: ValuesInfo = {
        minimumValue: Math.min(...valuesList.map(ys => Math.min(...ys))),
        maximumValue: Math.max(...valuesList.map(ys => Math.max(...ys)))
    };
    return ret;
}
