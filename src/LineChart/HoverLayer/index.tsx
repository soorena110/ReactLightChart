import * as React from "react";
import { useCallback, useState } from "react";
import { useChartContext } from "../context";
import Tooltip from './Tooltip';
import HoverLine from './HoverLine';
import Steps from './Steps';


export default function HoverLayer() {
    const {pointIndex, handleMouseMove, handleMouseLeave} = useMousePosition();

    return <>
        <svg style={{position: 'absolute', top: 0, left: 0}}
             width="100%" height="100%" preserveAspectRatio="none">
            <Steps hoveredPointIndex={pointIndex}/>
            <HoverLine pointIndex={pointIndex}/>
        </svg>
        <Tooltip pointIndex={pointIndex}/>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 15}}
             onMouseMove={e => handleMouseMove(e)}
             onMouseLeave={() => handleMouseLeave()}/>
    </>;
}

function useMousePosition() {
    const {offsets, dataMapper: {indexes}} = useChartContext();
    const [mouseXByPercent, setMouseXByPercent] = useState<number>();

    const handleMouseMove = useCallback(function (e: React.MouseEvent<HTMLDivElement>) {
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

    const handleMouseLeave = useCallback(() => setMouseXByPercent(undefined), []);

    const pointIndex = mouseXByPercent != undefined ? Math.round(mouseXByPercent * (indexes.length - 1)) : undefined;

    return {
        pointIndex,
        handleMouseMove,
        handleMouseLeave
    };
}
