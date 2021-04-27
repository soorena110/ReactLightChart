import { useChartContext } from '../context';
import * as React from 'react';
import { useCallback, useState } from 'react';

export default function useMousePosition() {
    const {offsets, dataMapper: {indexes}, props: {onSelect, selectedIndex}} = useChartContext();
    const [pointIndex, setPointIndex] = useState<number>();

    const handler = useCallback(function (e: React.MouseEvent<HTMLDivElement>) {
        const bound = e.currentTarget.getBoundingClientRect();

        const effectiveBound = {
            left: offsets.left / offsets.width * bound.width,
            top: offsets.top / offsets.height * bound.height,
            width: (1 - (offsets.left + offsets.right) / offsets.width) * bound.width,
            height: (1 - (offsets.top + offsets.bottom) / offsets.height) * bound.height
        };

        const effectiveOffsetX = e.clientX - bound.x - effectiveBound.left;
        let mouseXByPercent = effectiveOffsetX / effectiveBound.width;

        if (mouseXByPercent < 0) mouseXByPercent = 0;
        if (mouseXByPercent > 1) mouseXByPercent = 1;

        const pointIndex = mouseXByPercent != undefined ? Math.round(mouseXByPercent * (indexes.length - 1)) : undefined;
        setPointIndex(pointIndex);
        onSelect && onSelect(pointIndex);
    }, [onSelect]);

    const deselect = useCallback(() => {
        setPointIndex(undefined);
        onSelect && onSelect(undefined);
    }, []);

    return {
        pointIndex: selectedIndex != undefined ? selectedIndex : pointIndex,
        handler,
        deselect
    };
}
