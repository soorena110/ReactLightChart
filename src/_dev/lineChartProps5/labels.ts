import { Label } from '../../LineChart/models/labels';

export const label1: Label = {
    title: 'label1',
    stroke: '#353334',
    textColor: '#353334',
    labelColor: '#353334'
};

export const label2: Label = {
    title: 'label2',
    stroke: ({estimatedValues}) => (estimatedValues[1] || 0) > (estimatedValues[0] || 0) ? '#03A37F' : '#A30C39',
    comparativeLabelIndex: 0,
    gradientTowardLabelIndex: 0,
    textColor: '#A30C39',
    labelColor: '#A30C39',
    hoverColor: '#07789A',
    area: ({estimatedValues}) => (estimatedValues[1] || 0) > (estimatedValues[0] || 0) ? {
        rotation: 180,
        grads: [
            {color: 'rgba(3,163,127,0.32)', stop: 0},
            {color: 'rgba(3,163,127,0)', stop: .9},
        ],
    } : {
        rotation: 0,
        grads: [
            {color: 'rgba(163,12,57,0.32)', stop: 0},
            {color: 'rgba(163,12,57,0)', stop: .9},
        ],
    },
};
