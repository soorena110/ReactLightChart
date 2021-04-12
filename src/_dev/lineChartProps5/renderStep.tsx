import React from 'react';
import { StepRendererParams } from '../../LineChart/models/hover';

export default function renderStep({position, color}: StepRendererParams) {
    if (!color) return null;

    return <>
        <circle cx={position.left}
                cy={position.top}
                r={5}
                fill='white'/>
        <circle cx={position.left}
                cy={position.top}
                r={3}
                fill={color}/>
    </>;
}
