import { ValuesInfo } from '../models/axis';

export default function getMinAndMaxFromData(valuesList:number[][]) {
    const ret: ValuesInfo = {
        minimumValue: Math.min(...valuesList.map(ys => Math.min(...ys.filter(r => r != undefined)))),
        maximumValue: Math.max(...valuesList.map(ys => Math.max(...ys.filter(r => r != undefined))))
    };
    return ret;
}
