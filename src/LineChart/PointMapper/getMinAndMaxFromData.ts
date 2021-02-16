import {ValuesInfo} from "../models";

export default function getMinAndMaxFromData(valuesList) {
    const ret: ValuesInfo = {
        minimumValue: Math.min(...valuesList.map(ys => Math.min(...ys.filter(r=>r!=undefined)))),
        maximumValue: Math.max(...valuesList.map(ys => Math.max(...ys.filter(r=>r!=undefined))))
    };
    return ret;
}
