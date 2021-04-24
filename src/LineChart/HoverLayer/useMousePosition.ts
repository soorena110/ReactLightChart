import { useChartContext } from '../context';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

export default function useMousePosition() {
    const {offsets, dataMapper: {indexes}, props: {onSelect, selectedIndex}} = useChartContext();
    const [mouseXByPercent, setMouseXByPercent] = useState<number>();

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
        setMouseXByPercent(mouseXByPercent);
    }, []);

    const deselect = useCallback(() => setMouseXByPercent(undefined), []);

    const pointIndex = mouseXByPercent != undefined ? Math.round(mouseXByPercent * (indexes.length - 1)) : undefined;

    useEffect(() => onSelect?.(pointIndex), [pointIndex, onSelect]);

    return {
        pointIndex: selectedIndex || pointIndex,
        handler,
        deselect
    };
}
