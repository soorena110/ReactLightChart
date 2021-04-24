import * as React from "react";
import Tooltip from './Tooltip';
import HoverLine from './HoverLine';
import Steps from './Steps';
import useMousePosition from './useMousePosition';
import { useChartContext } from '../context';


export default function HoverLayer() {
    const {props} = useChartContext();
    const {pointIndex, handler, deselect} = useMousePosition();


    return <>
        <svg style={{position: 'absolute', top: 0, left: 0}}
             width="100%" height="100%" preserveAspectRatio="none">
            <Steps hoveredPointIndex={pointIndex}/>
            <HoverLine pointIndex={pointIndex}/>
        </svg>
        <Tooltip pointIndex={pointIndex}/>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 15}}
             tabIndex={9999}
             onMouseMove={e => props.selectTrigger == 'hover' && handler(e)}
             onMouseLeave={() => props.deselectTrigger == 'leave' && deselect()}
             onClick={e => props.selectTrigger == 'click' && handler(e)}
             onBlur={() => props.deselectTrigger == 'blur' && deselect()}/>
    </>;
}


