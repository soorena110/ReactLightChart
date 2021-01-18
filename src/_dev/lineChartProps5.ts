import {LineChartProps} from "..";


export const data5: LineChartProps = {
    "labels": [{
        name: "price1",
        stroke: "#1787dd",
        labelColor: "#1787dd",
        area: {
            rotation: 180,
            grads: [{color: "rgba(23, 135, 221, .4)", stop: 0}, {color: "rgba(23, 135, 221, 0)", stop: 1}]
        }
    }],
    axis: {
        indexes: {
            shownCount: 8,
            rotation: -90,
        },
        values: {
            shownCount: 3,
        }
    },
    overrideSizes: {
        bottom: 12,
        left: 15
    },
    minimumValue:1000000,
    maximumValue:3000000,
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
